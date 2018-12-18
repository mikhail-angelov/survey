import React from 'react'


const Vote = ({ vote, survey }) => {
  return (<div>
    <div>{survey.question}</div>
    <button className="vote-yes" onClick={() => vote(true)}>Yes</button>
    <button className="vote-no" onClick={() => vote(false)}>No</button>
  </div>)
}

export default Vote
