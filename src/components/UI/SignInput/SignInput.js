import "./SignInput.css";
import React, { useState } from "react";

function SignInput({
  id,
  type,
  name,
  label,
  inputValue,
  setValue,
  setError,
  errors,
  pattern,
  isRequired,
  minLength,
  maxLength,
  setIsValid,
}) {

  const [hasError, setHasError] = useState(false)

  function handleChange(e) {
    setValue(e.target.value);
    const error = e.target.validationMessage
    setError({ ...errors, [name]: e.target.validationMessage });
    setIsValid(e.target.closest("form").checkValidity());
    setHasError(!!error)
  }

  return (
    <>
      <label htmlFor={id} className="sign__label">
        {label}
      </label>
      <input
        id={id}
        className={`sign__input sign__input_type_${name} ${errors[name] ? 'sign__input_invalid' : ''} ${hasError ? 'sign__input_error' : ''}`}
        type={type}
        name={name}
        pattern={pattern}
        required={isRequired}
        minLength={minLength}
        maxLength={maxLength}
        value={inputValue}
        onChange={handleChange}
      />
      <span className={`sign__input-error signup-${name}-error`}>
        {errors[name]}
      </span>
    </>
  );
}

export default SignInput;
