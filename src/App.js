import { useEffect, useState } from "react";
import Card from "./components/Card";
import Scores from "./components/Scores";
import { shuffleCards, checkPreviousCard, gameOver } from "./utils";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [chosenCards, setChosenCards] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    const loadCards = async () => {
      setCards(shuffleCards(await getData()));
    };
    loadCards();
  }, []);

  useEffect(() => {
    const isGameOver = gameOver(cards, chosenCards);
    if (isGameOver) {
      console.log("Game Over");
      setScore(0);
    }
  }, [cards, chosenCards]);

  function handleChoice(cardId) {
    const isValid = checkPreviousCard(cardId, chosenCards);
    if (isValid) {
      const arr = shuffleCards(cards);
      setCards(arr);
      setChosenCards([...chosenCards, cardId]);
      const newScore = score + 1;
      if (newScore > bestScore) setBestScore(newScore);
      setScore(newScore);
    } else {
      setChosenCards([]);
      setScore(0);
    }
  }

  const cardsList = cards.map((card) => {
    return (
      <Card
        key={card.id}
        id={card.id}
        name={card.name}
        image={card.image}
        handleChoice={handleChoice}
      />
    );
  });

  return (
    <div className="App">
      <header>
        <Scores score={score} bestScore={bestScore} />
      </header>
      <div className="cards">{cardsList}</div>
    </div>
  );
}

async function getData() {
  const length = 10;
  const characters = [];
  for (let i = 1; i < length; i++) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${i}`,
      {
        mode: "cors",
      }
    );
    const character = await response.json();
    const id = character.id;
    const name = character.name;
    const image = character.image;
    characters.push({ id, name, image });
  }
  return characters;
}

export default App;
