import React from 'react'
import './style.css'

export default (props) => {
	return (
        <div className='intro'>
        	<div className='intro-content'>
				<h1 className='title'>minesweep</h1>

				<div className='controls'>
					<a href='#' onClick={(e) => {
						e.preventDefault()
						props.playRandomGame()}}>

						play random game
					</a>
					
					<span className='or'>or</span>
					
					<a href='#' onClick={(e) => {
						e.preventDefault() 
						props.createCustomGame()}}>

						create custom game
					</a>
				</div>
        	</div>
        </div>
	)
}