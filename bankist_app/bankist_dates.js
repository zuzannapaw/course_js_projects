
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2022-07-26T17:01:17.194Z",
    "2022-07-28T23:36:17.929Z",
    "2022-08-01T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2022-07-28T14:43:26.374Z",
    "2022-07-31T18:49:59.371Z",
    "2022-08-01T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];;

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');  




//START

let currAccount,timer;



const formatDate = function(date,locale){
	//		creating dates
		const calcDaysPassed =(date1,date2)=> Math.round(Math.abs(date2-date1) /(1000 * 60 * 60 * 24))
		const daysPassed = calcDaysPassed(new Date(),date);
	
		if(daysPassed === 0) return "Today"
		if(daysPassed === 0) return "Yesterday"
		if(daysPassed <= 7 ) return `${daysPassed} days ago`
		
//		const year = `${date.getFullYear()}`;
//		const month = `${date.getMonth() + 1}`.padStart(2,0)
//		const day = `${date.getDate()}`.padStart(2,0)
//		return `${year}-${month}-${day}`
		return new Intl.DateTimeFormat(locale).format(date)
		
};

const formatCurr = function(value,locale,currency){
	return new Intl.NumberFormat(locale,{
			style:'currency',
			currency: currency
		}).format(value);
};


const displayMovements = function(account,sort = false){
	containerMovements.innerHTML = '';
	
	const movs = sort ? account.movements.slice().sort((a,b)=> a-b) : account.movements;
//	const movs = movements.slice()		   
	
	movs.forEach(function(mov,i){
		const type = mov > 0?'deposit':'withdrawal'
		
		const date = new Date(account.movementsDates[i])
		const displayDate = formatDate(date,account.locale) 
		
		const formatedMov = formatCurr(mov,account.locale,account.currency);
	
		const html=`
		<div class="movements__row">
			<div class="movements__type movements__type--${type}"> ${i+1} ${type}</div><div class="movements__date">${displayDate}</div>
				<div class="movements__value">${formatedMov}</div>
		</div>`

		containerMovements.insertAdjacentHTML('afterbegin',html)
	})
	
}
 


const createUsername = function(arr){
	arr.forEach(function(account){
		account.username = account.owner.slice().split(' ').map(word=> word[0]).join('').toLocaleLowerCase();
	}) 
}
	createUsername(accounts);

console.log(accounts)

const displaySummary = function(account){
	const balance = account.movements.reduce((acc,el) => acc + el,0)
	
	labelBalance.textContent = formatCurr(balance,account.locale,account.currency);
	
	const inputs = account.movements.filter(mov => mov > 0).reduce((acc,el) => acc +el,0);
	
	labelSumIn.textContent = formatCurr(inputs,account.locale,account.currency);
	
	const outputs = Math.abs(account.movements.filter(mov => mov<0).reduce((acc,el)=> acc+el,0))
	
	labelSumOut.textContent = formatCurr(outputs,account.locale,account.currency);
	
	const interest = account.movements.map(mov=>mov * currAccount.interestRate).reduce((acc,el)=> acc+el,0)
	
	labelSumInterest.textContent = formatCurr(interest,account.locale,account.currency);
}

const updateUI = function(){
	displayMovements(currAccount)
	displaySummary(currAccount)
}

const startLogOutTimer = function(){
	let time = 500
	const tick = function(){
		 

		const min = String(Math.trunc(time / 60)).padStart(2,0)
		const sec = String(time % 60).padStart(2,0)
		
	
		// in each call ,prisnt the remaining time to the UI
		labelTimer.textContent = `${min}: ${sec}`;
		
		//When time is 0 stop timer and log out user
		
		if(time === 0){
			clearInterval(timer);
			containerApp.style.opacity = 0;
			labelWelcome.textContent = "Log in to get started"
		}
		
		time--
		
		
	};
	
	tick();
	timer = setInterval(tick,1000);
	return timer

	 
	
};


btnLogin.addEventListener("click",function(e){
	e.preventDefault()
	currAccount = accounts.find(account=> account.username ===inputLoginUsername.value)
	console.log(currAccount);
	
	if(Number(inputLoginPin.value) === Number(currAccount.pin)){
		containerApp.style.opacity = 100;
		const now = new Date();
		const locale = currAccount.locale;


		const options = {
		hour : 'numeric',
		minute : 'numeric',
		day: 'numeric',
		month : 'numeric',
		year : 'numeric'

		}

		labelDate.textContent = new Intl.DateTimeFormat(locale,options).format(now)

		
		
//		const year = `${now.getFullYear()}`;
//		const month = `${now.getMonth() + 1}`.padStart(2,0)
//		const day = `${now.getDate()}`.padStart(2,0)
//		const hour  = `${now.getHours()}`.padStart(2,0)
//		const min = `${now.getMinutes()}`.padStart(2,0)
//		
////	labelDate.textContent = `${year}-${month}-${day}, ${hour}:${min}`;
		labelWelcome.textContent =`Welcome back, ${currAccount.owner.split(' ')[0]} `
		inputLoginUsername.value  = ''
		inputLoginPin.value = ''
		
		if(timer) clearInterval(timer)
		timer = startLogOutTimer();
		
		updateUI()
		
	}
})



btnTransfer.addEventListener("click",function(e){
	e.preventDefault();
	const transferTo = inputTransferTo.value
	const transferValue = inputTransferAmount.value 
	
	const transferPerson = accounts.find(acc => acc.username === transferTo)
										 
	if(transferTo !== currAccount.username && currAccount.movements.reduce((sum,el)=> sum+el) > transferValue) {
	currAccount.movements.push(-transferValue)
	transferPerson.movements.push(transferValue)
	currAccount.movementsDates.push(new Date());
	transferPerson.movementsDates.push(new Date());
	
		updateUI();
	};
	
	inputTransferTo.value = '';
	inputTransferAmount.value = '';
	
//	Reset timer
	clearInterval(timer)
	timer = startLogOutTimer();
});

btnLoan.addEventListener("click",function(e){
	e.preventDefault()
	
	const amount = Math.floor(Number(inputLoanAmount.value))
	
	if(amount>0 && currAccount.movements.some(mov => mov >= amount * 0.1)){
		setTimeout(function(){
		currAccount.movements.push(amount);
		currAccount.movementsDates.push(new Date());
		
		updateUI()
		},2500)
		
		inputLoanAmount.value = ''
		clearInterval(timer)
		timer = startLogOutTimer();
	}
	
});

btnClose.addEventListener("click",function(e){
	e.preventDefault();
	if(inputCloseUsername.value === currAccount.username && Number(inputClosePin.value) === Number(currAccount.pin)){
		inputCloseUsername.value = '';
		inputClosePin.value = '';
		containerApp.style.opacity = 0;
		accounts.splice(currAccount);
		labelWelcome.textContent = "Log in to get started";
		
	}
	
})

let sorted = false ;
	
btnSort.addEventListener("click",function(){

	displayMovements(currAccount,!sorted);
		sorted = !sorted ;
	
})


setInterval(function(){
	const now = new Date();
},1000);