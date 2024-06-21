import React from "react";
import "./sendEmail.css";
import { useState } from "react";
import close from "../../assets/svg/close.svg";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";
import Button from "../Button/Button";
import { useSelector } from "react-redux";

import InputField from "../InputField/InputField";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import Cookies from "js-cookie";
import {
  getAllEmailTemplatesWithId,
  sendEmailsToStudents,
} from "../../redux/reportCard/reportCardSlice";

const ConfigureAndSendEmail = ({
  isActive,
  isFilterSlider,
  setIsFilterSlider,
  setIsActive,
  setFilters,
  selectedStudentsForEmail,
  templateData,
  setFetchReportCardsAgain,
  fetchReportCardsAgain,
  setSelectedStudentsForEmail,
}) => {
  const dispatch = useDispatch();
  const loginuserID = Cookies.get("userId");

  const { emailTemplatesData, isSendEmailsSuccess, isSendEmailsFetching } =
    useSelector((state) => state.reportCards);

  const [resetBit, setResetBit] = useState(false);
  const [selectedEmailData, setSelectedEmailData] = useState({});
  const [emailTemplateCode, setEmailTemplateCode] = useState("");
  const [emailTemplateID, setEmailTemplateID] = useState("");
  const [formData, setFormData] = useState({
    emailSubject: "",
    program: templateData?.program,
    cohort: templateData?.cohort,
    term: templateData?.term,
    emailDataToSend: selectedStudentsForEmail,
    emailTemplateID: "",
    createdBy: loginuserID || "",
  });

  useEffect(() => {
    const emailOrgID = "52c3b93c-59ba-44e7-8e99-bd5fc889b68x";
    dispatch(getAllEmailTemplatesWithId(emailOrgID));
  }, [dispatch]);

  useEffect(() => {
    const replacePlaceholders = (subject, cohort, term) => {
      return subject.replace("{cohort}", cohort).replace("{term}", term);
    };

    let templateType;
    switch (templateData?.program) {
      case "Applied Finance":
        templateType = "afReportCard";
        break;
      case "Human Resource Management":
        templateType = "hrmReportCard";
        break;
      default:
        templateType = "afReportCard";
        break;
    }

    if (emailTemplatesData?.length > 0) {
      for (let i = 0; i < emailTemplatesData.length; i++) {
        if (emailTemplatesData[i]?.templateType === templateType) {
          setSelectedEmailData(emailTemplatesData[i]);
          setEmailTemplateCode(emailTemplatesData[i].templateBody);
          setEmailTemplateID(emailTemplatesData[i].id);
          const updatedSubject = replacePlaceholders(
            emailTemplatesData[i].templateSubject,
            formData.cohort,
            formData.term
          );

          setFormData((prev) => ({
            ...prev,
            emailSubject: updatedSubject,
            emailTemplateID: emailTemplatesData[i].id,
          }));
          break;
        }
      }
    }
  }, [templateData, emailTemplatesData, formData.cohort, formData.term]);

  const SampleProgramOption = [
    { type: "program", name: "Applied Finance", id: "Applied Finance" },
    {
      type: "program",
      name: "Strategic Marketing & AI",
      id: "Strategic Marketing & AI",
    },
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSendEmails = () => {
    console.log("Sned Email Handler");
    dispatch(sendEmailsToStudents(formData)).then((value) => {
      setFetchReportCardsAgain(!fetchReportCardsAgain);
      setSelectedStudentsForEmail([]);
      setIsActive(false);
    });
  };

  useEffect(() => {
    if (isActive) {
      setResetBit(false);
    }
  }, [isActive]);
  console.log("data", emailTemplateID, "EmailsData.program", formData);
  return (
    <div className={`sideFilterBoxWrapper ${isActive && "active"}`}>
      <div className="sideFilterBox">
        <div className="popupHeader">
          <h4 className="popupHeading">Configure Emails</h4>
          <span className="close" onClick={() => setIsActive(false)}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="sideMenuBody">
          <div className="formCreate">
            <div className="customDropDownHeadings">Email Subject</div>

            <InputField
              name="emailSubject"
              placeholder="Enter Subject For the Emails"
              value={formData?.emailSubject}
              onChange={handleFormChange}
            />
            <div className="customDropDownHeadings">Program name</div>
            <CustomDropdown
              className={"dropDropEmail"}
              options={SampleProgramOption}
              type={"program"}
              onSelect={handleSelectOption}
              dropName={"Select The Program Name"}
              selectedOptionName={formData?.program}
            />
            <div className="customDropDownHeadings">Cohort name</div>
            <CustomDropdown
              className={"dropDropEmail"}
              options={SampleCohortOption}
              type={"program"}
              onSelect={handleSelectOption}
              dropName={"Select The Cohort"}
              selectedOptionName={formData?.cohort}
            />
            <div className="customDropDownHeadings">Term name</div>

            <CustomDropdown
              className={"dropDropEmail"}
              options={SampleTermOption}
              onSelect={handleSelectOption}
              dropName={"Select The Term"}
              type={"program"}
              selectedOptionName={formData?.term}
            />
          </div>
          <div className="customDropDownHeadings">Email Template</div>

          <div
            className="showEmailTemplate"
            dangerouslySetInnerHTML={{ __html: emailTemplateCode }}
          />
        </div>
        <div className="sideMenuFooter flexbox">
          <Button
            className={"BlueFillButton"}
            name={"Send Emails"}
            onClick={handleSendEmails}
            isWaiting={isSendEmailsFetching}
            disabled={isSendEmailsFetching}
            tooltip={"Will Send Mails To Students"}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfigureAndSendEmail;
