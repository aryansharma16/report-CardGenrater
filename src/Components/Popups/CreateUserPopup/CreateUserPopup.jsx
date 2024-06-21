import React, { useState } from "react";
import InputField from "../../InputField/InputField";
// import Dropdown from "../../Dropdown/Dropdown";
import "./CreateUserPopupStyle.css";
import Button from "../../Button/Button";
// import CustomCheckbox from "../../CustomCheckbox/CustomCheckbox";
import close from "../../../assets/svg/close.svg";
import Select from "react-select";
import { useEffect } from "react";

const CreateUserPopup = ({
  isActive,
  onClickCreateUser,
  onClickClosePopup,
  onChangeFormData,
  errors,
  isCreateUserPopupFetching,
  dropdownOptions,
  setRoleIds,
  programList,
  setProgramIds,
}) => {
  const [optionArray, setOptionArray] = useState([]);
  const [programOptionArray, setProgramOptionArray] = useState([]);
  const [type, setType] = useState(true);

  // console.log("program List", programList);

  useEffect(() => {
    var rolesList = [];
    var programsList = [];

    if (dropdownOptions?.length > 0) {
      dropdownOptions.forEach((element) => {
        console.log("printing element", element);
        rolesList.push({ value: element, label: element });
      });

      setOptionArray(rolesList);
    }

    if (programList?.length > 0) {
      programList.forEach((element) => {
        // console.log("printing element", element);
        programsList.push({
          value: element.batchId,
          label: element.programName,
        });
      });

      setProgramOptionArray(programsList);
    }
  }, [dropdownOptions, programList]);

  // const arrayData = () => {};

  // const formObject = { firstName: "", lastName: "", mobileNumber: "", email: "", password: "", alternateEmail: ""};
  // const [formData, setFormData] = useState(formObject);
  // // const [errors, setErrors] = useState({email: "", password: ""});

  //  /**Handling formData with single onChange */
  //  const onChangeFormData = (event) => {
  //   const { name, value } = event.target;
  //   setFormData({
  //     ...formData,
  //     [name]: value,
  //   });
  //   // setErrors({email: "", password: ""})
  // };

  return (
    <div className={`popupWrapper ${isActive && "active"}`}>
      <div className="popupContainer">
        <div className="popupHeader">
          <h4 className="popupHeading">Create new User</h4>
          <span className="close" onClick={onClickClosePopup}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="popupBody">
          {/* <InputField
            notImp={"notimp"}
            labelName={"Email ID"}
            placeholder={"Enter Your Email"}
            onChange={onChangeFormData}
            name="email"
            type={"text"}
            isError={errors.email? true : false}
            erroMessage={errors.email}
          /> */}
          <InputField
            name="firstName"
            className={"mb-20"}
            labelName={"First Name"}
            placeholder={"Enter First Name"}
            onChange={onChangeFormData}
            isError={errors.firstName ? true : false}
            erroMessage={errors.firstName}
          />
          <InputField
            name="lastName"
            className={"mb-20"}
            labelName={"Last Name"}
            placeholder={"Enter Last Name"}
            onChange={onChangeFormData}
            notImp={true}
          />

          {/* <InputField
            name="uid"
            className={"mb-20"}
            labelName={"UID"}
            placeholder={"Enter UID"}
            onChange={onChangeFormData}
            isError={errors.uid ? true : false}
            erroMessage={errors.uid}
          /> */}
          <InputField
            name="mobileNumber"
            className={"mb-20"}
            labelName={"Phone No"}
            placeholder={"Enter phone no"}
            onChange={onChangeFormData}
            isError={errors.mobileNumber ? true : false}
            erroMessage={errors.mobileNumber}
          />
          <InputField
            name="email"
            className={"mb-20"}
            labelName={"Email ID"}
            placeholder={"Enter Email ID"}
            onChange={onChangeFormData}
            isError={errors.email ? true : false}
            erroMessage={errors.email}
          />
          <InputField
            name="password"
            className={"mb-20"}
            labelName={"Password"}
            placeholder={"Enter Password"}
            type={type === true ? "password" : "text"}
            onChange={onChangeFormData}
            inputIcon={type === true ? "hideIcon" : "viewIcon"}
            isError={errors.password ? true : false}
            onclick={() => setType(!type)}
            erroMessage={errors.password}
          />
          <InputField
            name="alternateEmail"
            className={"mb-20"}
            labelName={"Alternate Email"}
            placeholder={"Enter Alternate Email"}
            onChange={onChangeFormData}
            notImp={true}
          />

          {/*TODO  */}
          {/* <div className="formGroups">
            <label className="multiSelect" htmlFor="">
              Assign Program
            </label>
          </div>
          <Select
            className="dropUpMenu mb-20 "
            onChange={setProgramIds}
            isMulti
            options={programOptionArray}
          /> */}

          {/*TODO  */}
          <div className="formGroups">
            <label className="multiSelect" htmlFor="">
              Select Roles
            </label>
          </div>
          <Select
            className="dropUpMenu mb-20"
            onChange={setRoleIds}
            // isMulti={false}
            options={optionArray}
          />
          {/* <Dropdown
            className={"mt-20 mb-20"}
            options={DropdownValue}
            labelName={"Category type"}
          /> */}
          {/* TODO */}

          {/* <div className="featureTypeWrap">
            <div className="labelCommon">
              Feature type <span className="impRed">*</span>
            </div>
            <div className="featureTypeBox">
              {options?.map((item, index) => (
                <CustomCheckbox names={item} key={index} />
              ))}
            </div>
          </div> */}
        </div>
        <div className="popupFooter">
          <div className="buttonWrapper">
            <Button
              onClick={onClickClosePopup}
              className={"GreyFillButton"}
              name={"Cancel"}
            />
            <Button
              className={"BlueFillButton"}
              name={"Submit"}
              onClick={onClickCreateUser}
              isWaiting={isCreateUserPopupFetching}
              disabled={isCreateUserPopupFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserPopup;
