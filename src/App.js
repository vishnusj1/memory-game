import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState(initalState);
  const [score, setScore] = useState(0);
  const [bestScore,setBestScore]=useState(0);

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
      const arr = shuffleCards(initalState.cards);
      console.log("gameover");
      setState({
        ...initalState,
        cards: arr,
      });
      setScore(0);
    }
  }, [state]);

  useEffect(()=>{
    console.log(score);
  },[score])

  function handleChoice(card) {
    console.log(card, "is the choice");
    const isValid = checkPreviousCard(card, state.cardsChosen);
    if (isValid) {
      const arr = shuffleCards(state.cards);
      setState({
        cards: arr,
        cardsChosen: [...state.cardsChosen, card],
      });
      const newScore = score+1;
      if(newScore>bestScore) setBestScore(newScore)
      setScore(newScore)

    } else {
      setState(initalState);
      setScore(0)
    }
  }

  const cardsList = state.cards.map((card) => (
    <Card key={card} card={card} handleChoice={handleChoice} />
  ));
  return (
    <div className="App">
      <header>
        <Scores score={score} bestScore={bestScore} />
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

function Scores({ score, bestScore }) {
  return (
    <div className="scoreBoard">
      <div className="score">Score {score}</div>
      <div className="bestScore">Best Score {bestScore}</div>
    </div>
  );
}
const initalState = {
  cards: [1, 2, 3, 4, 5],
  cardsChosen: [],
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
  if (state.cards.length === state.cardsChosen.length) {
    return true;
  }
  return false;
}
export default App;
