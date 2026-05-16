function Button({
    label,
    variant = "primary",
    size = "medium",
    onClick,
    disabled = false,
    icon,
}) {
    return (
        <button
            className={`btn btn-${variant} btn-${size}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <span className="btn__icon">{icon}</span>
            }
            {label}
        </button >
    );
};
export default Button;