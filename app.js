let blackjackGame = {
  you: { scoreSpan: "#your-blackjack-result", div: "#your-box", score: 0 },
  dealer: {
    scoreSpan: "#dealer-blackjack-result",
    div: "#dealer-box",
    score: 0,
  },
};

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
  showCard(YOU);
}

function showCard(activePlayer) {
  let CardImage = document.createElement("img");
  CardImage.src = "./pics&sounds/10.png";
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
