var button = document.getElementById("button");
var page = document.getElementById("page");
var randomNumber;
var colorOfPage;
var colors = ["#0048BA","#B0BF1A","#E52B50","#9F2B68","#FFBF00","#9966CC",
			  "#008000","#007FFF","#FFE135","#FA6E79","#6B4423","#00BFFF","#40FF79"];

function getRandomNumber() {
	var number = Math.round(Math.random()*12);
	if(randomNumber == number) {
		getRandomNumber();
	} else {
		randomNumber = number;
	}
}

function getColor() {
	colorOfPage = colors[randomNumber];
	console.log(colorOfPage);
}

function changeBackground() {
	page.style.backgroundColor = colorOfPage;
}

function action() {
	getRandomNumber();
	getColor();
	changeBackground();
}
action();

button.addEventListener("click", action);