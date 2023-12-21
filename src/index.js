import "../style.css";

const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ['O', 'L', 'RL', 'J', 'S', 'Z', 'T', 'I'];

const TETROMINOES = {
    O: [
        [1, 1],
        [1, 1],
    ],
    L: [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    RL: [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
    ],
    J: [
        [1, 1, 0],
        [0, 1, 0],
        [1, 1, 0],
    ],
    S: [
        [0, 1, 1],
        [0, 1, 0],
        [1, 1, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 0],
        [0, 1, 1],
    ],
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    I: [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
    ],
};

let playField;
let tetromino;

function randomGenerator(from, to) {
    return Math.floor(Math.random() * (to - from) + from);
}

function centeredTetromino(PLAYFIELD_COLUMNS, lengthTetromino) {
    return Math.floor((PLAYFIELD_COLUMNS - lengthTetromino) / 2);
}

function randomColor() {
    const r = randomGenerator(0, 256);
    const g = randomGenerator(0, 256);
    const b = randomGenerator(0, 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField() {
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playField = new Array(PLAYFIELD_ROWS)
        .fill(0)
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

function randomTetromino() {
    const amount = TETROMINO_NAMES.length;
    const randomtetro = randomGenerator(0, amount);
    return TETROMINO_NAMES[randomtetro];
}

function generateTetromino() {
    const nameTetro = randomTetromino();
    const matrixTetro = TETROMINOES[nameTetro];
    const rowTetro = 3;
    const columnTetro = centeredTetromino(PLAYFIELD_COLUMNS, matrixTetro.length);
    const colorTetro = randomColor();

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,
        color: colorTetro,
    };
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');


function drawPlayField() {
    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            const name = playField[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino() {
    const name = tetromino.name;
    const color = tetromino.color;
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (tetromino.matrix[row][column] === 0) {
                continue;
            }

            const cellIndex = convertPositionToIndex(
                tetromino.row + row,
                tetromino.column + column
            );
            cells[cellIndex].classList.add(name);
            cells[cellIndex].style.setProperty('--color-tetromino', color);
        }
    }
}

drawTetromino();

function draw() {
    cells.forEach(function (cell) {
        cell.removeAttribute('class');
    });
    drawPlayField();
    drawTetromino();
}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    switch (event.key) {
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
    }
    draw();
}

function moveTetrominoDown() {
    tetromino.row += 1;
    if (isOutsideOfGameBoard()) {
        tetromino.row -= 1;
        placeTetromino();
    }
}

function moveTetrominoLeft() {
    tetromino.column -= 1;
    if (isOutsideOfGameBoard()) {
        tetromino.column += 1;
    }
}

function moveTetrominoRight() {
    tetromino.column += 1;
    if (isOutsideOfGameBoard()) {
        tetromino.column -= 1;
    }
}

function isOutsideOfGameBoard() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if (!tetromino.matrix[row][column]) {
                continue;
            }
            if (
                tetromino.column + column < 0 ||
                tetromino.column + column >= PLAYFIELD_COLUMNS ||
                tetromino.row + row >= playField.length
            ) {
                return true;
            }
        }
    }
    return false;
}

function placeTetromino() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if (!tetromino.matrix[row][column]) continue;

            playField[tetromino.row + row][tetromino.column + column] =
                TETROMINO_NAMES[0];
            // tetromino.name;
        }
    }
    generateTetromino();
}
