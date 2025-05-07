import React from "react";

export default function Checkbox({ label, value, onChange }) {
    return (
        <label className="flex items-center space-x-2 my-1">
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span>{label}</span>
        </label>
    );
}