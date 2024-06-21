import React, { useEffect, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { SampleReport1AF } from "../../utils/SampleReport1";
import { useSelector } from "react-redux";

const TemplateEditor = ({
  code,
  handleChange,
  setCode,
  csvData,
  downloadPDFLocal,
  downloadPDFLinks,
  selectedTextResult,
  id,
  selectedUserId,
  defaultCode,
}) => {
  const textareaRef = useRef(null);
  const {
    isgetAllReportCardFetching,
    isgetAllCardsSliceSuccess,
    isreportCardSliceError,
    createReportFromData,
    reportCardSliceSuccessMessage,
    singleReportCardsData,
  } = useSelector((state) => state.reportCards);
  const defaultTemplate = SampleReport1AF;

  useEffect(() => {
    // Set code to default template when code is falsy
    if (!code) {
      handleChange({ target: { value: defaultTemplate } });
    }
    // Scroll to the selected dynamic value (initially empty)
  }, [code, handleChange, defaultTemplate]);
  // Function to generate PDF

  console.log(csvData, "we have all the data from csv files FRON CODE EDITOR");
  useEffect(() => {
    const regex = /{{(.*?)}}/g;
    const matches = code?.match(regex);
    const uniqueMatches = [...new Set(matches)];
    // console.log(uniqueMatches, "uniqueMatches");
    if (csvData) {
      // console.log("csvdata aagya --", csvData[0]);

      let updatedCode = code; // Initialize updatedCode with the original code

      for (let i = 0; i < uniqueMatches.length; i++) {
        //  console.log(i,"i am iiiii")
        let startIndex = updatedCode.indexOf(uniqueMatches[i]);
        let endIndex = startIndex + uniqueMatches[i].length;
        let cleanedValue = updatedCode.substring(startIndex + 2, endIndex - 2);
        // console.log(selectedUserId, "there");
        if (csvData[selectedUserId]) {
          Object.entries(csvData[selectedUserId]).forEach(([key, value]) => {
            //    console.log(value, "value in csv loop is");
            if (cleanedValue == key) {
              // console.log(cleanedValue, " -,- ", key);
              //startIndex = updatedCode.indexOf(uniqueMatches[i]);
              // endIndex = startIndex + uniqueMatches[i].length;
              updatedCode = replaceCustom(
                updatedCode,
                startIndex,
                endIndex,
                value
              );
              //  console.log(startIndex, endIndex, "here");
            }
          });
        }
      }

      // Update the state with the final updated code
      setCode(updatedCode);
      console.log(selectedUserId, " selectedUserId --->>> length hu main");
      // Set a timeout to trigger the downloadPDFLocal function 2 seconds later
      let timer;
      if (selectedUserId > 0 && selectedUserId <= csvData.length) {
        timer = setTimeout(() => {
          // downloadPDFLocal();
          downloadPDFLinks();
        }, 1200);
      }

      console.log('csv data is working', csvData, selectedUserId)

      // Clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [csvData, selectedUserId, code]);

  //console.log(code, "after useEffect CSV");
  function replaceCustom(str, start, end, replacement) {
    //console.log(str.substring(0, start), " this is start");
    // console.log(str.substring(end), " this is end");

    return str.substring(0, start) + replacement + str.substring(end);
  }
  return (
    <div style={{ height: "86vh", overflowY: "scroll" }}>
      <CodeEditor
        ref={textareaRef}
        value={code}
        language="HTML"
        placeholder="Please enter HTML code."
        onChange={(evn) => setCode(evn.target.value)}
        data-color-mode="dark"
        padding={15}
        style={{
          //  height: id ? "100%" : "auto", // Conditional style based on the existence of id
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
};

export default TemplateEditor;
