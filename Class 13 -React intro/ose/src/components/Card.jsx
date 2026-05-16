


function Card ({title, description, image,tag,featured = false }) {
    const placeholder = "https://via.placeholder.com/300x180?text=No+Image";

    return (
        <div className={`card ${featured ? "card--featured" : ""} `}>
            <img src={ image || placeholder } alt={title} className="card__img" />
            {tag && <span className="card__tag" >{tag}</span>}
            <div className="card__body">
                <h3 className="card__title">
                    {title}
                </h3>
                <p className="card__desc">
                    {description}
                </p>
                {featured && <span> Featured</span>}
            </div>
        </div>
    )
}

export default Card