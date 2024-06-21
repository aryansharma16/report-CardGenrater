import React, { useState, useRef } from "react";
import InputField from "../../InputField/InputField";
import Button from "../../Button/Button";
import useMultiUpload from "../../../utils/CustomHooks/useMultiUpload";
import close from "../../../assets/svg/close.svg";
import CustomUploadBox from "../../CustomUploadBox/CustomUploadBox";
import { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";
import "./EditBlogPopup.css"
const EditBlogPopup = ({
  isActive,
  onSubmit,
  onClickClosePopup,
  blogId,
  blogDetails,
   isEditTemplatePopupFetching
}) => {
  console.log("blogID", blogId, blogDetails);
  const {
    isFileUploading,
    fileUploadError,
    fileUploadSuccess,
    uploadedFileData,
    uploadFile,
  } = useMultiUpload();
  const SmallImageRef = React.useRef(null);
  const ThumbnailRef = React.useRef(null);
  const [SmallImageName, setSmallImageName] = useState(null);
  const [thumbnailName, setThumbnailName] = useState(null);
  const [uploadingField, setUploadingField] = useState(null);
  const [formData, setFormData] = useState({
    blog_Title: "",
    blog_Type: "",
    blog_Description: "",
    smallImage: "",
    thumbnail: "",
    blog_Body: "",
    id: blogId,
    wordCount:0,
    readingTime:0,
    selectedTag:[]
  });
  useEffect(() => {
    if (blogDetails) {
      const smallImageName = blogDetails?.smallImage?.split('/').pop();
      const fileName = smallImageName?.split('_').pop();

      const thumbnailName=blogDetails?.thumbNail?.split('/').pop();
      const thumbnailFileName=thumbnailName?.split('_').pop();
      setFormData({
        blog_Title: blogDetails?.blog_Title,
        blog_Type: blogDetails?.blog_Type,
        blog_Description: blogDetails?.blog_description,
        smallImage: blogDetails?.smallImage,
        thumbnail: blogDetails?.thumbNail,
        blog_Body: blogDetails?.blog_Body,
        wordCount:blogDetails?.blog_wordCount,
        readingTime:blogDetails?.blog_readingTime,
        selectedTag:blogDetails?.tags,
      });
      setSmallImageName(fileName);
      setThumbnailName(thumbnailFileName)
    }
  }, [blogDetails]);
  const onClickUpload = async (event, name) => {
    if (event.target.files.length > 0) {
      console.log("in onClickUpload");
      const files = event.target.files;
      const fileFor = event.target.fileFor;
      setUploadingField(name);

      await uploadFile(files, fileFor);
    }
  };
  const handleClick = (ref) => {
    if (ref.current) ref.current.click();
  };
  useEffect(() => {
    if (fileUploadSuccess && !isFileUploading) {
      switch (uploadingField) {
        case "smallImage":
          setFormData(prevFormData => ({
            ...prevFormData,
            smallImage: uploadedFileData[0]?.url,
          }));
           setSmallImageName(uploadedFileData[0]?.name);
       
          break;
         
        case "thumbnail":
       
          setFormData(prevFormData => ({
            ...prevFormData,
            thumbnail: uploadedFileData[0]?.url,
          }));
          setThumbnailName(uploadedFileData[0]?.name);
          break;
      }
    }
  }, [isFileUploading]);
  const onChangeFormData = (data) => {
    const { name, value } = data.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleRemoveImage = (uploadingField) => {
    // setFormData({
    //   ...formData,
    //   [fieldName]: "", 
    // });
    console.log("upoading",uploadingField)
    switch (uploadingField) {
      case "smallImage":
        setFormData({
          ...formData,
          [uploadingField]: "",
        });
        setSmallImageName("");
        break;
        

      case "thumbnail":
        setFormData({
          ...formData,
          [uploadingField]:"",
        });
        setThumbnailName("");
        break;
    }
  };
  const handleTemplateBodyChange = (content,words) => {
    console.log("con", content);
    setFormData((prevData) => ({
      ...prevData,
      blog_Body: content,
      wordCount:words,
      readingTime: Math.ceil(words / 200)
    }));
  };
  const onChangeFormTagData = (newTags) => {
    setFormData({
      ...formData,
      selectedTag: newTags,
    });
  
    
  };
  const handleSubmit = () => {
    let newObj = {
      blog_Title: formData?.blog_Title,
      blog_Type: formData?.blog_Type,
      blog_Description: formData?.blog_Description,
      smallImage: formData?.smallImage,
      thumbnail: formData?.thumbnail,
      blog_Body: formData?.blog_Body,
      wordCount:formData?.wordCount,
      readingTime:formData?.readingTime,
      selectedTag:formData?.selectedTag,
      id:blogId
    };
    console.log(newObj);

    console.log("Template edited!", newObj);
    onSubmit(newObj);
  };
useEffect(()=>{
  console.log("formdata",formData)
},[formData])
  return (
    <div className={`popupWrapper ${isActive && "active"}`}>
      <div className="popupContainer">
        <div className="popupHeader">
          <h4 className="popupHeading">Edit Blog Template</h4>
          <span className="close" onClick={onClickClosePopup}>
            <img src={close} alt="" />
          </span>
        </div>
        <div className="popupBody">
          <InputField
            name="blog_Title"
            className={"mb-20"}
            labelName={"Blog Title"}
            placeholder={"Enter Blog Title"}
            onChange={onChangeFormData}
            value={formData?.blog_Title}
          />
          <InputField
            name="blog_Type"
            className={"mb-20"}
            labelName={"Blog Type"}
            placeholder={"Enter Blog Type"}
            onChange={onChangeFormData}
            value={formData?.blog_Type}
          />
          <InputField
            name="blog_Description"
            className={"mb-20"}
            labelName={"Blog Description"}
            placeholder={"Enter Blog Description"}
            onChange={onChangeFormData}
            value={formData?.blog_Description}
          />
          <TagsInput
        // value={selectedTag}
        // onChange={setSelectedTag}
        name="tags"
        placeHolder="Enter Tags"
        onChange={onChangeFormTagData}
          
          value={formData?.selectedTag}
      /> 
      <div className="uploadField">
      {formData.smallImage !== null && formData.smallImage !== "" && (
      <div className="imgPreview">
        {formData.smallImage !== "" && <img src={formData.smallImage} alt="SmallImage" />}
   </div> )}
    <div className="customField">
          <CustomUploadBox
            spacing={"formFileUploads"}
            isimp={false}
            label={"Small Image"}
            onClickChooseFile={() => handleClick(SmallImageRef)}
            onChange={(e) => onClickUpload(e, "smallImage")}
            isUploading={isFileUploading && uploadingField == "smallImage"}
            fileName={SmallImageName}
            fileFor={"smallImage"}
            onRemoveImage={handleRemoveImage}
            fileUrl={formData?.smallImage || formData?.smallImage}
            acceptedFileTypes={".jpg ,.jpeg,.png"}
          />
          </div>
          </div>
          <div className="uploadField">
          {formData.thumbnail !== null && formData.thumbnail !== "" && (
      <div className="imgPreview">
        {formData.thumbnail !== "" && <img src={formData.thumbnail} alt="thumbnail" />}
      </div> )}
<div className="customField">
          <CustomUploadBox
            spacing={"formFileUploads"}
            isimp={false}
            label={"Thumbnail Image"}
            onClickChooseFile={() => handleClick(ThumbnailRef)}
            onChange={(e) => onClickUpload(e, "thumbnail")}
            isUploading={isFileUploading && uploadingField == "thumbnail"}
            fileName={thumbnailName}
            fileFor={"thumbnail"}
            onRemoveImage={handleRemoveImage}
            fileUrl={formData?.thumbnail || formData?.thumbnail}
            acceptedFileTypes={".jpg ,.jpeg,.png"}
          />
          </div>
          </div>
          <TinyEditor
            onChange={handleTemplateBodyChange}
            initialValue={formData?.blog_Body}
          />
          {/* <div className='formGroups'>
            <label htmlFor=''>
              Template Body
              <span className='impRed'> *</span>
            </label>
          </div> */}
        </div>
        <div className="popupFooter">
          <div className="buttonWrapper">
            <Button
              onClick={onClickClosePopup}
              className={"GreyFillButton"}
              name={"Cancel"}
            />
            <Button
              className={"BlueFillButton"}
              name={"Submit"}
              onClick={handleSubmit}
                isWaiting={isEditTemplatePopupFetching}
                disabled={isEditTemplatePopupFetching}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogPopup;
