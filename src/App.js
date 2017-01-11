import React, { Component } from 'react';
import Minesweeper from './components/Minesweeper';

import './app.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Minesweeper.</h1>
        <Minesweeper />

        <div className='github-link'>
            <a href='https://github.com/zahnster/minesweep'>Check out my source code on GitHub</a>
        </div>        
      </div>
    );
  }
}

export default App;
