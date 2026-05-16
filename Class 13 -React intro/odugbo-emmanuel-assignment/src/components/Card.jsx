function Card ({
  title,
  description,
  image,
  tag,
  featured = false,
  onClick,
}) {
  return (
    <div className={`card ${featured ? "featured" : ""}`} onClick={onClick}>
      {featured && <span className="featured-badge">Featured</span>}

      <img
        src={image || "https://via.placeholder.com/300x180"}
        alt={title}
        className="card-image"
      />

      <div className="card-content">
        {tag && <span className="card-tag">{tag}</span>}

        <h2>{title}</h2>

        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;
