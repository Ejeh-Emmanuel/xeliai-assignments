// src/components/Card.jsx

import "../Card.css";

function Card({
  title,
  description,
  image,
  tag,
  featured = false,
  onClick,
}) {
  const placeholder =
    "https://via.placeholder.com/300x180?text=No+Image";

  return (
    <div
      className={`card ${featured ? "featured" : ""}`}
      onClick={onClick}
    >
      {featured && <span className="badge">Featured</span>}

      <img
        src={image || placeholder}
        alt={title}
        className="card-image"
      />

      <div className="card-content">
        {tag && <span className="tag">{tag}</span>}

        <h2>{title}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
}

export default Card;