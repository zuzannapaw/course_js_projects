
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");


let scorePlayer0El = document.getElementById("score--0");
let scorePlayer1El = document.getElementById("score--1");
let currScorePlayer0El = document.getElementById("current--0");
let currScorePlayer1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");

const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let currentScore, scores, activePlayer ,playing;

const init =function(){
	scorePlayer0El.textContent = 0;
	scorePlayer1El.textContent = 0;

	 currentScore = 0;
	 scores = [0,0];
	 activePlayer = 0 
	 playing = true;

	diceEl.classList.add("hidden");
	
	document.querySelector(`.player--${activePlayer}`).classList.remove("player--winner");
	
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	

	player1El.classList.remove("player--active");
	player0El.classList.add("player--active");
}


const switchPlayers = function(){
	document.getElementById(`current--${activePlayer}`).textContent = 0;
	activePlayer === 0? activePlayer = 1 :activePlayer = 0;
	currentScore = 0;
	

	
	player0El.classList.toggle("player--active");
	player1El.classList.toggle("player--active");
	
};

btnRoll.addEventListener("click",function(){
	if(playing){
		let dice = Math.floor(Math.random()* (6 - 1)) + 1;
		console.log(dice);
		diceEl.classList.remove("hidden");
		diceEl.src = `img/dice-${dice}.png`;

		if(dice != 1){
			currentScore += dice;
			document.getElementById(`current--${activePlayer}`).textContent= currentScore;
		}else{
			switchPlayers();
		}
	}
	
});

btnHold.addEventListener("click",function(){
	if(playing){
		scores[activePlayer] += currentScore;
		document.getElementById(`current--${activePlayer}`).textContent = 0;
		document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

		if(scores[activePlayer] >= 100){
			document.querySelector(`.player--${activePlayer}`).classList.add("player--winner")
			diceEl.classList.add("hidden");
			playing = false;
		}
		
		switchPlayers();
	}
});

init();
btnNew.addEventListener("click",init);	

// JavaScript Document