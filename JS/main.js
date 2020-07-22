'use strict'
console.log('ok');

const MINE = '💣';
const FLAG = '🚩';


var gBoard = [];

var gLevel = {
    size: 4,
    mines: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gBoard = createBoard(gLevel.size);
    console.log(gBoard);
    randomMines()
    gGame.isOn = true
    console.table(gBoard);
    renderBoard(gBoard)
    checkIfMine(gBoard)
}

function createBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        board[i] = []
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                i: i,
                j: j,
                isShown: false,
                type: 0
            }

        }
    }
    return board
}

function renderBoard(board) {
    var htmlStr = ''
    for (var i = 0; i < board.length; i++) {
        htmlStr += '<tr>'
        for (var j = 0; j < board.length; j++) {
            if (!board[i][j].isShown) {
                htmlStr += `<td class = "cell" onmousedown="WhichButton(event)" onclick = "cellClick(this, ${i} , ${j})"> </td>`;
            } else {
                htmlStr += `<td class = "cell" style="background-color:blue;" onclick = "cellClick(this, ${i} , ${j})">${board[i][j].type} </td>`;

            }

        }
        htmlStr += '</tr>'
    }
    var elBoard = document.querySelector('.gameboard');
    elBoard.innerHTML = htmlStr;
}

function checkIfMine(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {

            if (board[i][j].type === MINE) {
                setMinesNegsCount(board, board[i][j])

            }
        }
    }
    renderBoard(board)
}

function setMinesNegsCount(board, pos) {

    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === pos.i && j === pos.j) continue;
            if (board[i][j].type === MINE) continue;
            else board[i][j].type++

        }
    }
    return board
}

function cellClick(cell, i, j) {
    var currCell = gBoard[i][j];
    currCell.isShown = true;
    renderBoard(gBoard)

    if (currCell.type === MINE) {
        gameOver()

    }
    if (currCell.type === 0) {
        currCell.isShown = true;
        for (var i = currCell.i - 1; i <= currCell.i + 1; i++) {
            if (i < 0 || i >= gBoard.length) continue;
            for (var j = currCell.j - 1; j <= currCell.j + 1; j++) {
                if (j < 0 || j >= gBoard[i].length) continue;
                if (i === currCell.i && j === currCell.j) continue;
                if (gBoard[i][j].type === MINE) continue;

                else gBoard[i][j].isShown = true;
                renderBoard(gBoard)
            }
        }
    }
}


function randomMines() {
    var empties = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            empties.push(gBoard[i][j]);
        }
    }
    console.log(empties);
    for (var i = 0; i < gLevel.mines; i++) {
        var randomPos = [getRandomInt(0, empties.length)]
        var coord = empties[randomPos]
        gBoard[coord.i][coord.j].type = MINE
        empties.splice(randomPos, 1)

    }
}

function gameOver() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            gBoard[i][j].isShown = true;

        }
    }
    renderBoard(gBoard)

}

function eazyBoard() {
    gLevel = {
        size: 4,
        mines: 2
    };
    init()
}

function hardBoard() {
    gLevel = {
        size: 8,
        mines: 12
    };
    init()
}

function expertBoard() {
    gLevel = {
        size: 12,
        mines: 30
    };
    init()
}