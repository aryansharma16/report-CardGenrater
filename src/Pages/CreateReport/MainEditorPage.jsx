import React, { useEffect, useState, useRef } from "react";
import "./CreateReport.css";
import Editor from "./TemplateEditor";
import CreateReportHeader from "../../Layouts/Menu/CreateReportmenu/CreateReportHeader";
import CustomUploadBox from "../../Components/CustomUploadBox/CustomUploadBox";
import CodeResult from "./CodeResult";
import InputField from "../../Components/InputField/InputField";
import CustomDropdown from "../../Components/CustomDropdown/CustomDropdown";
import Button from "../../Components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createReportCardTemplate,
  getCardById,
  setReportCode,
  createReportCardBatch,
  createReportsInfo,
} from "../../redux/reportCard/reportCardSlice";
import { SampleReport1AF } from "../../utils/SampleReport1";
import MakeReportsHeader from "../../Layouts/Menu/MakeReports/MakeReportsHeader";
import Cookies from "js-cookie";
import CreateReportbatchPopUp from "../../Components/Popups/CreateReportFormPopup/CreateReportbatchPopUp";

const MainEditorPage = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isgetAllReportCardFetching,
    isgetAllCardsSliceSuccess,
    isreportCardSliceError,
    createReportFromData,
    reportCardSliceSuccessMessage,
    singleReportCardsData,
    createReportBatchData,
    isCreatereportBatchSuccess,
  } = useSelector((state) => state.reportCards);

  const [usernames, setUsernames] = useState([]);
  const [creatingReportFetching, setCreatingreportFetching] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [code, setCode] = useState(SampleReport1AF);
  const [defaultCode, setDefaultCode] = useState(SampleReport1AF);
  const [selectedTextResult, setSelectedTextResult] = useState("");
  const [csvData, setCsvData] = useState(null); // state to store parsed CSV data\
  const [iscsvSelected, setIsCsvSelected] = useState(false); // state to store parsed CSV data\
  const loginuserID = Cookies.get("userId");
  const [createReportCardBatchPopup, setCreateReportCardBatchPopup] =
    useState(false);

  const [reportInfos, setReportInfos] = useState([
    // {
    //   student_email: "",
    //   template_id: singleReportCardsData.id,
    //   batch_id: createReportBatchData.id,
    //   status: false,
    //   report_cdn_link: "",
    // },
  ]);

  const handleSelectedUserId = (selectedOption) => {
    //console.log(selectedOption, "here we go for the select");
    //setCode(singleReportCardsData.reportDesignCode);
    //setSelectedUserId(selectedOption.id);
    //console.log("Selected user ID:", selectedOption.id);
  };
  console.log(
    createReportBatchData,
    "mien idhr huuu batch DATA ",
    createReportBatchData?.id
  );
  useEffect(() => {
    if (id) {
      dispatch(getCardById(id)); // Pass the extracted id
    }
  }, [id]);

  useEffect(() => {
    setCode(singleReportCardsData.reportDesignCode);
  }, [singleReportCardsData]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setCode(newValue);
  };

  const onClickCreateReportTemplate = () => {
    dispatch(setReportCode(code));
    const obj = {
      ...createReportFromData,
      reportDesignCode: code,
    };
    dispatch(createReportCardTemplate(obj));
    navigate("/all-cards");
  };
  const handleCreatePopup = () => {
    setCreateReportCardBatchPopup(true);
  };

  console.log(csvData?.length, "lennn");
  const handleSavedPDF = () => {
    dispatch(createReportsInfo(reportInfos));
    navigate("/created-report-batches");
  };
  const downloadPDFLinks = async (event) => {
    setCreatingreportFetching(true);
    const email = `${csvData[selectedUserId]?.email}`; // Assuming csvData is an array containing user data
    const name = `${csvData[selectedUserId]?.name}`; // Assuming csvData is an array containing user data

    const url = `https://apidinero.mastersunion.org/api/org/parseHtmlForPdfLink?name=${name}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
        },
        body: code, // Assuming `code` is defined elsewhere in your code
      });

      if (response.ok) {
        const data = await response.json(); // Assuming the response is in JSON format
        console.log(data, "PDF data Means link");
        // Update the state with the new email and PDF link object
        setReportInfos((prevReportInfos) => [
          ...prevReportInfos,
          {
            student_email: email,
            student_name: name,
            template_id: singleReportCardsData?.id,
            batch_id: createReportBatchData?.id,
            status: false,
            report_cdn_link: data.url,
          },
        ]);
        console.log(
          "just before reportInfos.length , csvData.length and selectedID ",
          reportInfos.length,
          csvData.length,
          selectedUserId
        );
        if (reportInfos.length === csvData.length) {
          console.log(
            "HERERREREREREcame here now ______________________________-----"
          );
          handleSavedPDF();
          setCreatingreportFetching(false);
        }
        setCode(singleReportCardsData.reportDesignCode);
        setSelectedUserId(selectedUserId + 1);
      } else {
        console.error("Failed to convert HTML to PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(
    reportInfos,
    "array of the objcts report infoo",
    reportInfos.length
  );

  const downloadPDFLocal = async (event) => {
    // event.preventDefault();

    const url = "https://apidinero.mastersunion.org/api/org/parseHtmltoPdf"; //https://apidinero.mastersunion.org/api/org/parseHtmlForPdfLink
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "text/html",
        },
        body: code,
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = `${csvData[selectedUserId].name}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        setCode(singleReportCardsData.reportDesignCode);
        setSelectedUserId(selectedUserId + 1);
      } else {
        console.error("Failed to convert HTML to PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {createReportCardBatchPopup && (
        <CreateReportbatchPopUp
          isActive={createReportCardBatchPopup}
          //userId={selectedBlogId}
          message={"Create the Report card"}
          onCancel={setCreateReportCardBatchPopup}
          //onAllow={handleDelete}
          csvData={csvData}
          downloadPDFLinks={downloadPDFLinks}
          creatingReportFetching={creatingReportFetching}
        />
      )}
      <div>
        {!id ? (
          <CreateReportHeader
            onClickCreateReportTemplate={onClickCreateReportTemplate}
          />
        ) : (
          <MakeReportsHeader
            onClickCreateReportTemplate={onClickCreateReportTemplate}
            csvData={csvData}
            setCsvData={setCsvData}
            setIsCsvSelected={setIsCsvSelected}
            iscsvSelected={iscsvSelected}
            code={code}
            downloadPDFLinks={downloadPDFLinks}
            // onClick={downloadPDFLocal}
            setUsernames={setUsernames}
            usernames={usernames}
            handleCreatePopup={handleCreatePopup}
            handleSelectedUserId={handleSelectedUserId}
            creatingReportFetching={creatingReportFetching}
          />
        )}
        <div className="CreateEditorWrapper">
          <div className="TemplateEditor">
            <Editor
              id={id}
              csvData={csvData}
              code={code}
              setSelectedTextResult={setSelectedTextResult}
              selectedTextResult={selectedTextResult}
              handleChange={handleChange}
              setCode={setCode}
              downloadPDFLocal={downloadPDFLocal}
              downloadPDFLinks={downloadPDFLinks}
              defaultCode={defaultCode}
              selectedUserId={selectedUserId}
            />
          </div>
          <div className="CodeResult">
            <CodeResult
              setSelectedTextResult={setSelectedTextResult}
              selectedTextResult={selectedTextResult}
              code={code}
              defaultCode={defaultCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainEditorPage;
