import React from "react";

export const Input = React.forwardRef(function Input(
  { type = "text", className = "", variant = "default", style = {}, ...props },
  ref
) {
  const baseStyle = {
    width: "100%",
    borderRadius: 8,
    padding: "10px 12px",
    fontSize: 14,
    fontWeight: 500,
    backgroundColor: "#0f172a",
    color: "#f1f5f9",
    border: "1px solid #1e293b",
    outline: "none",
    transition: "border-color .15s, box-shadow .15s",
  };

  const variants = {
    default: {},
    ghost: {
      backgroundColor: "transparent",
      border: "1px solid #334155",
    },
    underline: {
      border: "none",
      borderBottom: "1px solid #334155",
      borderRadius: 0,
    },
  };

  const handleFocus = (e) => {
    e.target.style.borderColor = "#3b82f6";
    e.target.style.boxShadow = "0 0 0 2px rgba(59,130,246,0.3)";
    props.onFocus && props.onFocus(e);
  };

  const handleBlur = (e) => {
    e.target.style.borderColor = "#1e293b";
    e.target.style.boxShadow = "none";
    props.onBlur && props.onBlur(e);
  };

  return (
    <input
      ref={ref}
      type={type}
      style={{ ...baseStyle, ...(variants[variant] || {}), ...style }}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={className}
      {...props}
    />
  );
});

export default Input;
