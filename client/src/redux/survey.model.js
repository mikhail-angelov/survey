import _ from 'lodash'

export default class Survey {
  constructor(survey, currentClientId) {
    if (survey) {
      this.surveyId = survey.surveyId
      this.question = survey.question
      this.own = !!(survey.ownerId === currentClientId)
      this.summary = {
        count: survey.votes.length,
        pros: _.filter(survey.votes, { vote: true }).length,
        cons: _.filter(survey.votes, { vote: false }).length,
      }
      this.voted = !!_.find(survey.votes, { id: currentClientId })
      this.timestamp = survey.timestamp
    } else {
      return {}
    }
  }
}
