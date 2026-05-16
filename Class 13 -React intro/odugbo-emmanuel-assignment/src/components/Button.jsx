function Button ({
  label,
  variant = "primary",
  size = "medium",
  onClick,
  disabled = false,
}) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
