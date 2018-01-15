var isEasy = false;
var boxes = document.querySelectorAll(".box");
var btnNewColor = document.querySelector("button");
var btnEasy = document.querySelectorAll("button")[1];
var btnHard = document.querySelectorAll("button")[2];
var numOfBoxes = 6;
var correctAnswer;
var rgbHeader = document.querySelector("#rgbHeader");
var message = document.querySelector("#message");


function init(){
	setupMode(numOfBoxes);
	setColors(numOfBoxes);
}

function setupMode(){
	message.textContent = "";
	setEasyBtn();
	setHardBtn();
	setNewColorBtn();
	setBoxFunctionality();
}

function setEasyBtn(){
	btnEasy.addEventListener("click", function(){
		numOfBoxes = 3;
		isEasy = true;
		this.classList.add("selectedButton");
		btnHard.classList.remove("selectedButton");
		document.querySelector("h1").style.background = "steelblue";
		for(var i=numOfBoxes; i<6; i++){
			boxes[i].style.display = "none";
		}
		setColors(numOfBoxes);
		message.textContent = "";
	});
}

function setHardBtn(){
	btnHard.classList.add("selectedButton");
	btnHard.addEventListener("click", function(){
		numOfBoxes = 6;
		isEasy = false;
		this.classList.add("selectedButton");
		btnEasy.classList.remove("selectedButton");
		message.textContent = "";
		document.querySelector("h1").style.background = "steelblue";
		for(var i=0; i<numOfBoxes; i++){
			boxes[i].style.display = "block";
		}
		setColors(numOfBoxes);
		message.textContent = "";
	});
}

function setNewColorBtn(){
	btnNewColor.addEventListener("click", function(){
		document.querySelector("h1").style.background = "steelblue";
		setColors(numOfBoxes);
		btnNewColor.textContent = "New Colors"
		message.textContent = "";
	});
	
}

function setBoxFunctionality(){
	for(var i=0; i<numOfBoxes; i++){
		boxes[i].addEventListener("click", function(){
			//check if color matches
			var clickedColor = this.style.background;
			if(clickedColor === correctAnswer){
				setWinningColor(correctAnswer);
				message.textContent = "Correct";
			}else{
				this.style.background = "#232323";
				message.textContent = "Try Again.";
				btnNewColor.textContent = "New Colors";
			}
		});
	}
}

function setColors(numOfBoxes){
	var arr = genNColors(numOfBoxes);

	for(var i=0; i<numOfBoxes; i++){
		boxes[i].style.background = arr[i];
		boxes[i].style.display = "block";
	}
	if(isEasy){
		for(var i=numOfBoxes; i<6; i++){
			boxes[i].style.display = "none";
		}
	}
	//select a random color from this array and set that as the correct ans
	correctAnswer = arr[Math.floor(Math.random() * numOfBoxes)];
	rgbHeader.textContent = correctAnswer;

}


function genColor(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" +r+ ", " +g+ ", " +b+ ")";
}

function genNColors(n){
	var arr = [];
	for(var i=0; i<n; i++){
		arr.push(genColor());
	}
	return arr;
}

function setWinningColor(correctAnswer){
	for(var i=0; i<numOfBoxes; i++){
		boxes[i].style.background = correctAnswer;
		document.querySelector("h1").style.background = correctAnswer;
	}
	btnNewColor.textContent = "Play Again?";
}

init();
