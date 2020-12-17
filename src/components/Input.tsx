import React, { FC, InputHTMLAttributes } from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  type = "text",
  placeholder,
  value,
  name,
  onChange,
}) => {
  return (
    <div className="field mb-0">
      <div className="control">
        <input
          type={type}
          className="input is-large"
          placeholder={placeholder}
          value={value}
          name={name}
          id={name}
          onChange={onChange}
          required
          autoComplete="off"
        />
      </div>
    </div>
  );
};

export default Input;
