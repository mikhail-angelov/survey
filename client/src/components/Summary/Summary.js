import React from 'react'
import { VictoryLabel, VictoryBar } from 'victory'
import './Summary.css'

const Summary = ({ close, survey, toVoteView }) => {
  const totalCount = survey.summary.count || 1
  const DIFF = 0.01
  return (<div className="summary">
    <div className="summary-question">{survey.question}</div>
    <div className="summary-voted">voted ({survey.summary.count})</div>
    <VictoryBar
      data={[{ x: 1, y: survey.summary.pros + DIFF, l: 'Yes' }, { x: 2, y: survey.summary.cons + DIFF, l: 'No' }]}
      animate={{ duration: 1000, easing: "bounce" }}
      labels={(d) => `${d.l}\n ${Math.floor((d.y - DIFF) * 100 / totalCount, 1)}%`}
      labelComponent={<VictoryLabel dy={60} />}
      style={{
        data: {
          fill: (d) => d.x === 1 ? "#0000cc" : "#c43a31",
          stroke: (d) => d.x === 1 ? "#0000cc" : "#c43a31",
          fillOpacity: 0.7,
          strokeWidth: 2
        },
        labels: {
          fontSize: 15,
          fill: "#ffffff"
        },
        parent: { border: "1px solid #ccc", width: '50%' }
      }}
      padding={{ left: 100, right: 100, top: 50, bottom: 50 }}
      barWidth={80}
    ></VictoryBar>
    <h2>{`Survey link: ${window.location.origin}/${survey.surveyId}`}</h2>


    <div>
      <button className="srv-btn" onClick={toVoteView}>Vote</button>
      <button className="srv-btn srv-btn-red" onClick={close}>{survey.own ? 'Complete survey' : 'Close'}</button>
    </div>
  </div>)
}

export default Summary
