import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState(initalState);

  useEffect(() => {
    const arr = shuffleCards(initalState.cards);
    setState({
      ...initalState,
      cards: arr,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isGameOver = gameOver(state);
    if (isGameOver) {
      console.log("gameover");
      setState(initalState);
    }
  }, [state]);

  function handleChoice(card) {
    console.log(card, "is the choice");
    const isValid = checkPreviousCard(card, state.cardsChosen);
    if (isValid) {
      const arr = shuffleCards(state.cards);
      setState({
        ...state,
        cards: arr,
        cardsChosen: [...state.cardsChosen, card],
        score: state.score + 1,
      });
    } else {
      setState(initalState);
    }
  }

  const cardsList = state.cards.map((card) => (
    <Card key={card} card={card} handleChoice={handleChoice} />
  ));
  return (
    <div className="App">
      <header>
        <Score score={state.score} />
      </header>
      <div className="cards">{cardsList}</div>
    </div>
  );
}

function Card({ card, handleChoice }) {
  return (
    <div className="card" onClick={() => handleChoice(card)}>
      {card}
    </div>
  );
}

function Score({ score, bestScore }) {
  return <div className="score">Score: {score}</div>;
}
const initalState = {
  cards: [1, 2, 3, 4, 5],
  cardsChosen: [],
  score: 0,
};
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
function checkPreviousCard(selectedCard, cards) {
  const isValid = cards.includes(selectedCard) ? false : true;
  return isValid;
}
function gameOver(state) {
  if (state.score === state.cards.length) {
    return true;
  }
  return false;
}
export default App;
