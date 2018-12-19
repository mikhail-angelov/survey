import _ from 'lodash'
import { doRequest } from './helper'
import Survey from './survey.model.js'
import { getClientId } from './store'

import {
  SURVEY_URL, SURVEY_GET_URL, SURVEY_VOTE_URL, SURVEY_CLOSE_URL,
  SURVEY_UPDATE, SURVEY_CLEAR, SURVEY_ERROR, SURVEY_VOTED, SURVEY_FORCE_VOTE,
} from './constants'

export const startSurvey = (question) => async (dispatch, getStore) => {
  const ownerId = getStore().survey.clientId
  if (!question) {
    return dispatch({ type: SURVEY_ERROR, payload: 'Cannot create survey, the question is empty 😠' })
  }
  try {
    const data = await doRequest({
      url: SURVEY_URL,
      method: 'POST',
      data: { question, ownerId }
    })
    const survey = new Survey(data, ownerId)
    dispatch({ type: SURVEY_UPDATE, payload: survey })
    window.history.pushState({}, null, survey.surveyId)
  } catch (e) {
    console.log('startSurvey error', e)
    dispatch({ type: SURVEY_ERROR, payload: 'I\'m sorry, I cannot create new survey right now 😢' })
  }
}

export const selectSurvey = (surveyId) => async (dispatch, getStore) => {
  const clientId = getStore().survey.clientId
  const oldSurveyId = _.get(getStore(), 'survey.survey.surveyId')
  if (!surveyId) {
    return dispatch({ type: SURVEY_ERROR, payload: 'I cannot get this survey, the id is blank 😠' })
  }
  try {
    const data = await doRequest({
      url: SURVEY_GET_URL(surveyId),
      method: 'GET',
    })
    const survey = new Survey(data, clientId)
    dispatch({ type: SURVEY_UPDATE, payload: survey })
    if (oldSurveyId !== survey.surveyId) {
      window.history.pushState({}, null, survey.surveyId)
    }
  } catch (e) {
    console.log('startSurvey error', e)
    dispatch({ type: SURVEY_ERROR, payload: 'I\'m sorry, I cannot get this survey 😢' })
  }
}

export const vote = (vote) => async (dispatch, getStore) => {
  const personId = getStore().survey.clientId
  const surveyId = getStore().survey.survey.surveyId
  try {
    const data = await doRequest({
      url: SURVEY_VOTE_URL,
      method: 'POST',
      data: { surveyId, personId, vote }
    })
    const survey = new Survey(data, personId)
    dispatch({ type: SURVEY_UPDATE, payload: survey })
    dispatch({ type: SURVEY_VOTED })
  } catch (e) {
    console.log('startSurvey error', e)
    dispatch({ type: SURVEY_ERROR, payload: 'I\'m sorry, I cannot vote for this survey 😢' })
  }
}

export const closeSurvey = () => async (dispatch, getStore) => {
  const ownerId = getStore().survey.clientId
  const survey = getStore().survey.survey
  try {
    if (survey.own) {
      await doRequest({
        url: SURVEY_CLOSE_URL,
        method: 'POST',
        data: { surveyId: survey.surveyId, ownerId }
      })
    }
    window.history.pushState({}, null, '/')
    dispatch({ type: SURVEY_UPDATE, payload: survey })
  } catch (e) {
    console.log('startSurvey error', e)
    dispatch({ type: SURVEY_ERROR, payload: 'I\'m sorry, I cannot close this survey 😢' })
  }
}

export const clearSurvey = () => (dispatch) => {
  window.history.pushState({}, null, '/')
  return dispatch({ type: SURVEY_CLEAR })
}

export const toVoteView = () => ({ type: SURVEY_FORCE_VOTE })

const initialState = {
  clientId: getClientId(),
  survey: {},
  error: '',
  forceVote: false,
}
export const survey = (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_UPDATE:
      const survey = action.payload
      if (state.survey.surveyId !== survey.surveyId || state.survey.timestamp !== survey.timestamp) {
        return { ...state, survey, error: '', forceVote: false }
      } else {
        return state
      }
    case SURVEY_CLEAR:
      return { ...state, survey: {}, error: '', forceVote: false }
    case SURVEY_FORCE_VOTE:
      return { ...state, forceVote: true }
    case SURVEY_VOTED:
      return { ...state, error: action.payload, forceVote: false }
    case SURVEY_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}
