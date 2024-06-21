
import React, { useEffect } from 'react';

const GlobalKeyEvents = () => {
  const handleTabPrevention = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      console.log('Tab prevented globally');
      
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleTabPrevention);

    return () => {
      document.removeEventListener('keydown', handleTabPrevention);
    };
  }, []);

  return null; 
};

export default GlobalKeyEvents;
