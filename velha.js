document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const scoreXElement = document.getElementById("scoreX");
    const scoreOElement = document.getElementById("scoreO");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;
    let scoreX = 0;
    let scoreO = 0;

    initializeGame();

    function initializeGame() {
        cells.forEach(cell => {
            cell.addEventListener("click", () => handleCellClick(cell));
        });

        resetButton.addEventListener("click", resetGame);
    }

    function handleCellClick(cell) {
        if (gameActive) {
            const index = cell.dataset.index;

            if (gameBoard[index] === "") {
                gameBoard[index] = currentPlayer;
                cell.textContent = currentPlayer;

                if (checkWinner()) {
                    endGame(`Jogador ${currentPlayer} venceu!`);
                    updateScore();
                } else if (gameBoard.every(cell => cell !== "")) {
                    endGame("Empate!");
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                    updateStatus();
                }
            }
        }
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
        });
    }

    function endGame(message) {
        gameActive = false;
        status.textContent = message;
    }

    function updateStatus() {
        status.textContent = `É a vez do jogador ${currentPlayer}`;
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        gameActive = true;
        status.textContent = `É a vez do jogador ${currentPlayer}`;

        cells.forEach(cell => {
            cell.textContent = "";
        });
    }

    function updateScore() {
        if (currentPlayer === "X") {
            scoreX++;
            scoreXElement.textContent = `Jogador X: ${scoreX}`;
        } else {
            scoreO++;
            scoreOElement.textContent = `Jogador O: ${scoreO}`;
        }
    }
});

