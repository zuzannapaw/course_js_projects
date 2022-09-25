
const input = document.querySelector('input.guess');
const checkBtn = document.querySelector('button.btn.check');
const againBtn = document.querySelector('button.btn.again');
let numberMessage =
document.querySelector('p.message');
let scoreMessage = document.querySelector('span.score');
const highScoreValue = document.querySelector('span.highscore');
const divNumber = document.querySelector('div.number');
const body = document.querySelector('body');

let totalScore = 20;
let drawNumber = Math.floor(Math.random() * 20) + 1;
let highscore = 0;

const displayMessage = function(message){
	numberMessage.textContent = message;
}

const game = function(){
	
	const inputValue = input.value;

	if(inputValue == ''){
		displayMessage("No number!");
		
	}else if(drawNumber == inputValue){
		body.style.backgroundColor = "#60b347";
		divNumber.textContent = drawNumber;
		totalScore++;
		scoreMessage.textContent = totalScore;
		console.log(drawNumber);
		displayMessage("Congratulations!");
		
		if(totalScore > highscore){
			highscore = totalScore;
			highScoreValue.textContent = highscore;
		}
		
	}else if(drawNumber != inputValue){
		
		if(totalScore > 1){
			displayMessage(drawNumber > inputValue ? "Too low!" : "Too high!");
			console.log( drawNumber,inputValue);
			totalScore--
			scoreMessage.textContent = totalScore;
			body.style.backgroundColor = "#222";
			divNumber.textContent ="?";
		
		}else{
			displayMessage("You lost the game!");
			scoreMessage.textContent = 0;
		}
	
	}
}

const gameAgain = function(){
	drawNumber = Math.floor(Math.random() * 20) + 1;
	body.style.backgroundColor = "#222";
	displayMessage("Start guessing...");
	divNumber.textContent ="?";
	totalScore = 20;
	scoreMessage.textContent = totalScore;
	input.value = '';
}
	
checkBtn.addEventListener("click", game);
againBtn.addEventListener("click", gameAgain);
// JavaScript Document