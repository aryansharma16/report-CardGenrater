import React, { useState, useEffect } from "react";
import "./NotificationMenuStyle.css";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";
import Button from "../../../Components/Button/Button";
import { useSelector, useDispatch } from "react-redux";
import LogoutPopup from "../../../Components/Popups/LogoutPopup/LogoutPopup";
const NotificationMenu = () => {

  const roles = Cookies.get("roles");
  const [isAdmin, setIsAdmin] = useState(false);
  const loginData = Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : "";
  const location = useLocation();
  const defaultRoute = "/";
  const isDefaultRoute = location.pathname === defaultRoute;
  const dispatch = useDispatch();
  const [saveDraft, setSaveDraft] = useState(false);
  useEffect(() => {
    if (roles) {
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("Admin"));
    }
  }, [roles]);

 

  return (
    <>
      <div className="notificationWrap">
        <div className="welcomeText">
          Welcome {loginData?.Data?.name ?? ""} !
        </div>
        {/* <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="32" height="32" rx="16" fill="#F5F5F5" />
        <path
          d="M16.0175 8.42578C13.2591 8.42578 11.0175 10.6674 11.0175 13.4258V15.8341C11.0175 16.3424 10.8008 17.1174 10.5425 17.5508L9.58414 19.1424C8.99247 20.1258 9.40081 21.2174 10.4841 21.5841C14.0758 22.7841 17.9508 22.7841 21.5425 21.5841C22.5508 21.2508 22.9925 20.0591 22.4425 19.1424L21.4841 17.5508C21.2341 17.1174 21.0175 16.3424 21.0175 15.8341V13.4258C21.0175 10.6758 18.7675 8.42578 16.0175 8.42578Z"
          stroke="#292D32"
          stroke-miterlimit="10"
          stroke-linecap="round"
        />
        <path
          d="M17.5599 8.66719C17.3016 8.59219 17.0349 8.53385 16.7599 8.50052C15.9599 8.40052 15.1932 8.45885 14.4766 8.66719C14.7182 8.05052 15.3182 7.61719 16.0182 7.61719C16.7182 7.61719 17.3182 8.05052 17.5599 8.66719Z"
          stroke="#292D32"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M18.5156 21.8828C18.5156 23.2578 17.3906 24.3828 16.0156 24.3828C15.3323 24.3828 14.699 24.0995 14.249 23.6495C13.799 23.1995 13.5156 22.5661 13.5156 21.8828"
          stroke="#292D32"
          stroke-miterlimit="10"
        />
      </svg> */}
        {isDefaultRoute && isAdmin && <div></div>}
        {/* {location.pathname == "/adstracker" &&
      <Button onClick={()=>setCreateAdsPopup(true)}  className={"BlueFillButton"}  src={"https://cdn.mastersunion.org/assets/dinero/add.svg"}
      name={"Add Ads"}/>
      } */}
        {location.pathname == "/create-blog" && (
          <Button
            className={"BlueFillButton"}
            name={"Save As Draft"}
          />
        )}
      </div>
    </>
  );
};

export default NotificationMenu;
