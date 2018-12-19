import React from 'react'
import './Vote.css'

const Vote = ({ vote, survey }) => {
  return (<div className="vote">
    <div className="vote-question">{survey.question}</div>
    <div>
      <button className="srv-btn" onClick={() => vote(true)}>Yes</button>
      <button className="srv-btn srv-btn-red" onClick={() => vote(false)}>No</button>
    </div>
  </div>)
}

export default Vote
