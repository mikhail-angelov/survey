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
          This application let you create or join to online survey.<br />(pick one option below)
        </div>
        <input className="start-input" placeholder="type survey number" value={survey} onChange={this.processText('survey')}></input>
        <button className="srv-btn" onClick={() => selectSurvey(survey)}>
          Join to Survey
        </button>
        <textarea className="start-input" placeholder="type a question for new survey" value={question} onChange={this.processText('question')}></textarea>
        <button className="srv-btn srv-btn-red" onClick={() => startSurvey(question)}>
          Start new Survey
        </button>
        <div className="start-error">{error}</div>
      </div>
    )
  }
}

export default Start
