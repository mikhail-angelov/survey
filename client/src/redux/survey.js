import { doRequest } from './helper'
import Survey from './survey.model.js'
import { getClientId } from './store'

import {
  SURVEY_URL, SURVEY_GET_URL, SURVEY_VOTE_URL, SURVEY_CLOSE_URL,
  SURVEY_UPDATE, SURVEY_CLEAR, SURVEY_ERROR, SURVEY_VOTED, SURVEY_FORCE_VOTE,
} from './constants'

export const startSurvey = (question) => async (dispatch, getStore) => {
  const ownerId = getStore().survey.clientId
  try {
    const data = await doRequest({
      url: SURVEY_URL,
      method: 'POST',
      data: { question, ownerId }
    })
    const survey = new Survey(data, ownerId)
    dispatch({ type: SURVEY_UPDATE, payload: survey })
  } catch (e) {
    console.log('startSurvey error', e)
    dispatch({ type: SURVEY_ERROR, payload: 'I\'m sorry, I cannot create new survey right now 😢' })
  }
}

export const selectSurvey = (surveyId) => async (dispatch, getStore) => {
  const clientId = getStore().survey.clientId
  try {
    const data = await doRequest({
      url: SURVEY_GET_URL(surveyId),
      method: 'GET',
    })
    const survey = new Survey(data, clientId)
    dispatch({ type: SURVEY_UPDATE, payload: survey })
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
  const surveyId = getStore().survey.survey.surveyId
  try {
    const data = await doRequest({
      url: SURVEY_CLOSE_URL,
      method: 'POST',
      data: { surveyId, ownerId }
    })
    const survey = new Survey(data, ownerId)
    dispatch({ type: SURVEY_UPDATE, payload: survey })
  } catch (e) {
    console.log('startSurvey error', e)
    dispatch({ type: SURVEY_ERROR, payload: 'I\'m sorry, I cannot close this survey 😢' })
  }
}

export const clearSurvey = () => ({ type: SURVEY_CLEAR })

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
