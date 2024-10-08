// Elementos del DOM
const board = document.getElementById('board'); // Tablero del juego
const turnIndicator = document.getElementById('turn-indicator'); // Indicador del turno
let currentPlayer = 'X'; // Jugador actual
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Tablero del juego representado como un array

// Función para crear el tablero
function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div'); // Creamos una celda
        cell.classList.add('cell'); // Añadimos la clase 'cell'
        cell.setAttribute('data-index', i); // Establecemos el índice de la celda
        cell.addEventListener('click', handleCellClick); // Añadimos el evento click
        board.appendChild(cell); // Añadimos la celda al tablero
    }
}

// Función que maneja el clic en una celda
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index'); // Obtenemos el índice de la celda
    if (gameBoard[index] === '') { // Verificamos si la celda está vacía
        gameBoard[index] = currentPlayer; // Actualizamos el tablero
        e.target.textContent = currentPlayer; // Mostramos el jugador actual en la celda
        if (checkWinner()) { // Verificamos si hay un ganador
            alert(`¡Jugador ${currentPlayer} ha ganado!`); // Mensaje de victoria
            resetGame(); // Reiniciar el juego
        } else if (gameBoard.every(cell => cell !== '')) { // Verificamos si hay un empate
            alert('¡Empate!'); // Mensaje de empate
            resetGame(); // Reiniciar el juego
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X'; // Cambiamos de jugador
            updateTurnIndicator(); // Actualizamos el indicador de turno
        }
    }
}

// Función para verificar si hay un ganador
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6] // Diagonales
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]; // Verificamos si hay un ganador
    });
}

// Función para reiniciar el juego
function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', '']; // Reiniciamos el tablero
    currentPlayer = 'X'; // Reiniciamos al jugador X
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = ''); // Limpiamos las celdas
    updateTurnIndicator(); // Actualizamos el indicador de turno
}

// Función para actualizar el indicador de turno
function updateTurnIndicator() {
    turnIndicator.textContent = `Turno de: ${currentPlayer}`; // Mostramos el turno actual
    document.body.style.backgroundColor = currentPlayer === 'X' ? '#e6ffe6' : '#e6f3ff'; // Cambiamos el color de fondo según el jugador
}

// Inicializamos el juego
createBoard(); // Creamos el tablero
updateTurnIndicator(); // Actualizamos el indicador de turno
