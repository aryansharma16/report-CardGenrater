import React from "react";
import "./BlogsFilter.css";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import { useState } from "react";
import Button from "../../Button/Button";
import close from "../../../assets/svg/close.svg";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import InputField from "../../InputField/InputField";

const BlogFilterSlider = ({ isActive, setIsActive, setFilters }) => {
  const dispatch = useDispatch();
  const [resetBit, setResetBit] = useState(false);

  const [filterFormData, setFilterFormData] = useState({
    fromDate: "",
    toDate: "",
    statusType: "all",
    blogType: "",
  });

  useEffect(() => {
    if (isActive) {
      setResetBit(false);
    }
  }, [isActive]);

  const applyFilters = () => {
    setIsActive(false);
    setFilters({
      ...filterFormData,
    });
  };

  const resetFilterStates = () => {
    setIsActive(false);
    setResetBit(true);

    setFilterFormData({
      fromDate: "",
      toDate: "",
      statusType: "all",
      blogType: "",
    });

    setFilters({
      fromDate: "",
      toDate: "",
      statusType: "all",
      blogType: "",
    });
  };

  const onSelect = (obj, field) => {
    if (field == "statusType") {
      setFilterFormData({
        ...filterFormData,
        statusType: obj.type,
      });
    }
  };

  const onChangeFormData = (event) => {
    console.log("event", event);
    const { name, value } = event.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log("filterFormData", filterFormData);
  }, [filterFormData]);

  return (
    <div className={`sideFilterBoxWrapper ${isActive && "active"}`}>
      <div className="sideFilterBox">
        <div className="popupHeader">
          <h4 className="popupHeading">Blog Filter</h4>
          <span className="close" onClick={() => setIsActive(false)}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="sideMenuBody">
          {!resetBit && (
            <InputField
              checkBoxWrap={"filterDrop"}
              notImp={true}
              type={"date"}
              placeholder={"From Date"}
              labelName={"From Date"}
              name={"fromDate"}
              onChange={onChangeFormData}
              value={
                filterFormData?.fromDate === "2019-01-01"
                  ? ""
                  : moment(filterFormData?.fromDate).format("YYYY-MM-DD")
              }
            />
          )}
          {!resetBit && (
            <InputField
              checkBoxWrap={"filterDrop"}
              notImp={true}
              type={"date"}
              placeholder={"To Date"}
              labelName={"To Date"}
              name={"toDate"}
              onChange={onChangeFormData}
              value={moment(filterFormData?.toDate).format("YYYY-MM-DD")}
            />
          )}
          {!resetBit && (
            <CustomDropdown
              label={"Status Type"}
              className={"filterDrop"}
              dropName={"All"}
              field={"statusType"}
              options={[
                { name: "All", type: "all" },
                { name: "Active", type: "true" },
                {
                  name: "InActive",
                  type: "false",
                },
              ]}
              onSelect={onSelect}
            />
          )}

          {!resetBit && (
            <div className="singleFormOptions mt-20">
              <InputField
                checkBoxWrap={"formdropdowns"}
                notImp={true}
                placeholder={"Blog Type"}
                labelName={"Blog Type"}
                type={"text"}
                name="blogType"
                onChange={onChangeFormData}
                value={filterFormData?.blogType}
              />
            </div>
          )}
        </div>
        <div className="sideMenuFooter flexbox">
          <Button
            className={"GreyFillButton"}
            name={"Reset"}
            onClick={resetFilterStates}
          />
          <Button
            className={"BlueFillButton"}
            name={"Show Result"}
            onClick={applyFilters}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogFilterSlider;
