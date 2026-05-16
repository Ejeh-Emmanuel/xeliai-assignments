import { useState } from "react";

const icons = {
  success: "✅",
  error: "❌",
  warning: "⚠️",
  info: "ℹ️",
};

export default function Alert({
  message,
  type = "info",
  title,
  icon,
  dismissible = false,
}) {
  const [visible, setVisible] = useState(true);

  if (!message || !visible) return null;

  const displayIcon = icon || icons[type];

  return (
    <div className={`alert alert-${type}`}>
      <div className="alert-content">
        <span className="alert-icon">{displayIcon}</span>

        <div>
          {title && <h3 className="alert-title">{title}</h3>}
          <p className="alert-message">{message}</p>
        </div>
      </div>

      {dismissible && (
        <button
          className="close-btn"
          onClick={() => setVisible(false)}
        >
          ×
        </button>
      )}
    </div>
  );
}