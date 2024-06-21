import React from "react";
import "./CreateReport.css";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Button from "../../../Components/Button/Button";
import refresh from "../../../assets/svg/refresh.svg";
import add from "../../../assets/img/addBlue.svg";
import openEnvelope from "../../../assets/svg/openEnvelope.svg";
const CreateReportHeader = ({
  searchFunction,
  clearSearch,
  
  onClickCreateReportTemplate,
  BlogsRightMenuoption,
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
         
        </div>
        <div className="SmenuRight newButtonWrap">
          <Button
            onClick={onClickCreateReportTemplate}
            className={"BlueFillButton iconButton"}
            name={"Save Report Card"}
            src={"https://cdn.mastersunion.org/assets/dinero/openEnvelope.svg"}
          />
        </div>
      </div>
    </header>
  );
};

export default CreateReportHeader;
