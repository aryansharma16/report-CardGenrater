import React, { useState, useRef } from "react";
import InputField from "../../InputField/InputField";
import TinyEditor from "../../TextEditor/Editor";
import Button from "../../Button/Button";
import useMultiUpload from "../../../utils/CustomHooks/useMultiUpload";
import close from "../../../assets/svg/close.svg";
import CustomUploadBox from "../../CustomUploadBox/CustomUploadBox";
import { useEffect } from "react";
import Select from "react-select";

import { TagsInput } from "react-tag-input-component";

const options = [
  {value : "admin", label:"admin"},
  {value : "user", label:"user"},
]


const EditUserPopup = ({
  onSubmit,
  onClickClosePopup,
  userId,
  userDetails,
  isCreateUserPopupFetching,
  setRoleIds,
  dropdownOptions,
  isActive,
  errors
}) => {
  console.log("userID", userId, userDetails, userDetails.role);
  const [selectedOption, setSelectedOption] = useState("");
  const [editroleid , seteditroleid]= useState("")
  // const [optionArray, setOptionArray] = useState([]);
  const [type, setType] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    alternateEmail: "",
    password: "",
    role:"",
    id: userId,

  });

 


  useEffect(() => {
    if (userDetails) {
      setFormData({
        firstName: userDetails?.firstName,
        lastName: userDetails?.lastName,
        mobileNumber: userDetails?.mobileNumber,
        email: userDetails?.email,
        alternateEmail: userDetails?.alternateEmail,
        // password: userDetails?.password,
        role: userDetails?.role
      });
    }
  }, [userDetails]);
  
//   useEffect(() => {
//     var rolesList = [];
//     var programsList = [];

//     if (dropdownOptions?.length > 0) {
//       dropdownOptions.forEach((element) => {
//         console.log("printing element", element);
           
//         rolesList.push({ value: element, label: element  });
//       });

//       setOptionArray(rolesList);
//     }
// }, [dropdownOptions]);



  const onChangeFormData = (data) => {
    const { name, value } = data.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onChangeFormroleData = (newrole) => {
    setFormData({
      ...formData,
      role: newrole.value,
    });
  
    
  };
  const handleSubmit = () => {
    let newObj = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        mobileNumber: formData?.mobileNumber,
        email: formData?.email,
        alternateEmail: formData?.alternateEmail,
        password: userDetails?.password,
        role:formData?.role,
      id:userId
    };
    console.log(newObj+"new");

    onSubmit(newObj);
  };

  return (
    <div className={`popupWrapper ${isActive && "active"}`}>
      <div className="popupContainer">
        <div className="popupHeader">
          <h4 className="popupHeading">Edit User</h4>
          <span className="close" onClick={onClickClosePopup}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="popupBody">
        <InputField
            name="firstName"
            className={"mb-20"}
            labelName={"First Name"}
            placeholder={"Enter First Name"}
            onChange={onChangeFormData}
            isError={errors.firstName ? true : false}
            erroMessage={errors.firstName}
            value={formData?.firstName}

          />
          <InputField
            name="lastName"
            className={"mb-20"}
            labelName={"Last Name"}
            placeholder={"Enter Last Name"}
            onChange={onChangeFormData}
            notImp={true}
            value={formData?.lastName}

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
            value={formData?.mobileNumber}

          />
          <InputField
            name="email"
            className={"mb-20"}
            labelName={"Email ID"}
            placeholder={"Enter Email ID"}
            onChange={onChangeFormData}
            isError={errors.email ? true : false}
            erroMessage={errors.email}
            value={formData?.email}

          />
          {/* <InputField
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
            value={formData?.password}

          /> */}
          <InputField
            name="alternateEmail"
            className={"mb-20"}
            labelName={"Alternate Email"}
            placeholder={"Enter Alternate Email"}
            onChange={onChangeFormData}
            notImp={true}
            value={formData?.alternateEmail}

          />
          <div className="formGroups">
            <label className="multiSelect" htmlFor="">
              Select Roles
            </label>
          </div>
          <Select
            className="dropUpMenu mb-20"
            // onChange={setRoleIds}
            // value={formData?.role}
            onChange={onChangeFormroleData}
            // placeholder={userDetails?.role}
            defaultValue={options.find((ele)=> ele.value=== userDetails?.role)}
            isSearchable={false}
            // isMulti={false}
            options={options}
          />
          
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
              name={"Edit"}
              onClick={handleSubmit}
            //   isWaiting={isCreateUserPopupFetching}
            //   disabled={isCreateUserPopupFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUserPopup;
