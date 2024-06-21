import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./SideMenuStyle.css";
import logo from "../../../assets/img/logo.png";
import Cookies from "js-cookie";
import { logout } from "../../../redux/authentication/authSlice";
import LogoutPopup from "../../../Components/Popups/LogoutPopup/LogoutPopup";
import { useEffect, useState } from "react";
import hambar from '../../../assets/svg/hambar.svg'
import { Tooltip as ReactTooltip } from "react-tooltip";

const MainSideMenu = ({ menuItems }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [popupState, setPopupState] = useState(false);
  const [allowLogout, setAllowLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const [menuActive, setMenuActive] = useState(false)
  console.log("menuOpen: ",menuOpen);
  useEffect(() => {
    const handleLogout = () => {
      // Get an array of all cookie names
      var allCookies = Object.keys(Cookies.get());

      // Loop through the cookie names and remove each cookie
      allCookies.forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
      dispatch(logout());
      navigate("/login");
    };
    if (allowLogout) {
      handleLogout();
    }
  }, [allowLogout]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if(!menuOpen){
      setMenuActive(true);
    }
  };

  const toggleSubMenu = () => {
    setMenuActive(false);
    setMenuOpen(false)
  };

  return (
    <>
      <LogoutPopup
        showActive={popupState}
        message={"Are you sure you want to logout Dinero?"}
        onCancel={setPopupState}
        onAllow={setAllowLogout}
      />

      <div className={`sideMenu fixedMenu ${menuActive && 'active'}`}>
        <span className="menuOverlay" onClick={()=> toggleSubMenu()}></span>
        {/* <div
          className="sideLogo"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={logo} alt="" />
        </div> */}
        <div className={`scrollFix ${menuActive && 'current'}`}>
          <div className={`sidemenuWrap expenseMenu flexbox`}>

            <ul className="sideMenuListUl fixedTop">
              <li className={`SidemenuList hamburger`} onClick={()=> setMenuActive(!menuActive)}>
                <img src={hambar} alt="" />
              </li>
            </ul>

            <ul className="sideMenuListUl">

              {menuItems.map((menuItem, index) => (
                <React.Fragment key={index}>
                  <li className={`SidemenuList ${window.location.pathname === menuItem.path && "active"} ${menuItem.label == 'Interviewer' && 'interviewList'} ${menuOpen && menuItem.label == 'Interviewer' && 'active'}`}
                  onClick={() => {
                    navigate(menuItem.path); 
                    setMenuActive(false);
                    if(menuItem.label == 'Interviewer') {
                      //  toggle the sub menu of interviewer
                      toggleMenu();
                    }
                  }}
                  onMouseEnter={() => {
                    (menuItem.label == 'Interviewer' && !menuActive) && setMenuOpen(true);
                  }} 
                  onMouseLeave={() =>{
                    !menuActive && setMenuOpen(false)
                  }
                  }
                  data-tooltip-id={menuItem.label !== 'Interviewer' && `my-tooltip-${index}`}>
                    {menuItem.icon}
                    {menuItem.label && <span>{menuItem.label}
                    {menuItem.subMenu && menuItem.subMenu.length > 0 && (
                      <span className="iconToggler flexbox" onClick={toggleMenu}>
                        {/* Interviewer */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 7 14"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 0.999999L5.59317 5.93939C6.13561 6.52273 6.13561 7.47727 5.59317 8.06061L1 13"
                            stroke="#525252"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                    </span>}
                    {
                      !menuActive && <ReactTooltip
                        id={`my-tooltip-${index}`}
                        place="right"
                        content={menuItem.label}
                      />
                    }
                    {
                    !menuActive &&
                    menuItem.subMenu && menuItem.subMenu.length > 0 && (
                      <div className={`smallSubmenu ${menuOpen ? "current" : ""} ${menuItem.label == 'Interviewer' && 'flotingMenu'}`}>
                        {menuItem.subMenu.slice(0,3).map((item) => (
                          <li
                            key={item.id}
                            className={`SidemenuList ${window.location.pathname === item.subPath && "active"
                              } `}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(item.subPath);
                              setMenuActive(false);
                            }}
                          >
                            {item.subIcon}
                            <span>{item.subName}</span>
                            {/* {
                      !menuActive && <ReactTooltip
                        subName={`my-tooltip-${item.id}`}
                        place="right"
                        content={item.subName}
                      />
                    } */}
                          </li>
                        ))}
                      </div>
                    )
                  }
                  </li>
                  {
                    menuActive &&
                    menuItem.subMenu && menuItem.subMenu.length > 0 && (
                      <div className={`smallSubmenu ${menuOpen ? "current" : ""}`}>
                        {menuItem.subMenu.map((item) => (
                          <li
                            key={item.id}
                            className={`SidemenuList ${window.location.pathname === item.subPath && "active"
                              } `}
                            onClick={() => {
                              navigate(item.subPath);
                              toggleSubMenu();
                            }}
                            data-tooltip-id={`my-tooltip-${item.id}`}
                            data-tooltip-content={item.subName}

                          >
                            {item.subIcon}
                            <span>{item.subName}</span>
                            {/* {
                      !menuActive && <ReactTooltip
                        subName={`my-tooltip-${item.id}`}
                        place="right"
                        content={item.subName}
                      />
                    } */}
                          </li>
                        ))}
                      </div>
                    )
                  }
                </React.Fragment>
              ))}
            </ul>

            <ul className="sideMenuListUl bottomMenu">
              <li
                className="SidemenuList logout"
                onClick={() => setPopupState(true)}
                data-tooltip-id={`my-tooltip-${'logout'}`}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.6264 9.74647L11.2733 9.39336L11.6264 9.74647Z"
                    fill="#E53935"
                    stroke="#E53935"
                  />
                  <mask id="path-2-inside-1_1694_2173" fill="white">
                    <path d="M13.2867 8.53998H6.50671C6.23338 8.53998 6.00671 8.31331 6.00671 8.03998C6.00671 7.76664 6.23338 7.53998 6.50671 7.53998H13.2867C13.56 7.53998 13.7867 7.76664 13.7867 8.03998C13.7867 8.31331 13.56 8.53998 13.2867 8.53998Z" />
                  </mask>
                  <path
                    d="M13.2867 8.53998H6.50671C6.23338 8.53998 6.00671 8.31331 6.00671 8.03998C6.00671 7.76664 6.23338 7.53998 6.50671 7.53998H13.2867C13.56 7.53998 13.7867 7.76664 13.7867 8.03998C13.7867 8.31331 13.56 8.53998 13.2867 8.53998Z"
                    fill="#E53935"
                  />
                  <path
                    d="M13.2867 7.53998H6.50671V9.53998H13.2867V7.53998ZM6.50671 7.53998C6.78566 7.53998 7.00671 7.76103 7.00671 8.03998H5.00671C5.00671 8.8656 5.6811 9.53998 6.50671 9.53998V7.53998ZM7.00671 8.03998C7.00671 8.31893 6.78566 8.53998 6.50671 8.53998V6.53998C5.6811 6.53998 5.00671 7.21436 5.00671 8.03998H7.00671ZM6.50671 8.53998H13.2867V6.53998H6.50671V8.53998ZM13.2867 8.53998C13.0078 8.53998 12.7867 8.31893 12.7867 8.03998H14.7867C14.7867 7.21436 14.1123 6.53998 13.2867 6.53998V8.53998ZM12.7867 8.03998C12.7867 7.76103 13.0078 7.53998 13.2867 7.53998V9.53998C14.1123 9.53998 14.7867 8.8656 14.7867 8.03998H12.7867Z"
                    fill="#E53935"
                    mask="url(#path-2-inside-1_1694_2173)"
                  />
                  <path
                    d="M7.84005 13.8334C4.40671 13.8334 2.00671 11.4334 2.00671 8.00002C2.00671 4.56669 4.40671 2.16669 7.84005 2.16669C8.11338 2.16669 8.34005 2.39335 8.34005 2.66669C8.34005 2.94002 8.11338 3.16669 7.84005 3.16669C4.99338 3.16669 3.00671 5.15335 3.00671 8.00002C3.00671 10.8467 4.99338 12.8334 7.84005 12.8334C8.11338 12.8334 8.34005 13.06 8.34005 13.3334C8.34005 13.6067 8.11338 13.8334 7.84005 13.8334Z"
                    fill="#E53935"
                  />
                </svg>
                { menuActive && <>Logout</>}
                {
                      !menuActive && <ReactTooltip
                        id={`my-tooltip-${'logout'}`}
                        place="right"
                        content={"Logout"}
                      />
                    }
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSideMenu;
