function printMat(mat, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = 'cell cell' + i + '-' + j;
            strHTML += '<td class="' + className + '"> ' + cell + ' </td>'
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function renderCell(location, value) {
    var cellSelector = '.' + getClassName(location)
    var elCell = document.querySelector('.cell');
    elCell.innerHTML = value;
}

function countNgs(board, pos) {
    var count = 0;
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i === pos.i && j === pos.j) continue;
            if (!checkIfInBoard(board, { i: i, j: j })) continue;
            if (board[i][j] !== EMPTY_CELL) count++;
        }
    }
    return count;
}





function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}