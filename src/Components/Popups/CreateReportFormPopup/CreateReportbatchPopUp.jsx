import React, { useState, useEffect } from "react";
import InputField from "../../InputField/InputField";
import Button from "../../Button/Button";
import close from "../../../assets/svg/close.svg";
import CustomDropdown from "../../CustomDropdown/CustomDropdown";
import "./CreateReportPopup.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  createReportCardBatch,
  setCreateReportformDataState,
} from "../../../redux/reportCard/reportCardSlice";
import Cookies from "js-cookie";

const CreateReportbatchPopUp = ({
  isActive,
  onSubmit,
  onClickClosePopup,
  downloadPDFLinks,
  onCancel,
  csvData,
  creatingReportFetching,
}) => {
  const {
    isgetAllReportCardFetching,
    isgetAllCardsSliceSuccess,
    isreportCardSliceError,
    createReportFromData,
    reportCardSliceSuccessMessage,
    singleReportCardsData,
    createReportBatchData,
    isCreatereportBatchSuccess,
    isCreatereportBatchFetching,
  } = useSelector((state) => state.reportCards);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginuserID = Cookies.get("userId");

  const Spinner = () => {
    return (
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  };

  const [formData, setFormData] = useState({
    batchName: "",
    number_of_reports: csvData?.length,
    created_by: loginuserID,
    // program: "",
    // cohort: "",
    // term: "",
    // type: "",
    // description: "",
    //reportDesignCode: "",
    //createdBy: loginuserID || "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    console.log(formData, "here we go");
  }, [formData]);

  const validateForm = () => {
    const requiredFields = ["batchName"];
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
      //  navigate("/create-report-cards");
      dispatch(createReportCardBatch(formData));
    }
  };
  console.log(
    createReportBatchData,
    "mien idhr huuu batch DATA POPUP HAi ",
    createReportBatchData?.id
  );

  return (
    <div className={`popupWrapper ${isActive && "active"}`}>
      <div className="popupContainer">
        <div className="popupHeader">
          <h4 className="popupHeading">Create Report Card Batch And Reports</h4>
          <span className="close" onClick={() => onCancel(false)}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="createReportFormWrapper">
          <div className="formCreate">
            {!isCreatereportBatchSuccess ? (
              <InputField
                name="batchName"
                placeholder="Enter The Name of Report Card Batch"
                value={formData.batchName}
                onChange={handleFormChange}
              />
            ) : (
              ""
            )}
          </div>
          {error && <div className="errorMessageCreatePopUp">{error}</div>}

          {creatingReportFetching && (
            <div className="creatingReportMessage">
              <Spinner />
              <p className="creatingReportMessageTEXT">
                Your report cards is being generated. Please wait and do not
                close this window or navigate away from the website.
              </p>
              <p className="creatingReportMessageTEXT2">
                It May Take Few Minutes!
              </p>
            </div>
          )}
        </div>
        <div className="popupFooter">
          <div className="buttonWrapper">
            <Button
              onClick={() => onCancel(false)}
              className={"GreyFillButton"}
              name={"Cancel"}
              disabled={creatingReportFetching}
            />

            {!isCreatereportBatchSuccess ? (
              <Button
                className={"BlueFillButton"}
                name={"Continue"}
                onClick={handleContinue}
                disabled={isCreatereportBatchFetching}
              />
            ) : (
              ""
            )}

            {isCreatereportBatchSuccess ? (
              <Button
                className={"BlueFillButton"}
                name={"Genrate Reports Now"}
                onClick={downloadPDFLinks}
                disabled={creatingReportFetching}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReportbatchPopUp;
