import React from "react";

export default function RadioButton({ label, value, onChange, nameR }){
    return (
        <label className="flex items-center space-x-2 my-1">
            <input
                type="radio"
                name={nameR}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <span>{label}</span>
        </label>
    )
}