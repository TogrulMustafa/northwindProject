import React from "react";

const TextInput = ({ name, label, onChange, placeholder, error, value }) => {
    let wrapperClass = "form-group";
    if (error && error.length > 0) {
        wrapperClass += " has-error";
    }

    return (
        <div className={wrapperClass}>
        <label htmlFor={name}>{label}</label>
        <div className="field">
            <input
            type="text"
            className = "form-control"
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
        </div>
    );
};

export default TextInput;
