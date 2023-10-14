const cards = [
    "1.png", "1.png",
    "2.png", "2.png",
    "3.png", "3.png",
    "4.png", "4.png",
    "5.png", "5.png",
    "6.png", "6.png",
    "7.png", "7.png",
    "8.png", "8.png"
];

let score = 0;
let activeCard = null;
let canClick = false;

const memoryGame = document.getElementById("memory-game");
const scoreElement = document.getElementById("score");
const playButton = document.getElementById("play-button");

// Shuffle the cards
cards.sort(() => Math.random() - 0.5);

function createCard(card) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card");
    const cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    const cardBack = document.createElement("div");
    cardBack.classList.add("card-back");

    // Create an <img> element for the card's image
    const cardImage = document.createElement("img");
    cardImage.src = card; // Set the image source to the card URL
    cardBack.appendChild(cardImage);

    cardContainer.appendChild(cardFront);
    cardContainer.appendChild(cardBack);

    cardContainer.addEventListener("click", () => {
        if (!canClick || cardContainer.classList.contains("matched")) return;

        cardContainer.classList.add("active");

        if (activeCard === null) {
            activeCard = cardContainer;
        } else {
            if (activeCard.querySelector(".card-back img").src === cardContainer.querySelector(".card-back img").src) {
                activeCard.classList.add("matched");
                cardContainer.classList.add("matched");
                activeCard = null;
                score += 2;
                checkWin(); // Check for a win when a pair is matched
            } else {
                canClick = false;
                setTimeout(() => {
                    activeCard.classList.remove("active");
                    cardContainer.classList.remove("active");
                    activeCard = null;
                    canClick = true;
                }, 1000);
                score -= 1;
            }
        }
        updateScore();
    });

    return cardContainer;
}

function updateScore() {
    scoreElement.textContent = score;
}

function checkWin() {
    if (document.querySelectorAll(".matched").length === cards.length) {
        const audio = document.createElement("audio");
            audio.src = "congo.mp3";

            audio.autoplay = true;
            document.body.appendChild(audio);
        showPopup(); // Show the pop-up when the game is completed
    }
}

// Function to show the pop-up
function showPopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "block";
}

// Function to hide the pop-up
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none";
}

// Add an event listener to close the pop-up when the "Close" button is clicked
document.getElementById("close-popup").addEventListener("click", closePopup);

function startGame() {
    canClick = true;
    playButton.disabled = true;
    playButton.textContent = "Game In Progress";
    // Clear the game container to remove any existing cards
    memoryGame.innerHTML = '';

    // Create and display the shuffled cards for the gameplay
    cards.forEach(card => {
        const newCard = createCard(card);
        memoryGame.appendChild(newCard);
    });
}

function resetGame() {
    score = 0;
    activeCard = null;
    canClick = false;
    playButton.disabled = false;
    playButton.textContent = "Play";
    updateScore();
    // Clear the game container to remove any existing cards
    memoryGame.innerHTML = '';
    // Shuffle the cards for a new game
    cards.sort(() => Math.random() - 0.5);
}

playButton.addEventListener("click", () => {
    if (!canClick) {
        startGame();
    } else {
        resetGame();
    }
});

updateScore();
