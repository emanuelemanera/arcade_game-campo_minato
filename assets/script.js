/* FUNZIONI */

// Aggiornare il punteggio
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(5, 0);

    if (score === maxScore) endGame(true);
}

// Decretare la fine del gioco
function endGame(isVictory) {
    if (isVictory === true) {
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU<br>WIN';
    }

    revealAllBombs();

    endGameScreen.classList.remove('hidden');
}

// Ricaricare la pagina
function playAgain() {
    location.reload();
}

// Rivela tutte le bombe
function revealAllBombs() {
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        if (bombsList.includes(i)) {
            const cellToReveal = cells[i - 1];
            cellToReveal.classList.add('cell-bomb');
        }
    }
}

/* PREPARAZIONE */

// Elementi di interesse della pagina
const scoreCounter = document.querySelector('.score-counter');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Informazioni utili alla logica del gioco 
const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

// Generare X bombe casuali
while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) bombsList.push(number);
}

// console.log(bombsList);

/* GRIGLIA E LOGICA DI GIOCO */

let isCellEven = false;
let isRowEven = false;

for (let i = 1; i <= 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');

    // cell.innerText = i;

    isCellEven = i % 2 === 0;

    if ((isRowEven && isCellEven) || (!isRowEven && !isCellEven)) cell.classList.add('cell-dark');

    if (i % 10 === 0) isRowEven = !isRowEven;

    cell.addEventListener('click', function () {
        if (cell.classList.contains('cell-clicked')) return;

        // console.log('Cliccata cella ', i);

        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb');
            endGame(false);
        } else {
            cell.classList.add('cell-clicked');
            updateScore();
        }
    })

    grid.append(cell);
}

/* RIGIOCA */

playAgainButton.addEventListener('click', playAgain);
