import React, { Component } from 'react'
import './Start.css'

class Start extends Component {
  constructor() {
    super()
    this.state = {
      question: '',
      survey: ''
    }
  }
  processText(field) {
    return (e) => {
      const update = { [field]: e.target.value }
      this.setState(update)
    }
  }

  render() {
    const { startSurvey, selectSurvey, error } = this.props
    const { question, survey } = this.state
    return (
      <div className="start">
        <div className="start-header">
        </div>
        <input className="start-question" value={question} onChange={this.processText('question')}></input>
        <button className="start-new" onClick={() => startSurvey(question)}>
          Start New Survey
        </button>
        <input className="start-survey" value={survey} onChange={this.processText('survey')}></input>
        <button className="start-open" onClick={() => selectSurvey(survey)}>
          Open Survey
        </button>
        <div className="start-error">{error}</div>
      </div>
    )
  }
}

export default Start
