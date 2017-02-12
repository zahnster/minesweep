import React from 'react'
import './style.css'

export default () => {
	return (
        <div className='intro'>
        	<div className='intro-content'>
				<h1 className='title'>minesweep</h1>

				<div className='controls'>
					<a href='#'>play random game</a>
					<span className='or'>or</span>
					<a href='#'>create custom game</a>
				</div>
        	</div>
        </div>
	)
}