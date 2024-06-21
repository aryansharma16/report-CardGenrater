import { useState } from 'react';
import * as filestack from "filestack-js";

const filestackClient = filestack.init("AASYllbvHQ3u0A1GxbOvZz");
const filestackToken = {};
const useMultiUpload = () => {
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
  const [fileUploadError, setFileUploadError] = useState(null);
  const [uploadedFileData, setUploadedFileData] = useState([]);

  const resetState = () => {
    setIsFileUploading(false);
    setFileUploadSuccess(false);
    setFileUploadError(null);
    setUploadedFileData([]);
  };

  const uploadFile = async (files, fileFor) => {
    try {
      console.log("in uploadFile")
      resetState();
      setIsFileUploading(true);

      const uploadPromises = Object.keys(files).map(async (key) => {
        let filestackUploadResponse ;
        try {
           filestackUploadResponse =  await filestackClient.upload(files[key], {}, filestackToken)
        } catch(err) {
          throw new Error("Error uploading file");
        }
        

        return {
          name: files[key].name,
          url: `https://filestack-mastersunion.s3.ap-south-1.amazonaws.com/${filestackUploadResponse.key}`,
          size: bytesToSize(filestackUploadResponse?._file?.size),
          fileFor
        };
      });


      console.log("uploadPromises", uploadPromises)
      const uploadedFiles = await Promise.all(uploadPromises);
      setUploadedFileData(uploadedFiles);
      setFileUploadSuccess(true);
    } catch (err) {
      setFileUploadError(err.message);
    } finally {
      setIsFileUploading(false);
    }
  };

  const bytesToSize = (bytes) => {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  };

  return { isFileUploading, fileUploadError, fileUploadSuccess, uploadedFileData, uploadFile };
};

export default useMultiUpload;
