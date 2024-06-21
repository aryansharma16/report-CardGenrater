import React from "react";
import "./ButtonStyle.css";

const Button = ({ className, onClick, name, src, disabled, isWaiting, tooltip }) => {
  
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      disabled={disabled}
      title={tooltip}
    >                                         {/* TODO : Change Style , this is temp toshow filter is active or not*/}
      {src && <img src={src} alt="" className={className?.includes("blink")  ? "blink" : ""} />}
      <div className={`overLapLoad ${isWaiting && "true"}`}></div>
      {name}
    </button>
  );
};

export default Button;
