import React from "react";
import "./BlogDashboardMenuStyle.css";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Button from "../../../Components/Button/Button";
import refresh from "../../../assets/svg/refresh.svg";
import add from "../../../assets/img/addBlue.svg";
import openEnvelope from "../../../assets/svg/openEnvelope.svg";
const BlogDashboardMenu = ({
  searchFunction,
  clearSearch,
  currentCount,
  totalCount,
  onClickCreateBlog,
  BlogsRightMenuoption,
  className
}) => {
  return (
    <header>
      <div className="secondMenu flexbox">
        <div className="SmenuLeft">
          <SearchBar
            placeholder={"Search Blog..."}
            searchFunction={searchFunction}
            clearSearch={clearSearch}
          />
        </div>
        <div className="SmenuMid">
          Showing {currentCount} out of {totalCount}
        </div>
        <div className="SmenuRight newButtonWrap">
          {BlogsRightMenuoption &&
            BlogsRightMenuoption.length > 0 &&
            BlogsRightMenuoption.map((Component, index) => (
              <Component key={index} />
            ))}
          {onClickCreateBlog && (
            <Button
              onClick={onClickCreateBlog}
              className={`BlueFillButton iconButton ${className}`}
              name={"+ Create Report Card"}
              src={
                "https://cdn.mastersunion.org/assets/dinero/openEnvelope.svg"
              }
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default BlogDashboardMenu;
