const _ = require('lodash')
const generate = require('nanoid/generate')
const database = require('./db')
const SURVEY = 'survey'

module.exports = {
  create,
  list,
  get,
  vote,
  close,
}

async function create({ ownerId, question }) {
  const db = await database.db()
  const surveyId = generate('1234567890', 8)
  const result = await db.collection(SURVEY).insertOne({
    surveyId,
    ownerId,
    question,
    active: true,
    votes: [],
    timestamp: Date.now()
  })
  const survey = await db.collection(SURVEY).findOne({ _id: result.insertedId })
  return survey
}

async function list(ownerId) {
  const db = await database.db()
  const list = await db.collection(SURVEY).find({ ownerId }).toArray()
  return list
}

async function get(surveyId) {
  const db = await database.db()
  const survey = await db.collection(SURVEY).findOne({ surveyId })
  return survey
}

async function vote({ surveyId, personId, vote }) {
  const db = await database.db()
  const survey = await db.collection(SURVEY).findOne({ surveyId })
  const pesonVoted = _.find(survey.votes, { id: personId })
  let votes
  if (pesonVoted) {
    votes = _.map(survey.votes, item => item.id === personId ? { id: personId, vote } : item)
  } else {
    votes = _.concat(survey.votes, { id: personId, vote })
  }
  await db.collection(SURVEY).updateOne({ surveyId }, { $set: { votes, timestamp: Date.now() } })
  const updatedSurvey = await db.collection(SURVEY).findOne({ surveyId })
  return updatedSurvey
}

async function close({ surveyId, ownerId }) {
  const db = await database.db()
  await db.collection(SURVEY).updateOne({ surveyId, ownerId }, { $set: { active: false, timestamp: Date.now() } })
  const survey = await db.collection(SURVEY).findOne({ surveyId })
  return survey
}
