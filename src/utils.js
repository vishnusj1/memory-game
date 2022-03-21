function shuffleCards(cards) {
  const arr = [...cards];
  let m = arr.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function checkPreviousCard(cardId, chosenCards) {
  const isValid = chosenCards.includes(cardId) ? false : true;
  return isValid;
}

function gameOver(cards, chosenCards) {
  if (cards.length === chosenCards.length) {
    return true;
  }
  return false;
}
export { shuffleCards, checkPreviousCard, gameOver };
