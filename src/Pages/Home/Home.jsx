import React, { useEffect, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    useEffect(()=>{
     navigate.push('all-cards')
    },[])
    return (
        <>
          Home
        </>
      );
}

export default Home