export default function Avatar({
  photo,
  name,
  size = "medium",
  online = false,
}) {
  const sizes = {
    small: 32,
    medium: 56,
    large: 80,
  };

  const avatarSize = sizes[size];

  return (
    <div
      className="avatar-container"
      style={{ width: avatarSize, height: avatarSize }}
    >
      {photo ? (
        <img
          src={photo}
          alt={name}
          className="avatar-image"
          style={{ width: avatarSize, height: avatarSize }}
        />
      ) : (
        <div
          className="avatar-fallback"
          style={{
            width: avatarSize,
            height: avatarSize,
            fontSize: avatarSize / 2.5,
          }}
        >
          {name.charAt(0).toUpperCase()}
        </div>
      )}

      {online && <span className="online-dot"></span>}
    </div>
  );
}