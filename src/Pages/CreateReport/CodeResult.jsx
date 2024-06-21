import React, { useRef, useEffect, useState } from "react";
import html2pdf from "html2pdf.js";

const CodeResult = ({
  code,
  setCode,
  setSelectedTextResult,
  selectedTextResult,
}) => {
  const resultRef = useRef(null);
  const [contentLoaded, setContentLoaded] = useState(false); // State to track iframe content load

  const handletextClick = () => {
    const iframeDocument = resultRef.current?.contentDocument;
    if (!iframeDocument) return;

    const selection = iframeDocument.getSelection();
    if (selection.rangeCount) {
      const text = selection.toString();
      setSelectedTextResult(text); // Update state with selected text
    } else {
      console.log("No text selected.");
    }
  };

  useEffect(() => {
    const iframe = resultRef.current;

    const handleIframeLoad = () => {
      setContentLoaded(true); // Set contentLoaded to true when iframe is loaded
    };

    iframe.onload = handleIframeLoad;

    return () => {
      if (iframe.contentWindow) {
        iframe.contentWindow.removeEventListener("click", handletextClick);
      }
    };
  }, [resultRef]);

  const generatePDF = () => {
    if (!resultRef.current) return;

    const iframeDocument = resultRef.current.contentDocument;

    if (iframeDocument) {
      const element = iframeDocument.documentElement; // Get the iframe content
      const opt = {
        margin: 1,
        filename: 'document.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
      };

      // Use html2pdf to generate PDF from iframe content
      html2pdf().from(element).set(opt).save();
    }
  };

  return (
    <div>
      <iframe
        ref={resultRef}
        title="result"
        srcDoc={code}
        className=""
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        style={{ backgroundColor: "#fff", width: "100%", height: "86vh" }}
        onLoad={() => console.log("Iframe Loaded")}
      />
    </div>
  );
};

export default CodeResult;
