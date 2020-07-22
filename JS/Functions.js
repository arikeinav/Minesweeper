// returns random numbers
function getRandomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//get date
function getTime() {
    return new Date().toString().split(' ')[4];
}

// render
function renderCars() {
    var strHTML = ''
    for (var i = 0; i < gCars.length; i++) {
        var car = gCars[i]
        strHTML += '<div class="car car' + (car.id) + '" onclick = "speedUp(' + i + ')" style="margin-left:' +
            car.distance + 'px ;" ></div > ';
    }
    var elRoad = document.querySelector('.road');
    elRoad.innerHTML = strHTML;
}

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}


// add sound:
function playSound() {
    var sound = new Audio("sound/pop.mp3");
    sound.play();
}

//creates an array of numbers
function NumArray() {
    var nums = [];
    for (var i = 0; i < 99; i++) {
        nums.push(i)
    }
    return nums;
}

// creates an array of numbers - no repeats!
function NumArray() {
    var nums = [];
    for (var i = 0; i < 16; i++) {
        var currNum = getRandomInteger(1, 16);
        while (nums.includes(currNum)) {
            currNum = getRandomInteger(1, 16);
        }
        nums.push(currNum);
    }
    console.log(nums);
    return nums;
};

//create items:
function createBalloon() {
    return {
        id: gNextId++,
        bottom: 0,
        speed: 10,
        isPopped: false,
        color: getRandomColor()
    }
}

// create items in an array:
function createBalloons() {
    var balloons = []
    for (var i = 0; i < currBallon; i++) {
        balloons.push(createBalloon())
    }
    return balloons
}

function sumCol(squareMat, colIdx) {
    var sum = 0;
    for (var i = 0; i < squareMat.length; i++) {
        sum += squareMat[i][colIdx]
    }
    return sum
};

function sumRow(squareMat, rowIdx) {
    var rowSum = 0;
    for (var j = 0; j < squareMat.length; j++) {

        rowSum += squareMat[rowIdx][j]
    }
    return rowSum
};

function SumPrimaryDiagonal(squareMat) {
    var priDiSum = 0;
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][d];
        priDiSum += item
    }
    return priDiSum
};

function SumSecondaryDiagonal(squareMat) {
    var SecDiSum = 0
    for (var d = 0; d < squareMat.length; d++) {
        var item = squareMat[d][squareMat.length - d - 1];
        SecDiSum += item
    }
    return SecDiSum
};

// check if its a magical square (compare the sums)
function isMagicSquare(squareMat) {
    if (squareMat.length !== squareMat[0].length) return false
    var magicSum = sumCol(squareMat, 0)
    for (var i = 0; i < squareMat.length; i++) {
        if (magicSum !== sumRow(squareMat, i)) return false
        if (SumPrimaryDiagonal(squareMat) !== magicSum) return false
        if (magicSum !== SumPrimaryDiagonal(squareMat)) return false
        if (magicSum !== sumCol(squareMat, i)) return false
    }
    console.table(squareMat)
    return true
};

// rander- connect the data with the render function
function renderBalloons() {
    var strHTML = '';
    for (var i = 0; i < gBalloons.length; i++) {
        var balloon = gBalloons[i]
        strHTML += getStrHTML(balloon, i)
    }
    var elSky = document.querySelector('.sky')
    elSky.innerHTML = strHTML
}

// count Neighbors- game of life:
function countNeighbors(cellI, cellJ, mat) {
    var neighborsSum = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= mat[i].length) continue;
            if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE) neighborsSum++;
        }
    }
    return neighborsSum;
}


// set interval:
// setInterval(function () { alert("Hello"); }, 3000);
// clearInterval()

// Move the player to a specific location
function moveTo(i, j) {

    var targetCell = gBoard[i][j];
    if (targetCell.type === WALL) return;

}

// Move the player by keyboard arrows
function handleKey(event) {

    var i = gGamerPos.i;
    var j = gGamerPos.j;


    switch (event.key) {
        case 'ArrowLeft':
            moveTo(i, j - 1);
            break;
        case 'ArrowRight':
            moveTo(i, j + 1);
            break;
        case 'ArrowUp':
            moveTo(i - 1, j);
            break;
        case 'ArrowDown':
            moveTo(i + 1, j);
            break;

    }

}

//create mat
function createMat(ROWS, COLS) {
    var mat = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push('')
        }
        mat.push(row)
    }
    return mat
}