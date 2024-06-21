import React from "react";
import "./ImageStyle.css";

const Image = ({ name, classname, extention, id, onClick }) => {
  return (
    <img
      onClick={onClick}
      id={id}
      className={classname}
      src={`https://cdn.mastersunion.org/assets/dinero/${name}${
        extention ? extention : ".svg"
      }`}
      alt={name}
      style={{ cursor: "pointer" }}
    />
  );
};

export default Image;
