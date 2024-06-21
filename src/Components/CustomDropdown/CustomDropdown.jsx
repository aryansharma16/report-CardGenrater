import React, { useEffect, useState } from "react";
import { useRef } from "react";
import "./CustomDropdownStyle.css";

const CustomDropdown = ({
  dropName,
  options,
  // isOpen,
  // setIsActive,
  disabled,
  className,
  label,
  isimp,
  onSelect,
  // setSelectedOption,
  selectedOptionName,
  type,
  field, 
  isError,
  erroMessage,
  tooltip
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };
  // const handleOptionClick = (option) => {
  //   setSelectedOption(option);
  //   setIsActive(false);
  // };

  const handleSelectOption = (option, e) => {
    e.preventDefault();
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  // console.log("printing first data", selectedOptionName);

  useEffect(() => {
    if (type === "program" || type === "batch") {
      // console.log("printing program option", options);
      // console.log("selected option name as well", selectedOptionName);

      // Find the option with the provided name and set it as the initially selected option
      const initialOption = options.find(
        (option) => option.id === selectedOptionName
      );

      // console.log("printing initial option", initialOption);

      if (initialOption) {
        setSelectedOption(initialOption);
      }
    }

    if (type === "programList" || type === "batchList") {
      // console.log("printing program option", options);
      // console.log("selected option name as well", selectedOptionName);

      // Find the option with the provided name and set it as the initially selected option
      const initialOption = options.find(
        (option) => option.id === selectedOptionName
      );

      // console.log("printing initial option", initialOption);

      if (initialOption) {
        setSelectedOption(initialOption);
      }
    }
  }, [options, selectedOptionName]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div
      title={tooltip} 
      ref={dropdownRef}
      className={`customDropdownWrap flexbox ${
        isOpen && "active"
      } ${className}`}
      //   onClick={() => {
      //     if (!disabled) {
      //       setIsActive((prev) => !prev);
      //     }
      //   }

      // }
    >
      {label && (
        <label>
          {label} {isimp && <span className="impRed">*</span>} 
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 50 50">
	<circle cx="25" cy="25" r="24" fill="#ddd" />
	<text x="50%" y="50%" text-anchor="middle" fill="#000" font-size="24px" dy=".3em">i</text>
</svg>
          <span class="aboutTooltip">This is what the element represents</span> */}
        </label>
      )}
      <div className="dropDrop flexbox" onClick={() => handleToggleDropdown()}>
        <div className="dropText">
          {/* {typeof(dropName)} */}
          {selectedOption
            ? selectedOption.name
            : typeof(dropName) == 'number' ? dropName : dropName?.length > 0 ? dropName : "Select an option"}
        </div>
        {/* <img src="/assets/svg/arrow-down.svg" alt="" /> */}
        {type !== "program" && type !== "batch" && (
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
        )}
      </div>
      {/* <div className="dropMenuWindow">
        {options?.map((item, index) => (
          <label className="dropMenu" key={index} onClick={item.action}>
            <input type="radio" name="radio" />
            <span className="menuList">{item.name}</span>
          </label>
        ))}
      </div> */}
      {/* TODO : undefined for other pages */}
            {isError && <span className="FormError">{erroMessage}</span>}

      <div className="dropMenuWindow">
        {options?.map((item, index) => (
          <label
            className="dropMenu"
            key={index}
            onClick={(e) => {
              handleSelectOption(item, e)
            }}
          >
            <input type="radio" name="radio" />
            <span className="menuList">{item.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomDropdown;
