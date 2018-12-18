import React from 'react'

const Summary = ({ close, survey, toVoteView }) => {
  return (<div>
    <div>Summary for: {survey.question}</div>
    <div>Pros: {survey.summary.pros}</div>
    <div>Cons: {survey.summary.cons}</div>
    <div>Total: {survey.summary.count}</div>
    <h2>{`${window.location.origin}/${survey.surveyId}`}</h2>

    <button className="summary-vote" onClick={toVoteView}>Vote</button>
    <button className="summary-close" onClick={close}>Close</button>
  </div>)
}

export default Summary
