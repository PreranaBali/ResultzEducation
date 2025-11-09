import React from "react";

export function Card({ className = "", style = {}, ...props }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: "1px solid #262626",
        background: "#0b0b0b",
        ...style,
      }}
      className={className}
      {...props}
    />
  );
}

export function CardHeader({ className = "", style = {}, ...props }) {
  return (
    <div
      style={{ padding: 16, borderBottom: "1px solid #262626", ...style }}
      className={className}
      {...props}
    />
  );
}

export function CardTitle({ className = "", style = {}, ...props }) {
  return (
    <h3
      style={{ fontSize: 18, fontWeight: 700, margin: 0, ...style }}
      className={className}
      {...props}
    />
  );
}

export function CardContent({ className = "", style = {}, ...props }) {
  return (
    <div style={{ padding: 16, ...style }} className={className} {...props} />
  );
}

export default Card;
