
export default function Card({ id, name, image, handleChoice }) {
  return (
    <div className="card" onClick={() => handleChoice(id)}>
      <img src={image} alt={name} className="cardImage" />
      <div className="name">{name}</div>
    </div>
  );
}
