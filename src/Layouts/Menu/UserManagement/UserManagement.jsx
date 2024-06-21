import React from "react";
import "./UserManagementStyle.css";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Button from "../../../Components/Button/Button";
import refresh from "../../../assets/svg/refresh.svg";
import add from "../../../assets/img/addBlue.svg";

const UserManagement = ({
  searchbar,
  searchFunction,
  clearSearch,
  currentCount,
  totalCount,
  UserManagementMenuRightOptions,
}) => {
  return (
    <header>
      <div className="bottomLevelHeader">
        <div className="container flexbox">
          <div className="bottomLeft flexbox">
           { searchbar && <SearchBar placeholder={"Search User..."}  clearSearch={clearSearch} searchFunction={searchFunction}/>}
          </div>

          <div className="SmenuMid">
        Showing {currentCount} out of {totalCount}
      </div>

          <div className="bottomRight flexbox roleDropDown">
            {UserManagementMenuRightOptions &&
              UserManagementMenuRightOptions.length > 0 &&
              UserManagementMenuRightOptions.map((Component, index) => (
                <Component key={index} />
              ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserManagement;
