'use strict'
console.log('ok');

const MINE = '💣';
const FLAG = '🚩';
const LOSS = '&#128520';
const WIN = '&#128526';
const CLUE = '&#9757'
const CLUES = '&#9757;&#127995'



var gClicked
var gBoard = [];
var gTime = 0
var gTimeInterval = null
var gLevel = {
    size: 4,
    mines: 2
};
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    isClue: false
}

function init() {
    gClicked = false
    resetButton()
    showClues(2);
    showClues(1);
    showClues(3);
    gTime = 0;
    clearInterval(gTimeInterval)
    gTimeInterval = false;
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isClue: false
    }
    gBoard = createBoard(gLevel.size);

    renderBoard(gBoard)
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
                type: 0,
                gameElement: ''
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
            if (!board[i][j].isShown && board[i][j].gameElement === '') {
                htmlStr += `<td class = "cell" onmousedown="WhichButton(event, ${i},${j})" onclick = "cellClick(this, ${i} , ${j})"> </td>`;
            } else if (!board[i][j].isShown && board[i][j].gameElement === FLAG) {
                htmlStr += `<td class = "cell" onmousedown="WhichButton(event, ${i},${j})" onclick = "cellClick(this, ${i} , ${j})">${board[i][j].gameElement} </td>`;
            } else {
                htmlStr += `<td class = "cell" style="background-color:gray;" onclick = "cellClick(this, ${i} , ${j})">${board[i][j].type} </td>`;
            }
        }
        htmlStr += '</tr>'
        var elBoard = document.querySelector('.gameboard');
        elBoard.innerHTML = htmlStr;
    }
}

function checkIfMine(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j].type === MINE) {
                setMinesNegsType(board, board[i][j])
            }
        }
    }
    renderBoard(board)
}

function showClue(currCell) {
    var clues = []
    for (var i = currCell.i - 1; i <= currCell.i + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = currCell.j - 1; j <= currCell.j + 1; j++) {
            if (j < 0 || j >= gBoard[i].length) continue;
            if (gBoard[i][j].isShown) continue;
            else {
                console.log('dfdcdc')
                gBoard[i][j].isShown = true
                clues.push(gBoard[i][j])
                renderBoard(gBoard)
                setTimeout(function() {
                    gGame.isClue = false
                    for (var i = 0; i < clues.length; i++) {
                        clues[i].isShown = false
                        renderBoard(gBoard)
                    }
                    console.log(clues)
                }, 1000)
            }
        }
    }
}

function setMinesNegsType(board, pos) {

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
    gClicked = true
    if (gGame.isClue) {
        deleteClue()
        console.log('kdkc')
        showClue(currCell)
    }
    if (!gGame.isOn) {
        randomMines(currCell);
        checkIfMine(gBoard);
        gGame.isOn = true;
    }
    if (!gTimeInterval) {
        gTimeInterval = setInterval(timer, 1000);
    }
    if (currCell.gameElement === FLAG) return;
    currCell.isShown = true;
    renderBoard(gBoard)

    if (currCell.type === MINE && !gGame.isClue) {
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
                else {
                    gBoard[i][j].isShown = true;
                    renderBoard(gBoard)
                }
            }
        }
    }
    checkVictory()
}

function randomMines(cell) {
    var empties = [];
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j] === cell) continue;
            empties.push(gBoard[i][j]);
        }
    }
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
            gGame.isOn = false

            var restartButton = document.querySelector('.restart button');
            restartButton.innerHTML = LOSS
            clearInterval(gTimeInterval)
        }
    }
    alert('YOU LOSE!!!')
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

function WhichButton(event, i, j) {
    if (event.button === 2) {
        if (!gTimeInterval) {
            gTimeInterval = setInterval(timer, 1000);
        }

        if (gBoard[i][j].gameElement === FLAG) {
            gBoard[i][j].gameElement = ''
            renderBoard(gBoard)
            gGame.markedCount--
        } else {
            gBoard[i][j].gameElement = FLAG;
            renderBoard(gBoard);
            gGame.markedCount++
                console.log(gGame);
        }
    }
    checkVictory()
}

function resetButton() {
    var restartButton = document.querySelector('.restart button');
    restartButton.innerHTML = '&#128512'
}

function checkVictory() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) {
            if (gBoard[i][j].isShown) {
                gGame.shownCount++
            }
        }
    }
    if ((gGame.shownCount === (gLevel.size ** 2) - gLevel.mines) && (gGame.markedCount === gLevel.mines)) {
        alert('Good Job!!!');
        gGame.isOn = false
        var restartButton = document.querySelector('.restart button');
        restartButton.innerHTML = WIN
        clearInterval(gTimeInterval)
        renderBoard(gBoard)
    }
    gGame.shownCount = 0
}

function timer() {
    gTime++
    var elTime = document.querySelector('.timer')
    elTime.innerText = gTime
}

function setClue(button) {
    if (!gGame.isClue) {
        gGame.isClue = true
        button.innerHTML = CLUE
        button.classList.add('light')
        console.log(button)
    }
}

function showClues(button) {
    var elClue = document.querySelector('.hint .hint' + button + '')
    elClue.style.display = 'block'
    elClue.innerHTML = CLUES
    console.log(elClue)

}

function deleteClue() {
    if (gClicked) {
        var elClue = document.querySelector('.light')
        elClue.style.display = 'none'
        elClue.classList.remove('light')
        gClicked = false
    }
}