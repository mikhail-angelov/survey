import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button
            className="App-link"
            rel="noopener noreferrer"
            onClick={()=>axios.get('/survey')}
          >
            Learn React
          </button>
        </header>
      </div>
    );
  }
}

export default App;
