let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
  cardsArr: ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
  cardsmap: {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    J: 10,
    Q: 10,
    K: 10,
    A: [1, 11]
  },
};

function randomCard() {
  let ran = Math.floor(Math.random() * 13);
  return blackjackGame["cardsArr"][ran];
}

const YOU = blackjackGame["you"];
const DEALER = blackjackGame["dealer"];

document
  .querySelector("#blackjack-hit-btn")
  .addEventListener("click", blackjackHit);

document
  .querySelector("#blackjack-deal-btn")
  .addEventListener("click", blackjackDeal);

const hitAudio = new Audio("./pics&sounds/hit-sound.mp3");

function blackjackHit() {
  let card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  console.log()
}

function showCard(card, activePlayer) {
  let CardImage = document.createElement("img");
  CardImage.src = `./pics&sounds/${card}.png`;
  document.querySelector(activePlayer["div"]).appendChild(CardImage);
  hitAudio.play();
}

function blackjackDeal() {
  let allImgYour = document.querySelector("#your-box").querySelectorAll("img");
  let allImgDealer = document
    .querySelector("#dealer-box")
    .querySelectorAll("img");

  for (let i = 0; i < allImgYour.length; i++) {
    allImgYour[i].remove();
  }
  for (let i = 0; i < allImgDealer.length; i++) {
    allImgDealer[i].remove();
  }
}

function updateScore(cards, activePlayer) {
  activePlayer["score"] += blackjackGame.cardsmap[cards];
}
