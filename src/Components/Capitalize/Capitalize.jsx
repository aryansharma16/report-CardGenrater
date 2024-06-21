import React from 'react'

const Capitalize = ({ str }) => {
  const capitalizeFirstLetter = str => {
    // return (str.charAt(0).toUpperCase() + str.slice(1))
    return ( str
      .split(' ')
      .map(word => word.charAt(0)?.toUpperCase() + word.slice(1)?.toLowerCase())
      .join(' '))
  }
  return <>{!str ? "" : capitalizeFirstLetter(str)}</> 
} 

export default Capitalize;
