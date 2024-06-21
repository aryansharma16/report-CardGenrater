import React, { useEffect, useState } from "react";
import "./CustomDropdownStyle.css";

const ScholarshipDropdown = ({
  dropName,
  options,
  // isOpen,
  // setIsActive,
  disabled,
  className,
  label,
  isimp,
  onSelect,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setIsActive(false);
  // };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`customDropdownWrap flexbox ${
        isOpen && "active"
      } ${className}`}
    >
      {label && (
        <label>
          {label} {isimp && <span className="impRed">*</span>}
        </label>
      )}
      <div className="dropDrop flexbox">
        <div onClick={() => handleToggleDropdown()} className="dropText">
          {typeof(selectedOption) == 'number' ? selectedOption : dropName ?? "Select scholarship"}
        </div>
        {/* <img src="/assets/svg/arrow-down.svg" alt="" /> */}
        <svg
          width="10"
          height="5"
          viewBox="0 0 10 5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.62 0.220703L5.81667 4.02404C5.3675 4.4732 4.6325 4.4732 4.18334 4.02404L0.380005 0.220703"
            fill="#525252"
          />
        </svg>
      </div>
      {/* <div className="dropMenuWindow">
        {options?.map((item, index) => (
          <label className="dropMenu" key={index} onClick={item.action}>
            <input type="radio" name="radio" />
            <span className="menuList">{item.name}</span>
          </label>
        ))}
      </div> */}

      <div className="dropMenuWindow">
        {options?.map((item, index) => (
          <label
            className="dropMenu"
            key={index}
            onClick={() => handleSelectOption(item)}
          >
            <input type="radio" name="radio" />
            <span className="menuList">{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ScholarshipDropdown;
