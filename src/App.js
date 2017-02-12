import React, { Component } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Intro from './components/Intro'
import BoardBuilder from './components/BoardBuilder'
import Minesweeper from './components/Minesweeper'

import './app.css'

class App extends Component {
    constructor() {
        super()

        this.state = {
            gameState: 'intro'
        }

        this.createCustomGame = this.createCustomGame.bind(this)
        this.playRandomGame = this.playRandomGame.bind(this)
    }

    createCustomGame() {
        this.setState({ gameState: 'boardBuilder' })
    }

    playRandomGame() {
        this.setState({ gameState: 'game' })
    }

    render() {
        let gameStateComponent = null


        switch(this.state.gameState) {
            case 'intro':
                gameStateComponent = <Intro key='intro' createCustomGame={this.createCustomGame} playRandomGame={this.playRandomGame} />
            break

            case 'boardBuilder':
                gameStateComponent = <BoardBuilder key='boardBuilder' />
            break

            case 'game':
                gameStateComponent = <Minesweeper key='game' />
            break

            default:
            break
        }

        return (
            <div className='app'>
                <ReactCSSTransitionGroup
                    transitionName='game-state'
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={500}>
                        {gameStateComponent}
                </ReactCSSTransitionGroup>
            </div>
        )
    }
}

export default App