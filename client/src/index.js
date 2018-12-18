import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import socketMiddleware from './redux/socketMiddleware'
import {survey} from './redux/survey'
import Main from './components/Main/Main'
// import * as serviceWorker from './serviceWorker'

const store = createStore(
  combineReducers({survey}),
  applyMiddleware(thunkMiddleware, socketMiddleware, createLogger()),
)

ReactDOM.render(<Provider store={store}><Main /></Provider>, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister()
