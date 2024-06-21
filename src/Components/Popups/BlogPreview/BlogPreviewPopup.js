import React, { useState, useRef } from 'react'

import "./BlogPreviewPopup.css"
import close from '../../../assets/svg/close.svg'

import { useEffect } from 'react'


const BlogPreview = ({
  isActive,

  onClickClosePopup,
  blogId,
  blogDetails,
}) => {
  console.log('tempID',  blogId,
  blogDetails,)

  const [formData, setFormData] = useState({
    blogName: '',
    blogBody: ''
  })
  useEffect(() => {
    if (blogDetails) {
      setFormData({
        blogName: blogDetails?.blog_Title,

        blogBody: blogDetails?.blog_Body,
    
      })
    }
  }, [blogDetails])

  return (
    <div className={`popupWrapper  ${isActive && 'active'}`}>
      <div className='popupContainer fullWidth'>
        <div className='popupHeader'>
          <h4 className='popupHeading'>{formData?.blogName}</h4>
          <span className='close' onClick={onClickClosePopup}>
            <img src={close} alt='' />
          </span>
        </div>
        <div className='popupBody'>
          <div 
            dangerouslySetInnerHTML={{ __html: formData?.blogBody }}
          />
        </div>
      </div>
    </div>
  )
}

export default BlogPreview
