import React from "react";

export function Badge({ variant = "default", className = "", style = {}, ...props }) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "2px 8px",
    fontSize: 12,
    fontWeight: 600,
  };
  const variants = {
    default: { background: "#1f2937", color: "#e5e7eb" },
    secondary: { background: "#374151", color: "#f3f4f6" },
    outline: { background: "transparent", color: "#e5e7eb", border: "1px solid #4b5563" },
  };
  return (
    <span style={{ ...base, ...(variants[variant] || variants.default), ...style }} className={className} {...props} />
  );
}

export default Badge;
