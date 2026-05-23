function Avatar ({ photo, name, size = "medium", online = false }) {
  const firstLetter = name?.charAt(0).toUpperCase();

  return (
    <div className={`avatar avatar-${size}`}>
      {photo ? (
        <img src={photo} alt={name} className="avatar-image" />
      ) : (
        <div className="avatar-fallback">{firstLetter}</div>
      )}

      {online && <span className="online-indicator"></span>}
    </div>
  );
};

export default Avatar;
