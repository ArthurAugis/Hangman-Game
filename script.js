var wordList = ["ordinateur", "java", "javascript", "html", "css", "php", "c#", "c++", "serveur", "developpement", "methodes", "getter", "setter", "ddos", "github", "gitlab", "database", "sql", "documentations", "pendu", "hebergeur", "logiciels"];

var randomWord = wordList[Math.floor(Math.random() * wordList.length)];

var remainingGuesses = 6;
var guessedLetters = [];

function displayWord() {
    var wordDisplay = "";
    for (var i = 0; i < randomWord.length; i++) {
        if (guessedLetters.indexOf(randomWord[i]) !== -1) {
            wordDisplay += randomWord[i];
        } else {
            wordDisplay += "-";
        }
    }
    document.getElementById("word-display").textContent = wordDisplay;
}

function displayGuesses() {
    document.getElementById("remaining-guesses").textContent = remainingGuesses;
    document.getElementById("previous-guesses").textContent = guessedLetters.join(" ");
}

function guessLetter() {
    var guessInput = document.getElementById("guess-input");
    var letter = guessInput.value.toLowerCase();
    guessInput.value = "";

    if (guessedLetters.indexOf(letter) === -1) {
        guessedLetters.push(letter);
        if (randomWord.indexOf(letter) === -1) {
            remainingGuesses--;
        }
    }

    displayWord();
    displayGuesses();
    drawHangman();

    if (remainingGuesses === 0) {
        gameOver();
    } else if (!document.getElementById("word-display").textContent.includes("-")) {
        gameWon();
    }
}

function drawHangman() {
    var canvas = document.getElementById("hangman-canvas");
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.lineWidth = 2;
    context.strokeStyle = "#333";

    context.beginPath();
    context.moveTo(20, canvas.height - 20);
    context.lineTo(canvas.width - 20, canvas.height - 20);
    context.stroke();

    context.beginPath();
    context.moveTo(40, 20);
    context.lineTo(40, canvas.height - 20);
    context.stroke();

    context.beginPath();
    context.moveTo(40, 20);
    context.lineTo(canvas.width / 2, 20);
    context.stroke();

    context.beginPath();
    context.moveTo(canvas.width / 2, 20);
    context.lineTo(canvas.width / 2, 40);
    context.stroke();

    if (remainingGuesses < 6) {
        context.beginPath();
        context.arc(canvas.width / 2, 60, 20, 0, Math.PI * 2);
        context.stroke();
    }

    if (remainingGuesses < 5) {
        context.beginPath();
        context.moveTo(canvas.width / 2, 80);
        context.lineTo(canvas.width / 2, 170);
        context.stroke();
    }

    if (remainingGuesses < 4) {
        context.beginPath();
        context.moveTo(canvas.width / 2, 100);
        context.lineTo(canvas.width / 2 - 30, 130);
        context.stroke();
    }

    if (remainingGuesses < 3) {
        context.beginPath();
        context.moveTo(canvas.width / 2, 100);
        context.lineTo(canvas.width / 2 + 30, 130);
        context.stroke();
    }

    if (remainingGuesses < 2) {
        context.beginPath();
        context.moveTo(canvas.width / 2, 170);
        context.lineTo(canvas.width / 2 - 30, 220);
        context.stroke();
    }

    if (remainingGuesses < 1) {
        context.beginPath();
        context.moveTo(canvas.width / 2, 170);
        context.lineTo(canvas.width / 2 + 30, 220);
        context.stroke();
    }
}

function showModal(title, message) {
    var modal = document.getElementById("modal");
    var modalTitle = document.getElementById("modal-title");
    var modalContent = document.getElementById("modal-content");

    modalTitle.textContent = title;
    modalContent.textContent = message;

    modal.style.display = "block";
}

function gameOver() {
    showModal("Défaite", "Perdu ! Le mot était : " + randomWord);
    resetGame();
}

function gameWon() {
    showModal("Victoire", "Bravo, vous avez gagné !");
    resetGame();
}

function resetGame() {
    remainingGuesses = 6;
    guessedLetters = [];
    randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    displayWord();
    displayGuesses();
    drawHangman();
}

function closeModal() {
    var modal = document.getElementById("modal");
    modal.style.display = "none";
}

function handleKeyPress(event) {
    if (event.keyCode === 13) {
        guessLetter();
    }
}

document.getElementById("guess-input").addEventListener("keypress", handleKeyPress);

window.onload = function() {
    displayWord();
    displayGuesses();
    drawHangman();
};