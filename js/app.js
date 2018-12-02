/*
 * Create a list that holds all of your cards
 */

// Store the entire deck of cards.
// The contents of the deck don't change, so I can use const here.
// Using querySelector instead of querySelectorAll to reduce number of events.
const deck = document.querySelector('.deck');

// Initialize empty array to store visible cards.
let openCards = [];

// Delegate the click event to the parent (ul.deck) instead of children (li.card).
deck.addEventListener('click', function(e) {

  // Store the clicked card.
  const cardSelected = e.target;

  // If the element clicked is a card with no additional classes:
  if (cardSelected.classList == 'card') {

    // Flip the card.
    // Add the card to the openCards array.
    flipCard(cardSelected);
    addCard(cardSelected);
    console.log(openCards);
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

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
