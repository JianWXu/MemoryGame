const gameContainer = document.getElementById("game");
let counter = 0;
let checker = false;
let firstCard;
let secondCard;
let twocardsFlipped = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if (twocardsFlipped) {
    return;
  }
  if (this === firstCard) {
    return;
  }
  this.style.background = this.getAttribute("class");
  // you can use event.target to see which element was clicked
  if (!checker) {
    checker = true;
    firstCard = this;
  } else {
    checker = false;
    secondCard = this;
    if (firstCard.getAttribute("class") == secondCard.getAttribute("class")) {
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
    } else {
      twocardsFlipped = true;
      setTimeout(() => {
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        firstCard = null;
        secondCard = null;
        twocardsFlipped = false;
      }, 1000);
    }
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);
