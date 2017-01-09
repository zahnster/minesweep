import React, { Component } from 'react';
import Minesweeper from './components/Minesweeper';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Minesweeper.</h1>
        <Minesweeper />
      </div>
    );
  }
}

export default App;
