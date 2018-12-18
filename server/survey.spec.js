const expect = require('chai').expect
const mongoUnit = require('mongo-unit')

describe('survey', () => {
  const survey = require('./survey')
  const data = require('./test/survey.json')

  beforeEach(() => mongoUnit.load(data))
  afterEach(() => mongoUnit.drop())

  it('should create survey', async () => {
    const result = await survey.create({ownerId: 'some id', question: 'wat?'})
    expect(!!result._id).eql(true)
    expect(result.question).eql('wat?')
    expect(result.ownerId).eql('some id')
    expect(result.votes.length).eql(0)
  })

  it('should get list of surveys', async () => {
    const OWNER_ID = 'test'
    const result = await survey.list(OWNER_ID)
    expect(result.length).eql(1)
    expect(result[0].ownerId).eql(OWNER_ID)
  })

  it('should get survey', async () => {
    const SURVEY_ID = 'test'
    const OWNER_ID = 'test'
    const result = await survey.get(SURVEY_ID)
    expect(result.ownerId).eql(OWNER_ID)
    expect(result.votes.length).eql(1)
    expect(result.active).eql(true)
  })

  it('should vote new survey', async () => {
    const SURVEY_ID = 'test'
    const PERSON_ID = 'test'
    await survey.vote({surveyId: SURVEY_ID, personId: PERSON_ID, vote: false})
    const result = await survey.get(SURVEY_ID)
    expect(result.votes.length).eql(2)
    expect(result.active).eql(true)
  })

  it('should vote old survey', async () => {
    const SURVEY_ID = 'test'
    const PERSON_ID = 'any'
    await survey.vote({surveyId: SURVEY_ID, personId: PERSON_ID, vote: false})
    const result = await survey.get(SURVEY_ID)
    expect(result.votes.length).eql(1)
    expect(result.votes[0].vote).eql(false)
  })

  it('should close survey', async () => {
    const SURVEY_ID = 'test'
    const OWNER_ID = 'test'
    await survey.close({surveyId: SURVEY_ID, ownerId: OWNER_ID})
    const result = await survey.get(SURVEY_ID)
    expect(result.ownerId).eql(OWNER_ID)
    expect(result.active).eql(false)
  })

})