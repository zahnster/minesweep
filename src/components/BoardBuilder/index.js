import React, { Component } from 'react'
import './style.css'

class BoardBuilder extends Component {
	constructor() {
		super()

		this.state = {
			cols: 20,
			rows: 12,
			bombs: 30
		}

		this.addRow = this.addRow.bind(this)
		this.subtractRow = this.subtractRow.bind(this)
		this.addCol = this.addCol.bind(this)
		this.subtractCol = this.subtractCol.bind(this)
		this.setBombs = this.setBombs.bind(this)
	}

	addRow() {
		let rows = this.state.rows + 1
		if (rows > 100) rows = 100

		this.setState({ rows })
	}

	subtractRow() {
		let rows = this.state.rows - 1
		if (rows < 5) rows = 5

		this.setState({ rows })
	}

	addCol() {
		let cols = this.state.cols + 1
		if (cols > 100) cols = 100

		this.setState({ cols })
	}

	subtractCol() {
		let cols = this.state.cols - 1
		if (cols < 5) cols = 5

		this.setState({ cols })
	}

	setBombs(e) {
		const maxBombs = Math.floor((this.state.rows * this.state.cols) * 0.8)
		let bombs = e.target.value
		if (bombs > maxBombs) bombs = maxBombs

		console.log(maxBombs)

		// if (bombs < 5) bombs = 5

		this.setState({ bombs })
	}

	render() {
		const { cols, rows } = this.state
		const board = []

		for(let row = 0; row < rows; row++) {
			board[row] = []

			for(let col = 0; col < cols; col++) {
				board[row].push(<div key={`cell-${row}-${col}`} className='cell'></div>)
			}
		}

		return (
			<div className='board-builder'>
				<div className='board-builder-content'>
					<h1 className='title'>Build your board</h1>

					<div className='board-builder-board'>
						<div className='controls controls-row'>
							<button onClick={this.subtractRow} className='control subtract'>-</button>
							<button onClick={this.addRow} className='control add'>+</button>
						</div>

						<div className='controls controls-col'>
							<button onClick={this.subtractCol} className='control subtract'>-</button>
							<button onClick={this.addCol} className='control add'>+</button>
						</div>

						{board.map((row, rowIndex) => {
							return (
								<div key={`row-${rowIndex}`} className='row'>
									{row.map(cell => cell)}
								</div>
							)
						})}
					</div>

					<div className='bomb-count'>
						<input type='text' onChange={(e) => this.setBombs(e)} value={this.state.bombs} />
					</div>
				</div>
			</div>
		)
	}
}

export default BoardBuilder