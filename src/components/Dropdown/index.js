import React, { Component } from 'react'
import './style.css'

class Dropdown extends Component {
	constructor() {
		super()

		this.state = {
			isOpen: false
		}

		this.toggleDropdown = this.toggleDropdown.bind(this)
	}

	toggleDropdown() {
		this.setState({ isOpen: !this.state.isOpen })
	}

	render() {
		const dropdownClass = this.state.isOpen ? 'dropdown open' : 'dropdown'
		const { playGame } = this.props

		return (
			<div className={dropdownClass}>
				<div className='label' onClick={this.toggleDropdown}>
					start new game
				</div>

				<ul className='options'>
					<li onClick={() => playGame('easy')}>
						easy (10 x 10 x 10)
					</li>
					<li onClick={() => playGame('medium')}>
						medium (10 x 20 x 25)
					</li>
					<li onClick={() => playGame('hard')}>
						hard (15 x 20 x 50)
					</li>
					<li onClick={() => playGame('evil')}>
						evil (20 x 25 x 100)
					</li>
				</ul>
			</div>
		)
	}

}

export default Dropdown