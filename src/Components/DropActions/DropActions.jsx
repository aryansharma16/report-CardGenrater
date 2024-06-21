import React from "react";
import "./DropActionsStyle.css";
import Redtrash from "../../assets/svg/Redtrash.svg";
import Edit from "../../assets/svg/edit.png";
import Image from "../Image/Image";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

const DropActions = ({
  isActive,
  dropActionOptions,
  onDelteAction,
  onEditAction,
  userId,
  icon,
}) => {

  const [isDropAction, setIsDropAction] = useState(isActive);
  const dropActionsRef = useRef(null);

  
  useEffect(() => {
    setIsDropAction(isActive);
  }, [isActive]);

  // Function to handle clicks outside of the component
  const handleClickOutside = (event) => {
    if (dropActionsRef.current && !dropActionsRef.current.contains(event.target)) {
      setIsDropAction(false);
      // onClose(); // Call the onClose function to notify the parent component
    }
  };

  useEffect(() => {
    if (isDropAction) {
      // Add event listener when component is active
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when component is not active
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropAction]);



  return (
    <div ref={dropActionsRef} className={isDropAction ? "dropActionWrap active" : "dropActionWrap"}>
      <div className="dropActionMenu">
        {dropActionOptions?.length > 0 &&
          dropActionOptions.map((action, i) => (
            <div className="actionList flexbox" onClick={() => {
              action?.onClick();
              setIsDropAction(false);
              // onClose(); // Close the component when an action is clicked
            }} key={i}>
              <img src={action?.icon ??  Edit} alt="" />
              {/* <img src={icon ? <Image name={icon} /> : Edit} alt="" /> */}
              {action?.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropActions;

// return (
//   <div className={isActive ? "dropActionWrap active" : "dropActionWrap"}>
//     <div className="dropActionMenu">
//       <div
//         className="actionList flexbox"
//         onClick={() => onDelteAction(userId)}
//       >
//         <img src={Redtrash} alt="" />
//         {"Delete User"}
//       </div>
//       <div
//         className="actionList flexbox"
//         onClick={() => onEditAction(userId)}
//       >
//         <img src={Edit} alt="" />
//         {"Edit User"}
//       </div>
//     </div>
//   </div>
// );
// };
