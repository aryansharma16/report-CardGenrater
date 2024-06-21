import React, { useState, useEffect } from "react";
import InputField from "../../InputField/InputField";
import Button from "../../Button/Button";
import close from "../../../assets/svg/close.svg";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import "./CreateReportPopup.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCreateReportformDataState } from "../../../redux/reportCard/reportCardSlice";
import Cookies from "js-cookie";

const EditBlogPopup = ({
  isActive,
  onSubmit,
  onClickClosePopup,
  blogId,
  blogDetails,
  isEditTemplatePopupFetching,
  onCancel,
}) => {
  const [code, setCode] = useState("");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginuserID = Cookies.get("userId");

  const [formData, setFormData] = useState({
    cardName: "",
    program: "",
    cohort: "",
    term: "",
    type: "",
    description: "",
    reportDesignCode: "",
    createdBy: loginuserID || "",
  });

  const SampleProgramOption = [
    { type: "program", name: "Applied Finance", id: "Applied Finance" },
    { type: "program", name: "Strategic Marketing & AI", id: "Strategic Marketing & AI" },
    {
      type: "program",
      name: "Human Resource Management",
      id: "Human Resource Management",
    },
  ];

  const SampleCohortOption = [
    { type: "cohort", name: "Cohort 1", id: "Cohort 1" },
    { type: "cohort", name: "Cohort 2", id: "Cohort 2" },
    { type: "cohort", name: "Cohort 3", id: "Cohort 3" },
    { type: "cohort", name: "Cohort 4", id: "Cohort 4" },
    { type: "cohort", name: "Cohort 5", id: "Cohort 5" },
    { type: "cohort", name: "Cohort 6", id: "Cohort 6" },
    { type: "cohort", name: "Cohort 7", id: "Cohort 7" },
    { type: "cohort", name: "Cohort 8", id: "Cohort 8" },
    { type: "cohort", name: "Cohort 9", id: "Cohort 9" },
    { type: "cohort", name: "Cohort 10", id: "Cohort 10" },
    { type: "cohort", name: "Cohort 11", id: "Cohort 11" },
    { type: "cohort", name: "Cohort 12", id: "Cohort 12" },
    { type: "cohort", name: "Cohort 13", id: "Cohort 13" },
    { type: "cohort", name: "Cohort 14", id: "Cohort 14" },
    { type: "cohort", name: "Cohort 15", id: "Cohort 15" },
  ];

  const SampleTermOption = [
    { type: "term", name: "Term 1", id: "Term 1" },
    { type: "term", name: "Term 2", id: "Term 2" },
    { type: "term", name: "Term 3", id: "Term 3" },
    { type: "term", name: "Term 4", id: "Term 4" },
    { type: "term", name: "Term 5", id: "Term 5" },
    { type: "term", name: "Term 6", id: "Term 6" },
    { type: "term", name: "Term 7", id: "Term 7" },
    { type: "term", name: "Term 8", id: "Term 8" },
    { type: "term", name: "Term 9", id: "Term 9" },
    { type: "term", name: "Term 10", id: "Term 10" },
  ];

  const SampleTypeOption = [
    { type: "type", name: "None", id: "None" },
    { type: "type", name: "LinkedIn", id: "LinkedIn" },
    { type: "type", name: "Mock Interview", id: "Mock Interview" },
    {
      type: "type",
      name: "Training And Devlopment",
      id: "Training And Devlopment",
    },
  ];

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCode(newValue);
  };

  const handleSelectOption = (option) => {
    switch (option.type) {
      case "program":
        setFormData((prev) => ({ ...prev, program: option.name }));
        break;
      case "cohort":
        setFormData((prev) => ({ ...prev, cohort: option.name }));
        break;
      case "term":
        setFormData((prev) => ({ ...prev, term: option.name }));
        break;
      case "type":
        setFormData((prev) => ({ ...prev, type: option.name }));
        break;
      default:
        break;
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formData, "here we go");
  }, [formData]);

  const validateForm = () => {
    const requiredFields = [
      "cardName",
      "program",
      "cohort",
      "term",
      "type",
      "description",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return field;
      }
    }
    return null;
  };

  
  const handleContinue = (event) => {
    const invalidField = validateForm();
    if (invalidField) {
      setError(`Please fill in the "${invalidField}" field.`);
    } else {
      setError("");
      navigate("/create-report-cards");
      dispatch(setCreateReportformDataState(formData));
    }
  };

  return (
    <div className={`popupWrapper ${isActive && "active"}`}>
      <div className="popupContainer">
        <div className="popupHeader">
          <h4 className="popupHeading">Create Report Card Template</h4>
          <span className="close" onClick={() => onCancel(false)}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="createReportFormWrapper">
          <div className="formCreate">
            <InputField
              name="cardName"
              placeholder="Enter The Name of Report Card"
              value={formData.cardName}
              onChange={handleFormChange}
            />
            <CustomDropdown
              options={SampleProgramOption}
              onSelect={handleSelectOption}
              dropName={"Select The Program Name"}
            />
            <CustomDropdown
              options={SampleCohortOption}
              onSelect={handleSelectOption}
              dropName={"Select The Cohort"}
            />
            <CustomDropdown
              options={SampleTermOption}
              onSelect={handleSelectOption}
              dropName={"Select The Term"}
            />
            <CustomDropdown
              options={SampleTypeOption}
              onSelect={handleSelectOption}
              dropName={"Select The Type"}
            />
            <InputField
              placeholder="Enter Description"
              name="description"
              value={formData.description}
              onChange={handleFormChange}
              type={"textarea"}
            />
          </div>
          {error && <div className="errorMessageCreatePopUp">{error}</div>}
        </div>
        <div className="popupFooter">
          <div className="buttonWrapper">
            <Button
              onClick={() => onCancel(false)}
              className={"GreyFillButton"}
              name={"Cancel"}
            />
            <Button
              className={"BlueFillButton"}
              name={"Continue"}
              onClick={handleContinue}
              disabled={isEditTemplatePopupFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPopup;
