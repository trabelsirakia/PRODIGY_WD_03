// script.js
const cells = document.querySelectorAll('[data-cell]');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart-button');
const status = document.getElementById('status');

let isXNext = true;
let boardState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(e) {
    const cell = e.target;
    const index = [...cells].indexOf(cell);

    if (boardState[index] || checkWin()) return;

    boardState[index] = isXNext ? 'X' : 'O';
    cell.classList.add(isXNext ? 'x' : 'o');
    cell.textContent = isXNext ? 'X' : 'O';

    if (checkWin()) {
        status.textContent = `${isXNext ? 'Player X' : 'Player O'} wins!`;
        setTimeout(() => alert(`${isXNext ? 'Player X' : 'Player O'} wins!`), 100);
    } else if (boardState.every(cell => cell)) {
        status.textContent = 'It\'s a draw!';
        setTimeout(() => alert('It\'s a draw!'), 100);
    } else {
        isXNext = !isXNext;
        status.textContent = `Player ${isXNext ? 'X' : 'O'}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function restartGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    isXNext = true;
    status.textContent = "Player X's turn";
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
