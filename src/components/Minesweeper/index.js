import React, { Component } from 'react';
import './style.css';

class Minesweeper extends Component {
    constructor() {
        super();
        
        this.state = {
            rows: 10,
            cols: 10,
            bombs: 20,
            board: [] // { row: 1, col: 1, value: 'bomb', isSecret: true }
        };

        this.buildBoard = this.buildBoard.bind(this);
    }

    componentWillMount() {
        this.buildBoard();
    }

    componentDidMount() {
        document.querySelector('.minesweeper').addEventListener('click', (event) => {
            console.log(event.target)
        });
    }

    buildBoard() {
        let board = [];

        for(let row = 1; row <= this.state.rows; row++) {
            let rowArr = [];

            for(let col = 1; col <= this.state.cols; col++) {
                rowArr.push({
                    row,
                    col,
                    value: null, // value is set later
                    isSecret: true
                });
            }

            board.push(rowArr);
        }

        board = this.addMinesToBoard(board);
        board = this.addNumbersToBoard(board);

        this.setState({...this.state, board});
    }

    addMinesToBoard(board) {
        let bombsPlaced = 0;

        while(bombsPlaced < this.state.bombs) {
            const randRow = this.getRandomIndex(this.state.rows);
            const randCol = this.getRandomIndex(this.state.cols);
            const randCell = board[randRow][randCol];

            if (!randCell.value) {
                board[randRow][randCol].value = 'bomb';
                bombsPlaced++;
            }
        }

        return board;
    }

    addNumbersToBoard(board) {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                let bombCount = 0;

                if (cell.value !== 'bomb') {
                    // if not bomb, find all neighbors
                    [-1, 0, 1].forEach(offsetRow => {
                        [-1, 0, 1].forEach(offsetCol => {
                            const neighborRow = rowIndex + offsetRow;
                            const neighborCol = cellIndex + offsetCol;

                            // checks for self-cell and cell existence
                            if (board[neighborRow] && board[neighborRow][neighborCol] && !(offsetRow === 0 && offsetCol === 0)) {
                                const neighborCell = board[neighborRow][neighborCol];

                                if (neighborCell.value === 'bomb') {
                                    bombCount++;
                                }
                            }
                        });
                    });
    
                    cell.value = bombCount;
                }
            });
        });

        return board;
    }

    getRandomIndex(max) {
        return Math.round(Math.random() * (max - 1));
    }

    render() {
        const board = this.state.board;

        return (
            <div className='minesweeper'>
                {board.map((row, rowIndex) => {
                    return (
                        <div className='minesweeper-row' key={rowIndex}>
                            {row.map((cell, cellIndex) => {
                                let cellValue = cell.isSecret ? null : cell.value;
                                let cellClass = 'minesweeper-cell cell-unselected';

                                // testing only
                                if (cell.value === 'bomb') {
                                    cellClass = 'minesweeper-cell cell-bomb';
                                }
                                else {
                                    cellValue = cell.value;
                                }

                                return (
                                    <div className={cellClass} key={cellIndex} data-row={rowIndex} data-cell={cellIndex}>
                                        {cellValue}
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Minesweeper;