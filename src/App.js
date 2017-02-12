import React, { Component } from 'react'
import Intro from './components/Intro'
// import Minesweeper from './components/Minesweeper';

import './app.css'

class App extends Component {
    render() {
        return (
            <div className='app'>
                <Intro />
            </div>
        )
    }
}

export default App