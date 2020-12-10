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
    A: [1, 11],
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

document
  .querySelector("#blackjack-stand-btn")
  .addEventListener("click", dealerLogic);

const hitAudio = new Audio("./pics&sounds/hit-sound.mp3");
const bustAudio = new Audio("./pics&sounds/bust-audio.mp3");

function blackjackHit() {
  let card = randomCard();
  showCard(card, YOU);
  updateScore(card, YOU);
  showScore(YOU);
  console.log(YOU["score"]);
}

function showCard(card, activePlayer) {
  if (activePlayer["score"] <= 21) {
    let CardImage = document.createElement("img");
    CardImage.src = `./pics&sounds/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(CardImage);
  }
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
  YOU["score"] = 0;
  DEALER["score"] = 0;
  document.querySelector(YOU.scoreSpan).textContent = 0;
  document.querySelector(YOU.scoreSpan).style.color = "blanchedalmond";
  document.querySelector(DEALER.scoreSpan).textContent = 0;
  document.querySelector(DEALER.scoreSpan).style.color = "blanchedalmond";
}

function updateScore(cards, activePlayer) {
  if (cards == "A") {
    if (activePlayer["score"] <= 10) {
      activePlayer["score"] += blackjackGame.cardsmap["A"][1];
    } else activePlayer["score"] += blackjackGame.cardsmap["A"][0];
  } else {
    activePlayer["score"] += blackjackGame.cardsmap[cards];
  }
}

function showScore(activePlayer) {
  if (activePlayer["score"] > 21) {
    document.querySelector(activePlayer.scoreSpan).textContent = "Busted";
    document.querySelector(activePlayer.scoreSpan).style.color = "red";
    //bustAudio.play();
  } else {
    document.querySelector(activePlayer.scoreSpan).textContent =
      activePlayer["score"];
    hitAudio.play();
  }
}

function dealerLogic() {
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
  document.querySelector("#blackjack-result").textContent = computeWinner();

}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (DEALER["score"] > 21) {
      winner = "You won";
    } else if (DEALER["score"] <= 21) {
      if (YOU["scorer"] > DEALER["score"]) {
        winner = "You won";
      } else if (YOU["scorer"] == DEALER["score"]) {
        winner = "Its a draw";
      } else {
        winner = "You loss";
      }
    }
  } else if (YOU["score"] > 21) {
    if (DEALER["score"] > 21) {
      winner = "It's a draw";
    } else {
      winner = "you loss";
    }
  }

  return winner;
}
