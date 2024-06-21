import React, { useState, useEffect } from "react";
import "./MakeReportsHeader.css";
import Papa from "papaparse";
import Button from "../../../Components/Button/Button";
import InputField from "../../../Components/InputField/InputField";
import CustomDropdown from "../../../Components/CustomDropdown/CustomDropdown";

const MakeReportsHeader = ({
  searchFunction,
  onClick,
  clearSearch,
  onClickCreateReportTemplate,
  BlogsRightMenuoption,
  setUsernames,
  usernames,
  handleSelectedUserId,
  downloadPDFLinks,
  iscsvSelected,
  setIsCsvSelected,
  setCsvData,
  csvData,
  handleCreatePopup,creatingReportFetching
}) => {
  useEffect(() => {
    if (csvData && csvData.length > 0) {
      const options = csvData.map((item, index) => ({
        id: index,
        name: item.name,
      }));
      setUsernames(options);
      setIsCsvSelected(true);
    }
  }, [csvData]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: function (results) {
          setCsvData(results.data);
        },
        error: function (error) {
          console.error("Error parsing CSV file:", error);
        },
      });
    }
  };

  return (
    <header>
      <div className="secondMenu flexbox">
        <div className="SmenuLeft">
          <InputField type="file" onChange={handleFileChange} accept=".csv" />
        </div>
        <div className="SmenuMid">
          {csvData && csvData.length > 0 && (
            <CustomDropdown
              options={usernames}
              onSelect={handleSelectedUserId}
              dropName={"Select Student"}
            />
          )}
        </div>
        <div className="SmenuRight newButtonWrap">
          <Button
            onClick={handleCreatePopup}
            downloadPDFLinks={downloadPDFLinks}
            disabled={!iscsvSelected}
            className={"BlueFillButton iconButton"}
            tooltip={
              !iscsvSelected ? "Upload CSV File First" : "Create Report Cards"
            }
            name={"Create Report Card"}
            src={"https://cdn.mastersunion.org/assets/dinero/openEnvelope.svg"}
          />
        </div>
      </div>
    </header>
  );
};

export default MakeReportsHeader;
