import React, { Component } from 'react';
import './style.css';

const HAPPY_GAME = '🙂';
const SAD_GAME = '😵';
const COMPLETE_GAME = '😁';
const BOMB = '💣';
const DEFAULT_GAME_STATE = {
    rows: 10,
    cols: 20,
    bombs: 30,
    flags: 0,
    bombsLeft: 30,
    board: [], // { row: 0, col: 0, value: '💣', isSecret: true, isFlagged: false }
    gameStatus: HAPPY_GAME  // 🙂 | 😵    
};

class Minesweeper extends Component {
    constructor() {
        super();
        
        // initializing state
        this.state = DEFAULT_GAME_STATE;

        // bound methods
        this.reset = this.reset.bind(this);
    }

    componentWillMount() {
        this.setState({...this.state, board: this.buildBoard() });
    }

    componentDidMount() {
        document.querySelector('.minesweeper').addEventListener('click', (event) => {
            if (event.target.classList.contains('minesweeper-cell') && this.state.gameStatus === HAPPY_GAME) { 
                this.selectCell(event.target);
            }
        });

        document.querySelector('.minesweeper').addEventListener('contextmenu', (event) => {
            if (this.state.gameStatus === HAPPY_GAME) {
                this.flagCell(event.target);
            }
            event.preventDefault();                
        });
    }

    /**
     * Methods for building the board and placing the numbers
     */
    buildBoard() {
        let board = [];

        for(let row = 0; row < this.state.rows; row++) {
            let rowArr = [];

            for(let col = 0; col < this.state.cols; col++) {
                rowArr.push({
                    row,
                    col,
                    value: null, // value is set later
                    isSecret: true,
                    isFlagged: false
                });
            }

            board.push(rowArr);
        }

        board = this.addMinesToBoard(board);
        board = this.addNumbersToBoard(board);

        return board;
    }

    addMinesToBoard(board) {
        let bombsPlaced = 0;

        while(bombsPlaced < this.state.bombs) {
            const randRow = this.getRandomIndex(this.state.rows);
            const randCol = this.getRandomIndex(this.state.cols);
            const randCell = board[randRow][randCol];

            if (!randCell.value) {
                board[randRow][randCol].value = BOMB;
                bombsPlaced++;
            }
        }

        return board;
    }

    addNumbersToBoard(board) {
        board.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                let bombCount = 0;

                if (cell.value !== BOMB) {
                    // if not bomb, find all neighbors
                    [-1, 0, 1].forEach(offsetRow => {
                        [-1, 0, 1].forEach(offsetCol => {
                            const neighborRow = rowIndex + offsetRow;
                            const neighborCol = cellIndex + offsetCol;

                            // checks for self-cell and cell existence
                            if (board[neighborRow] && board[neighborRow][neighborCol] && !(offsetRow === 0 && offsetCol === 0)) {
                                const neighborCell = board[neighborRow][neighborCol];

                                if (neighborCell.value === BOMB) {
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

    /**
     * Methods for Gameplay
     */
    selectCell(cellDOM) {
        const row = cellDOM.getAttribute('data-row');
        const col = cellDOM.getAttribute('data-cell');
        let newState = {...this.state};
        let cell = newState.board[row][col];

        cell.isSecret = false;

        switch(cell.value) {
            case BOMB:
                newState.gameStatus = SAD_GAME;
            break;

            case 0:
                newState.board = this.selectNeighbors(cell, newState.board);
            break;

            default:
            break;
        }

        this.setState(newState);
    }

    selectNeighbors(cell, board) {
        const currentRow = cell.row;
        const currentCol = cell.col;

        cell.isSecret = false;

        [-1, 0, 1].forEach(row => {
            [-1, 0, 1].forEach(col => {
                const newRow = currentRow + row;
                const newCol = currentCol + col;

                if (board[newRow] && board[newRow][newCol]) {
                    const newCell = board[newRow][newCol];

                    // recurse if needed
                    if (newCell.value === 0 && newCell.isSecret) {
                        board = this.selectNeighbors(newCell, board);
                    }
                    else {
                        newCell.isSecret = false;
                    }
                }
            });
        });

        return board;
    }

    flagCell(cellDOM) {
        const row = cellDOM.getAttribute('data-row');
        const col = cellDOM.getAttribute('data-cell');
        let newState = {...this.state};
        let cell = newState.board[row][col];

        // toggle on
        if (!cell.isFlagged) {
            cell.isFlagged = true;
            newState.flags++;

            if (cell.value === BOMB) {
                newState.bombsLeft--;
            }
        }
        // toggle off
        else {
            cell.isFlagged = false;
            newState.flags--;

            if (cell.value === BOMB) {
                newState.bombsLeft++;
            }
        }

        if (newState.bombsLeft === 0) {
            newState.gameStatus = COMPLETE_GAME;
        }
        
        this.setState(newState);
    }

    /**
     * Reset Game
     */
    reset() {
        const newGame = DEFAULT_GAME_STATE;
        newGame.board = this.buildBoard();

        this.setState(newGame);
    }

    render() {
        const board = this.state.board;
        const status = this.state.gameStatus;
        const bombsLeft = this.state.bombs - this.state.flags;
        const startOverButton = (status === SAD_GAME || status === COMPLETE_GAME) ? <button className='start-over' onClick={this.reset}>Start Over?</button> : null;

        return (
            <div className='minesweeper'>
                <div className='stats'>
                    <dl>
                        <dt>Bombs Left</dt>
                        <dd>{bombsLeft}</dd>

                        <dt>Status</dt>
                        <dd>{status}</dd>
                    </dl>
                </div>

                <div className='game-board'>
                    {board.map((row, rowIndex) => {
                        return (
                            <div className='minesweeper-row' key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    let cellValue = cell.isSecret ? null : cell.value;
                                    let cellClass = 'minesweeper-cell';
                                    cellClass += cell.isSecret ? ' cell-unselected' : ' cell-selected';

                                    if (cellValue === 0) cellValue = '';
                                    if (cell.isFlagged) cellValue = '🚩';

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

                {startOverButton}
            </div>
        );
    }
}

export default Minesweeper;