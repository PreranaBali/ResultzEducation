import React, { createContext, useContext, useMemo, useState } from "react";

const AccCtx = createContext(null);

export function Accordion({ type = "single", defaultValue, value: controlled, onValueChange, className = "", children }) {
  const [uncontrolled, setUncontrolled] = useState(
    type === "multiple" ? (Array.isArray(defaultValue) ? defaultValue : []) : defaultValue ?? null
  );

  const value = controlled !== undefined ? controlled : uncontrolled;

  const setValue = (next) => {
    if (controlled !== undefined) {
      onValueChange?.(next);
      return;
    }
    if (type === "multiple") {
      // next is a function receiving previous array
      setUncontrolled((prev) => {
        const nextArr = typeof next === "function" ? next(prev) : next;
        onValueChange?.(nextArr);
        return nextArr;
      });
    } else {
      setUncontrolled(next);
      onValueChange?.(next);
    }
  };

  const api = useMemo(() => ({ type, value, setValue }), [type, value]);

  return (
    <AccCtx.Provider value={api}>
      <div className={className}>{children}</div>
    </AccCtx.Provider>
  );
}

export function AccordionItem({ value, className = "", children }) {
  return <div data-value={value} className={className}>{children}</div>;
}

export function AccordionTrigger({ className = "", children, value }) {
  const { type, value: active, setValue } = useContext(AccCtx);

  const isOpen = type === "multiple"
    ? Array.isArray(active) && active.includes(value)
    : active === value;

  const toggle = () => {
    if (type === "multiple") {
      setValue((prev) =>
        (prev?.includes(value) ? prev.filter((v) => v !== value) : [...(prev || []), value])
      );
    } else {
      setValue(isOpen ? null : value);
    }
  };

  return (
    <button
      onClick={toggle}
      aria-expanded={isOpen}
      style={{
        width: "100%",
        textAlign: "left",
        padding: "12px 14px",
        border: "1px solid #1f2937",
        borderRadius: 8,
        background: "#0f172a",
        color: "#e5e7eb",
        fontWeight: 600,
        cursor: "pointer",
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export function AccordionContent({ className = "", style = {}, children, value }) {
  const { type, value: active } = useContext(AccCtx);
  const isOpen = type === "multiple"
    ? Array.isArray(active) && active.includes(value)
    : active === value;

  if (!isOpen) return null;

  return (
    <div
      style={{ padding: "12px 14px", borderLeft: "1px solid #1f2937", marginTop: 8, ...style }}
      className={className}
    >
      {children}
    </div>
  );
}
