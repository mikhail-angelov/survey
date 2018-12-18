import React from 'react'
import Summary from '../Summary/Summary'
import Vote from '../Vote/Vote'

const Survey = ({ vote, survey, forceVote, clearSurvey, toVoteView }) => {
  return (survey.own || survey.voted) && !forceVote ?
    (<Summary survey={survey} close={clearSurvey} toVoteView={toVoteView} />) :
    (<Vote survey={survey} vote={vote} />)
}

export default Survey
