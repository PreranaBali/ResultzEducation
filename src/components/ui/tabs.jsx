import React, { createContext, useContext, useId, useMemo, useState } from "react";

const TabsCtx = createContext(null);

export function Tabs({ value: controlled, defaultValue, onValueChange, className = "", children }) {
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const value = controlled !== undefined ? controlled : uncontrolled;
  const setValue = (v) => {
    if (controlled === undefined) setUncontrolled(v);
    onValueChange?.(v);
  };
  const api = useMemo(() => ({ value, setValue }), [value]);
  return (
    <TabsCtx.Provider value={api}>
      <div className={className}>{children}</div>
    </TabsCtx.Provider>
  );
}

export function TabsList({ className = "", ...props }) {
  return (
    <div
      role="tablist"
      style={{ display: "inline-flex", gap: 8, padding: 4, borderRadius: 10, background: "#0f172a", border: "1px solid #1f2937" }}
      className={className}
      {...props}
    />
  );
}

export function TabsTrigger({ value, className = "", ...props }) {
  const { value: active, setValue } = useContext(TabsCtx);
  const selected = active === value;
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={() => setValue(value)}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 600,
        border: "1px solid #1f2937",
        background: selected ? "#e5e7eb" : "transparent",
        color: selected ? "#111827" : "#e5e7eb",
        cursor: "pointer",
      }}
      className={className}
      {...props}
    />
  );
}

export function TabsContent({ value, className = "", style = {}, ...props }) {
  const { value: active } = useContext(TabsCtx);
  if (active !== value) return null;
  return <div role="tabpanel" className={className} style={style} {...props} />;
}
