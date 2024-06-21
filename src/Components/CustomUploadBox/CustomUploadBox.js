import React from "react";
import "./CustomUploadBoxStyle.css";
import smalluploadLoader from "../../assets/img/smalluploadLoader.gif"
const CustomUploadBox = ({
  label,
  isimp,
  className,
  ref,
  onChange,
  onClickChooseFile,
  onClickDelete,
  fileName,
  spacing,
  isUploading,
  fileFor,
  isError,
  erroMessage,
  isMulti,
  name,
  fileUrl,
  acceptedFileTypes,
  disabled,
  onRemoveImage,
}) => {
  console.log("thumb",fileFor)
  const handleRemoveClick = () => {
   
    onRemoveImage(fileFor);
  };
  return (
    
    <>
    {/* TODO : add allowed file types */}
    <div className={`allWrapper ${spacing}`}>
      <div className="label">
        {label && (
          <label>
            {label} {isimp && <span className="impRed">*</span>}
          </label>
        )}
      </div>
      <div className={`uploadBox flexbox ${className}`}>
        <div className="uploadLeft">
          <input
            type="file"
            id={fileFor ?? "actualBtn"}
            ref={ref}
            accept={acceptedFileTypes}  // prop eg : acceptedFileTypes=".csv, .jpg, .jpeg, .png, .gif"
            onChange={onChange}
            hidden
            multiple={isMulti}
            name={name}
            disabled={disabled}
          />
          <label onClick={() => {
            if(!disabled && onClickChooseFile) {
              onClickChooseFile()
            }
            }} for={fileFor ?? "actualBtn"}>
            Choose File
          </label>
          <span className="fileChosen">
          {fileName ? <a href={fileUrl} target="_blank">
  <span className="fileChosen">{fileName}</span>
</a> : "No file chosen"}
          </span>
        </div>
      {isError && <span className="FormError">{erroMessage}</span>}

        {
          isUploading && <div className="uploadRight"> <img src={smalluploadLoader} alt="Image Uploading" /> </div>
        }
        {fileUrl && (
            <div className="uploadRight">
              <button
                className="removeButton"
                onClick={handleRemoveClick}
                // onClick={() => onRemoveImage(fileFor)}
              >
                Remove
              </button>
            </div>
          )}
        {/* <div className="uploadRight">
          <svg
            onClick={onClickDelete}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.5 4.98307C14.725 4.70807 11.9333 4.56641 9.15 4.56641C7.5 4.56641 5.85 4.64974 4.2 4.81641L2.5 4.98307"
              stroke="#E53935"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.0835 4.14199L7.26683 3.05033C7.40016 2.25866 7.50016 1.66699 8.9085 1.66699H11.0918C12.5002 1.66699 12.6085 2.29199 12.7335 3.05866L12.9168 4.14199"
              stroke="#E53935"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15.7082 7.61621L15.1665 16.0079C15.0748 17.3162 14.9998 18.3329 12.6748 18.3329H7.32484C4.99984 18.3329 4.92484 17.3162 4.83317 16.0079L4.2915 7.61621"
              stroke="#E53935"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.6084 13.75H11.3834"
              stroke="#E53935"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.9165 10.417H12.0832"
              stroke="#E53935"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div> */}
      </div>
    </div>
    </>
  );
};

export default CustomUploadBox;

