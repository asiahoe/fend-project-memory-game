/*
 * Create a list that holds all of your cards
 */

// Store the entire deck of cards.
// The contents of the deck don't change, so I can use const here.
// Using querySelector instead of querySelectorAll to reduce number of events.
const deck = document.querySelector('.deck');

// Initialize move counter.
let moves = 0;

function shuffleDeck() {

  // Store all cards in a variable.
  // Change the node list into an array.
  const cards = Array.from(document.querySelectorAll('.deck li'));

  // Shuffle the cards and store them in a variable.
  const shuffledCards = shuffle(cards);

  // Append the newly shuffled cards to the deck.
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}

//  Shuffle the deck right away.
shuffleDeck();

// Initialize empty array to store visible cards.
let openCards = [];

// Delegate the click event to the parent (ul.deck) instead of children (li.card).
deck.addEventListener('click', function(e) {

  // Store the clicked card.
  const cardSelected = e.target;

  // If the element clicked is a card with no additional classes,
  // And if no more than 2 cards are open:
  if (cardSelected.classList == 'card' && openCards.length < 2) {

    // Flip the card.
    // Add the card to the openCards array.
    flipCard(cardSelected);
    addCard(cardSelected);

    // If there are 2 visible cards:
    if (openCards.length === 2) {

      // Verify whether the cards match.
      isMatch(cardSelected);
      moveCount();
      setScore();
    }
  }

});

// Display the card's symbol by toggling classes.
function flipCard(cardSelected) {
  cardSelected.classList.toggle('open');
  cardSelected.classList.toggle('show');
}

// Add the card to the list of visible cards.
function addCard(cardSelected) {
  openCards.push(cardSelected);
}

// Check if the visible cards match.
function isMatch() {

  // Store visible cards contents as variables.
  let cardOne = openCards[0].firstElementChild.className;
  let cardTwo = openCards[1].firstElementChild.className;

  setTimeout(function() {

    //  Loop through the visible cards:
    for (card of openCards) {

      // If both visible cards are identical:
      if (cardOne == cardTwo) {

        //  Toggle the match class to keep cards open.
        card.classList.toggle('match');

      // If there are no matches, flip them back.
      } else {
        flipCard(card);
      }

    //  Always reset cards after comparing a pair.
    } openCards = [];

  // Delay card flipping for 1000 ms.
  }, 1000);
}

// Move Counter
function moveCount() {
  // Increment moves.
  moves++;
  // Insert the new value on the page.
  const movesText = document.querySelector('.moves');
  movesText.innerHTML = moves;
}

//  Calculate the score star rating.
function setScore() {
  // Remove a star when moves reach 16.
  if (moves === 16) {
    removeStar();
  // Remove an additional star when moves reach 20.
  } else if (moves === 20) {
    removeStar();
  }
}

// Remove a star according to te set score.
function removeStar() {
  // Select the stars list.
  const stars = document.querySelectorAll('.stars li');
  // Loop through the stars list.
  for (star of stars) {
    // If the star's visibility has not already been set to hidden,
    if (star.style.visibility !== 'hidden') {
      // Set the star's visibility to hidden.
      star.style.visibility = 'hidden';
      // Do not proceed to the next star.
      break;
    }
  }
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
