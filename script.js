'use strict'
function Cell(){
    let _token = 0;

    const setToken = (player) => {
        _token = player;
    }

    const getToken = () => _token;

    return{
        setToken,
        getToken
    };
}

function Board(){
    const _rows = 3;
    const _columns = 3;
    const _board = [];

    for(let i = 0; i < _rows; i++){
        _board[i] = [];
        for(let j = 0; j < _columns; j++){
            _board[i].push(Cell());
        }
    }

    const getBoard = () => _board;

    const addToken = (row, column, player) => {
        const cell = _board[row][column];

        if(cell.getToken() === 0){
            cell.setToken(player);
            return true;
        } 
        return false;
    }

    return{
        getBoard,
        addToken,
    }
}