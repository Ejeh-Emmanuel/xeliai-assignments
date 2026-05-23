function Badge ({ label, variant = "default", dot = false })
{
  return (
    <span className={`badge badge-${variant}`}>
      {dot && <span className={`badge-dot dot-${variant}`}></span>}

      {label}
    </span>
  );
};

export default Badge;
