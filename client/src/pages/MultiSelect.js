import React, { useState } from "react";
import "../styles/MultiSelect.css";

function MultiSelect({ options, selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggleOption = (value) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="multi-select">
      <div className="select-box" onClick={() => setOpen(!open)}>
        {selected.length === 0 ? "Select Recipients" : selected.join(", ")}
        <span className="arrow">{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div className="options">
          {options.map((opt) => (
            <div
              key={opt.value}
              className={`option ${selected.includes(opt.value) ? "selected" : ""}`}
              onClick={() => toggleOption(opt.value)}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MultiSelect;