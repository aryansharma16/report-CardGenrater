import React from "react";
import "./CreateBlogMenu.css"
import SearchBar from "../../../Components/SearchBar/SearchBar";
import Button from "../../../Components/Button/Button";
import refresh from "../../../assets/svg/refresh.svg";
import add from '../../../assets/img/addBlue.svg';
import openEnvelope from "../../../assets/svg/openEnvelope.svg";
const CreateBlogMenu = ({ searchFunction,clearSearch,currentCount,
  totalCount,isBlogSliceFetchingSmall,handleSaveDraft}) => {
  return (
    <header>
      <div className="secondMenu flexbox">
        
          <div className="SmenuLeft">
            {/* <SearchBar placeholder={"Search Blog..."} searchFunction={searchFunction} clearSearch={clearSearch} /> */}
          </div>
          <div className="SmenuMid">
        {/* Showing {currentCount} out of {totalCount} */}
      </div>
          <div className="SmenuRight newButtonWrap">
          
          <Button
              onClick={handleSaveDraft}
              className={"BlueFillButton iconButton"}
              name={"Save As Draft"}
             isWaiting={isBlogSliceFetchingSmall}
              src={"https://cdn.mastersunion.org/assets/dinero/openEnvelope.svg"}
            />
          
            
          </div>
        </div>
     
    </header>
  );
};

export default CreateBlogMenu;
