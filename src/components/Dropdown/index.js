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

		return (
			<div className={dropdownClass}>
				<div className='label' onClick={this.toggleDropdown}>start new game</div>
				<ul className='options'>
					<li>easy</li>
					<li>medium</li>
					<li>hard</li>
					<li>evil</li>
				</ul>
			</div>
		)
	}

}

export default Dropdown