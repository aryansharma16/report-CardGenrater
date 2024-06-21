// InputField.js
import React from "react";
import "./InputFieldStyle.css";
import Image from "../Image/Image";

const InputField = ({
  type,
  className,
  placeholder,
  id,
  labelName,
  checkBoxWrap,
  onChange,
  disabled,
  value,
  checked,
  isError,
  erroMessage,
  notImp,
  onKeyPress,
  blackLabel,
  name,
  inputIcon,
  onclick,
  min,
  accept, // new prop for file types
  multiple, // new prop for multiple files
}) => {
  return (
    <div className={`formGroups ${checkBoxWrap ?? ""}`}>
      <label className={blackLabel && "visible0"} htmlFor={id}>
        {labelName}
        {/* {!notImp && <span className={"impRed"}> *</span>} */}
      </label>
      <input
        type={type}
        className={className}
        placeholder={placeholder}
        onKeyPress={onKeyPress}
        disabled={disabled}
        value={value}
        onChange={onChange}
        id={id}
        checked={checked}
        name={name}
        min={min}
        accept={accept} // handle file types
        multiple={multiple} // handle multiple files
      />
      {isError && <span className="FormError">{erroMessage}</span>}

      {inputIcon && (
        <span className="inputIcon" onClick={onclick}>
          <Image name={inputIcon} />
        </span>
      )}
    </div>
  );
};

export default InputField;
