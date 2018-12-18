import io from 'socket.io-client'
import {
  SURVEY_UPDATE, SURVEY_VOTED,
} from './constants'
import { selectSurvey } from './survey'

let socket
export default store => next => (action) => {

  switch (action.type) {
    case SURVEY_UPDATE: {
      const surveyId = action.payload.surveyId
      console.log('socket update: ', surveyId)
      console.log('socket prev: ', store.getState().survey.survey.surveyId)
      
      if (surveyId && surveyId !== store.getState().survey.survey.surveyId) {
        socket = io({transports:['polling', 'websocket'], query:{surveyId}})
        socket.on('event', (ag) => {
          console.log('yooo', ag)
          store.dispatch(selectSurvey(surveyId))
        })
        socket.on('error', (ag) => {
          console.log('error', ag)
        })
        socket.on('connect_timeout', (timeout) => {
          console.log('connect_timeout', timeout)
        })
        socket.on('connected', (ag) => {
          console.log('connected', ag)
        })
      } else if (!surveyId) {
        socket && socket.close()
        socket = null
      }
      break
    }
    case SURVEY_VOTED: {
      socket && socket.emit('event', 'refresh')
      break
    }
    default:
      break
  }
  return next(action)
}