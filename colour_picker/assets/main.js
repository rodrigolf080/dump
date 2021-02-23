//global vars and dom 
var colours = [];
var numSquares = 6;
var pickedColour;
var squares = document.querySelectorAll(".square");
var colourDisplay = document.getElementById("colourDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.getElementById("reset");
var modeButtons = document.querySelectorAll(".mode");

//main init
main()

//main loop
function main(){
	setupModeButtons();
	setupColours();
	setupReset();	
}

//functions

function setupModeButtons() {	
	for (var i = 0; i < modeButtons.length; i++){
		//add click listener
		modeButtons[i].addEventListener("click", function(){
			// clear selected class
			modeButtons[0].classList.remove("selected")
			modeButtons[1].classList.remove("selected")
			// add class to button triggered by event lsitener
			this.classList.add("selected")
			//if easy make it 3 squares else 6
			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			// reset squares
			setupReset(numSquares);
		});
	};	
};

function randomPickedColour(num){
	// pick random colour for display from the colour list generated previosuly
	if (num === 3) {
		var pickedColourNo = Math.floor(Math.random() * 3);
		pickedColour = colours[pickedColourNo]
	}
	else {
		var pickedColourNo = Math.floor(Math.random() * 6);
		pickedColour = colours[pickedColourNo]
	}
}
function randomColours(num) {
	//regenerate random colours for the squares
	var r = 0;
	var g = 0;
	var b = 0;
	for(var i = 0; i < num; i++) {
		// generate no. between 0 and 1 (not including 1) multiply it by 256
		// to get a random rgb number and round it to the units
		r = Math.floor(Math.random() * 256);
		g = Math.floor(Math.random() * 256);
		b = Math.floor(Math.random() * 256);
		// make this a string with the right format
		arr =  "rgb(" + r + ", " + g + ", " + b + ")";
		// push/add this string to the colours list
		colours.push(arr)
	}
};

function changeColours(num) {
	for(var i = 0; i < num; i++){
		//add initial colours to squares
		squares[i].style.backgroundColor = colours[i];
		//add event listener
		squares[i].addEventListener("click", function(){
			//grab colour of clicked square
			var clickedColour = this.style.backgroundColor
			//comapare colour to pickedColour
			if (clickedColour === pickedColour){
				messageDisplay.textContent = "Correct";
				h1.style.backgroundColor = pickedColour;
				for(var i = 0; i < num; i++){
					squares[i].style.backgroundColor = clickedColour;
				}
				resetButton.textContent = "Play Again?";
			}
			else {
				messageDisplay.textContent = "Try Again";
				this.style.backgroundColor = "#333333";
				
			}
			
		});
		
	};
};

function applyColours(num) {
	//apply colours list to each square at the beginning
	for(var i = 0; i < num; i++){
		//add initial colours to squares
		squares[i].style.backgroundColor = colours[i];
	};
};

function setupReset(num) {
	// reset everything to state 0
	colours = []
	h1.style.backgroundColor = "#ff5e13";
	randomColours(numSquares);
	randomPickedColour(numSquares);
	colourDisplay.textContent = pickedColour;
	applyColours(numSquares);
	resetButton.textContent = "New Colours";
	messageDisplay.textContent = "";
	// at difficult easy remove last 3 squares
	if (num === 3) {
		squares[3].style.backgroundColor = "#333333"
		squares[4].style.backgroundColor = "#333333"
		squares[5].style.backgroundColor = "#333333"
	}
	//add reset button
	// add event listener for reset book
	resetButton.addEventListener("click", function(){
		setupReset(num);	
	});
}

function setupColours(){
	//setup squares and colour display
	randomColours(numSquares);
	randomPickedColour(numSquares);
	changeColours(numSquares);
	changeColours(numSquares);
	colourDisplay.textContent = pickedColour;
}






