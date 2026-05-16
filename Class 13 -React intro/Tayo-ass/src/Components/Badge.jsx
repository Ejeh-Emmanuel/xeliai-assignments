export default function Badge({
  label,
  variant = "default",
  dot = false,
  count,
}) {
  const className = `badge badge-${variant}`;

  return (
    <div className={className}>
      {dot && <span className={`dot dot-${variant}`}></span>}

      <span>
        {label}
        {count !== undefined && ` ${count}`}
      </span>
    </div>
  );
}