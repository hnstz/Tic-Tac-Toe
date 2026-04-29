'use strict'
function Cell() {
    let _token = 0;

    const setToken = (playerToken) => {
        _token = playerToken;
    }

    const getToken = () => _token;

    return {
        setToken,
        getToken
    };
}

function Board() {
    const _rows = 3;
    const _columns = 3;
    const _board = [];

    for (let i = 0; i < _rows; i++) {
        _board[i] = [];
        for (let j = 0; j < _columns; j++) {
            _board[i].push(Cell());
        }
    }

    const getBoard = () => _board;

    const addToken = (row, column, playerToken) => {
        const _cell = _board[row][column];

        if (_cell.getToken() === 0) {
            _cell.setToken(playerToken);
            return true;
        }
        return false;
    }

    return {
        getBoard,
        addToken,
    }
}

function GameController(
    playerOneName = 'player one',
    playerTwoName = 'player two'
) {
    const _board = Board();
    const getBoard = () => _board.getBoard();
    const players = [
        {
            name: playerOneName,
            token: 'X',
        },
        {
            name: playerTwoName,
            token: 'O',
        },
    ];

    let activePlayer = players[0];
    const switchActivePlayer = () => {
        activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;


    const playRound = (row, column) => {

        _board.addToken(row, column, activePlayer.token);


        if (checkWin() === true) {
            stopGame();
        } else {
            switchActivePlayer();
        }
    }

    const stopGame = () => {
        setTimeout(() => {
            alert(`${activePlayer.token} won!`);
            location.reload();
        }, 10);

    }

    const checkWin = () => {
        let currToken = activePlayer.token;
        let diagonalWin = true;
        let streightWin = true;
        let currBoard = _board.getBoard();
        let mainDiag = true;
        let secondDiag = true;
        
        // diagonal check
        for (let i = 0, j = 0; i < 3, j < 3; i++, j++) {
            if (currBoard[i][j].getToken() !== activePlayer.token) {
                mainDiag = false;
            }
            if (currBoard[i][2 - j].getToken() !== activePlayer.token) {
                secondDiag = false;
            }
        }

        // straight check
        for (let i = 0; i < 3; i++) {
            let colWin = true;
            let rowWin = true;
            for (let j = 0; j < 3; j++) {
                if (currBoard[i][j].getToken() !== activePlayer.token) {
                    rowWin = false;
                }
                if (currBoard[j][i].getToken() !== activePlayer.token) {
                    colWin = false;
                }
            }
            streightWin = colWin || rowWin;
            if (streightWin === true) { return true };
        }

        // draw check
        let draw = true;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                draw = (currBoard[i][j].getToken() === 0) ? false : true;
                if (draw === false) { break };
            }
            if (draw === false) { break };
        }
        if (draw) { setTimeout(() => alert('draw!'), 10) };
        return mainDiag || secondDiag || streightWin;
    }

    return {
        playRound,
        getActivePlayer,
        getBoard,
        checkWin,
    }
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = () => {
        boardDiv.textContent = '';
        const board = game.getBoard();
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                const cell = document.createElement('button');
                cell.dataset.row = i;
                cell.dataset.column = j;
                cell.textContent = (board[i][j].getToken() === 0) ? '' : board[i][j].getToken();
                boardDiv.appendChild(cell);
                cell.addEventListener('click', (e) => clickHandlerBoard(e));
            }
        }
    }

    updateScreen();

    function clickHandlerBoard(e) {
        const selectedCell = [e.target.dataset.row, e.target.dataset.column];
        if (!selectedCell) return;
        game.playRound(selectedCell[0], selectedCell[1]);
        updateScreen();

    }
}

ScreenController();