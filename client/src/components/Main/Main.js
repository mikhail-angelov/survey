import React, { Component } from 'react'
import { connect } from 'react-redux'
import Start from '../Start/Start'
import Survey from '../Survey/Survey'
import { startSurvey, selectSurvey, vote, clearSurvey, toVoteView } from '../../redux/survey'
import './Main.css'

class Main extends Component {
  componentDidMount() {
    const surveyId = window.location.pathname.split('/')[1]
    if(surveyId){
      this.props.selectSurvey(surveyId)
    }
  }
  render() {
    const {survey, error} = this.props
    return survey.surveyId ?
      (<Survey {...this.props} />) :
      (<Start startSurvey={this.props.startSurvey} selectSurvey={this.props.selectSurvey} error={error} />)
  }
}

export const mapDispatchToProps = {
  startSurvey, selectSurvey, vote, clearSurvey, toVoteView,
}
const mapStateToProps = ({ survey }) => survey

export default connect(mapStateToProps, mapDispatchToProps)(Main)
