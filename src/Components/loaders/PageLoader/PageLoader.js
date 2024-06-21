import React from "react";
import "./PageLoaderStyle.css";
import loader from '../../../assets/img/pageloader.gif'
const PageLoader = () => {
  return (
    <div className="preloader-wrapper">
      <div className="cssloader">
        <img src={loader} alt="" />
      </div>
    </div>
  );
};
export default PageLoader;