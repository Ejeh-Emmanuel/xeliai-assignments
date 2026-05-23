const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

function Alert ({ message, type = "info", title, icon }) {
  // Render nothing if message is missing
  if (!message) return null;

  const displayIcon = icon || icons[type];

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-icon">{displayIcon}</div>

      <div className="alert-content">
        {title && <h4>{title}</h4>}

        <p>{message}</p>
      </div>
    </div>
  );
};

export default Alert;
