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
  wins: 0,
  loss: 0,
  draws: 0,
};

let hitFlag =0;
let standFlag = 1;
let dealFlag =0;

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
  standFlag = 0;
  //console.log(YOU["score"]);
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
  if (computeWinner() == YOU) {
    blackjackGame.wins += 1;
    console.log(blackjackGame.wins + " wins");
  } else if (computeWinner() == DEALER) {
    blackjackGame.loss += 1;
    console.log(blackjackGame.loss + " losses");
  } else {
    blackjackGame.draws += 1;
  }

  document.querySelector("#wins").textContent = blackjackGame.wins;
  document.querySelector("#loss").textContent = blackjackGame.loss;
  document.querySelector("#draws").textContent = blackjackGame.draws;

  document.querySelector("#blackjack-result").textContent = "Let's Play";
  document.querySelector("#blackjack-result").style.color = "black";
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
  hitFlag = 0;
  standFlag = 1;
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
  delay();
  if (DEALER["score"] > 15) {
    if (computeWinner() == YOU) {
      document.querySelector("#blackjack-result").textContent = "You won";
      document.querySelector("#blackjack-result").style.color = "green";
      //applause audio
    } else if (computeWinner() == DEALER) {
      document.querySelector("#blackjack-result").textContent = "You lost";
      document.querySelector("#blackjack-result").style.color = "red";
      //lost audio
    } else {
      document.querySelector("#blackjack-result").textContent = "It's a draw";
      document.querySelector("#blackjack-result").style.color = "blue";
    }
  }
}

function delay() {
  let card = randomCard();
  showCard(card, DEALER);
  updateScore(card, DEALER);
  showScore(DEALER);
  hitFlag = 1;
}

function computeWinner() {
  let winner;
  if (YOU["score"] <= 21) {
    if (DEALER["score"] > 21) {
      winner = YOU;
    } else if (DEALER["score"] < YOU["score"]) {
      winner = YOU;
    } else if (DEALER["score"] > YOU["score"]) {
      winner = DEALER;
    } else if (DEALER["score"] == YOU["score"]) {
      winner = "It's a draw";
    }
  } else if (YOU["score"] > 21) {
    if (DEALER["score"] > 21) {
      winner = "It's a draw";
    } else {
      winner = DEALER;
    }
  }

  return winner;
}
