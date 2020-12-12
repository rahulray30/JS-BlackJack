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
  }, //cardsmap maps the facevalue of the card with the nemeric value
  wins: 0,
  loss: 0,
  draws: 0,
};

let hitFlag = 0; // 0 means good to go, 1 means not executable
let standFlag = 1;
let dealFlag = 1;

function randomCard() {
  //function to pick a card randomly
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
const lossAudio = new Audio("./pics&sounds/loss-audio.mp3");
const winAudio = new Audio("./pics&sounds/win-audio.mp3");

function blackjackHit() {
  //called when HIT button is clicked
  standFlag = 0;
  if (hitFlag == 0) {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(card, YOU);
    showScore(YOU);
  }

  
}

function showCard(card, activePlayer) {
  // shows the card on the frontend/webpage
  if (activePlayer["score"] <= 21) {
    let CardImage = document.createElement("img");
    CardImage.src = `./pics&sounds/${card}.png`;
    document.querySelector(activePlayer["div"]).appendChild(CardImage);
  }
}

function blackjackDeal() {
  //calls when deal button is clicked
  if (dealFlag == 0) {
    winAudio.pause();
    lossAudio.pause();
    let allImgYour = document
      .querySelector("#your-box")
      .querySelectorAll("img");
    let allImgDealer = document
      .querySelector("#dealer-box")
      .querySelectorAll("img");
    if (
      computeWinner() == YOU &&
      (YOU["score"] != 0) & (DEALER["score"] != 0)
    ) {
      blackjackGame.wins += 1;
      console.log(blackjackGame.wins + " wins");
    } else if (
      computeWinner() == DEALER &&
      (YOU["score"] != 0) & (DEALER["score"] != 0)
    ) {
      blackjackGame.loss += 1;
      console.log(blackjackGame.loss + " losses");
    } else if ((YOU["score"] != 0) & (DEALER["score"] != 0)) {
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
    dealFlag = 1;
  }
}

function updateScore(cards, activePlayer) {
  //updates the score in the backend
  if (cards == "A") {
    if (activePlayer["score"] <= 10) {
      activePlayer["score"] += blackjackGame.cardsmap["A"][1];
    } else activePlayer["score"] += blackjackGame.cardsmap["A"][0];
  } else {
    activePlayer["score"] += blackjackGame.cardsmap[cards];
  }
}

function showScore(activePlayer) {
  //shows the score in the webpage
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

async function dealerLogic() {
  if (YOU["score"] > 0) {
    hitFlag = 1;
    if (standFlag == 0) {
      while (DEALER["score"] < 15) {
        standFlag = 1;
        let card = randomCard();
        showCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
        await botCardDelay(1000);
      }
      dealFlag = 0;

      if (computeWinner() == YOU) {
        document.querySelector("#blackjack-result").textContent = "You won";
        document.querySelector("#blackjack-result").style.color = "green";
        winAudio.play();
        
      } else if (computeWinner() == DEALER) {
        document.querySelector("#blackjack-result").textContent = "You lost";
        document.querySelector("#blackjack-result").style.color = "red";
        lossAudio.play();
      } else {
        document.querySelector("#blackjack-result").textContent = "It's a draw";
        document.querySelector("#blackjack-result").style.color = "blue";
      }
    }
  }
}

function botCardDelay(ms) {
  //this function delays the bot card display every 1sec
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function computeWinner() {
  //winner is decided/calculated by this function
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
