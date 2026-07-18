import React from "react";

const EditableField = ({
  label,
  name,
  value,
  onChange,
  disabled = false,
  type = "text",
}) => {
  return (
    <div style={{ marginBottom: "15px" }}>

      <label>
        <strong>{label}</strong>
      </label>

      <br />

      <input
        type={type}
        name={name}
        value={value}
        disabled={disabled}
        onChange={onChange}
      />

    </div>
  );
};

export default EditableField;