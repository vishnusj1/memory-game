export default function Scores({ score, bestScore }) {
  return (
    <div className="scoreBoard">
      <div className="score">Score: <span>{score}</span></div>
      <div className="bestScore">Best Score: <span>{bestScore}</span></div>
    </div>
  );
}
