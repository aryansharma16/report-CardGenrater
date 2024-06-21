import { useState } from 'react'

const useFileUpload = () => {
  
    const [isFileUploading, setIsFileUploading] = useState(false);
    const [fileUploadSuccess, setFileUploadSuccess] = useState(false);
    const [fileUploadError, setFileUploadError] = useState(null);
    const [uploadedFileData, setUploadedFileData] = useState(null)


    const resetState = () => {
      setIsFileUploading(false);
      setFileUploadSuccess(false);
      setFileUploadError(null);
      setUploadedFileData(null);
    };


    const uploadFile = async (file) => {
        try {

          resetState();
          setIsFileUploading(true);

        const data = new FormData();

        data.append("file", file);
        data.append("upload_preset", "qlm4yp8h");
        data.append("cloud_name", "df491ehfg");

        const fileUploadResponse = await fetch("https://api.cloudinary.com/v1_1/df491ehfg/raw/upload", {
            method: "POST",
            body: data,
          }).catch((error) => {
            throw new Error("Network error: Unable to upload file");
          });

        if(!fileUploadResponse.ok) {
            throw new Error("Error uploading file");
        }

        const result = await fileUploadResponse.json();

        let fileObj = {
            name: file.name,
            url: result.secure_url,
            size: bytesToSize(result.bytes),
          };
          
        setUploadedFileData(fileObj);
        setFileUploadSuccess(true);
        } catch (err) {
          setFileUploadError(err.message);
        } finally {
          setIsFileUploading(false);
        }
      };

      const bytesToSize = (bytes) => {
        var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (bytes == 0) return "n/a";
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        if (i == 0) return bytes + " " + sizes[i];
        return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
      };
    
      return { isFileUploading, fileUploadError, fileUploadSuccess, uploadedFileData, uploadFile };
}

export default useFileUpload