import React from "react";
import "./SearchBarStyle.css";
import { useEffect } from "react";
import { useState } from "react";
import close from "../../assets/svg/close.svg";

const SearchBar = ({ placeholder, searchFunction, clearSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className={`SearchBox flexbox ${"className"}`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.66671 14C11.1645 14 14 11.1645 14 7.66667C14 4.16886 11.1645 1.33333 7.66671 1.33333C4.1689 1.33333 1.33337 4.16886 1.33337 7.66667C1.33337 11.1645 4.1689 14 7.66671 14Z"
          stroke="#525252"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.6667 14.6667L13.3334 13.3333"
          stroke="#525252"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      {/* TODO */}
      {/* Should i perform search on onChange or onKeydown ( on pressing enter ? ) */}

      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={(e) => {
          // if(e.key === 'Enter' && searchValue) {
          if (e.key === "Enter") {
            searchFunction(searchValue);
          }
        }}
      />
      {searchValue.length > 0 && (
        <span
          className="close"
          onClick={() => {
            setSearchValue("");
            clearSearch();
          }}
        >
          <img src={close} alt="" />
        </span>
      )}

      {/* <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          searchFunction(e.target.value);
        }}
      /> */}
    </div>
  );
};

export default SearchBar;
