import React from "react";

export function Button({ variant = "default", className = "", ...props }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    height: 40,
    padding: "0 16px",
    cursor: "pointer",
    border: "1px solid transparent",
    transition: "background .15s, opacity .15s",
  };

  const variants = {
    default: { background: "#fff", color: "#111" },
    secondary: { background: "#1f2937", color: "#fff" },
    outline: { background: "transparent", color: "#fff", border: "1px solid #4b5563" },
    ghost: { background: "transparent", color: "#fff" },
  };

  return (
    <button
      style={{ ...base, ...(variants[variant] || variants.default) }}
      className={className}
      {...props}
    />
  );
}

export default Button;
