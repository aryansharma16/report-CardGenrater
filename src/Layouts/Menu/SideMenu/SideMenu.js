import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./SideMenuStyle.css";
import logo from "../../../assets/img/logo.png";
import Cookies from "js-cookie";

export const renderMenuItemsBasedOnPermissions = () => {
  // Replace this with your logic to determine the user's role

  // const rolesCookie = Cookies.get("roles");

  // const rolesArray = JSON.parse(Cookies.get("roles"));
  // const userRole = rolesArray; // Example roles (array of roles)
  const cookieData = Cookies.get("myCookie");
  const rolesArray = cookieData ? JSON.parse(cookieData) : [];

  console.log("cookieData", rolesArray);
  if (Array.isArray(rolesArray)) {
    // Extract the permissions from the cookieData array
    const allPermissions = rolesArray.reduce((acc, role) => {
      return [...acc, ...role.module];
    }, []);

    // Remove duplicate permissions using a Set
    const uniquePermissions = Array.from(
      new Set(allPermissions.map(JSON.stringify))
    ).map(JSON.parse);

    return uniquePermissions;
  } else {
    console.error("cookieData is not an array");
  }
};


const SideMenu = ({ setBreadCrumbs, programMasterId, programBatchId }) => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    var permissionArray = renderMenuItemsBasedOnPermissions() ?? [];

    setPermissions(permissionArray);
  }, []);


  const navigate = useNavigate();
  const location = useLocation();

  const hasPermission = (permission) => {
    // return permissions.some((p) => p?.moduleName === permission);
    return true
  };

  const [rolesArray1, setRolesArray] = useState([]);
    
  useEffect(() => {
      setRolesArray(Cookies.get("roles") ? JSON.parse(Cookies.get("roles")): []) ;
  },[]);

  return (
    <div className="sideMenu">
      <div
        className="sideLogo"
        onClick={() => {
          navigate("/");
        }}
      >
        <img src={logo} alt="" />
      </div>
      <ul className="sideMenuListWrap">
      <li
          className={`SidemenuList ${
            location.pathname === "/revenue/leads" && "active"
          }`}
          onClick={() => {
            navigate(
              `/revenue/leads?cohortId=${programBatchId}&programMasterId=${programMasterId}`
            );
            setBreadCrumbs("Leads");
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 14C15.8409 14 17.3333 12.5076 17.3333 10.6666C17.3333 8.8257 15.8409 7.33331 14 7.33331C12.159 7.33331 10.6666 8.8257 10.6666 10.6666C10.6666 12.5076 12.159 14 14 14Z"
              stroke="#A3A3A3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19.7266 20.6667C19.7266 18.0867 17.16 16 14 16C10.84 16 8.27332 18.0867 8.27332 20.6667"
              stroke="#A3A3A3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Leads
        </li>
        {hasPermission("Applicant List") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Applicant List");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 14C15.8409 14 17.3333 12.5076 17.3333 10.6666C17.3333 8.8257 15.8409 7.33331 14 7.33331C12.159 7.33331 10.6666 8.8257 10.6666 10.6666C10.6666 12.5076 12.159 14 14 14Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.7266 20.6667C19.7266 18.0867 17.16 16 14 16C10.84 16 8.27332 18.0867 8.27332 20.6667"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Applicants list
          </li>
        )}
        
        
        {/* NOT TBM only */}
        {hasPermission("Approval Request") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/approvalRequest" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/approvalRequest?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Approval Request");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1067 13.2466C12.04 13.24 11.96 13.24 11.8867 13.2466C10.3 13.1933 9.04004 11.8933 9.04004 10.2933C9.04004 8.65998 10.36 7.33331 12 7.33331C13.6334 7.33331 14.96 8.65998 14.96 10.2933C14.9534 11.8933 13.6934 13.1933 12.1067 13.2466Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9401 8.66669C18.2334 8.66669 19.2734 9.71335 19.2734 11C19.2734 12.26 18.2734 13.2867 17.0267 13.3334C16.9734 13.3267 16.9134 13.3267 16.8534 13.3334"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.77335 15.7067C7.16002 16.7867 7.16002 18.5467 8.77335 19.62C10.6067 20.8467 13.6134 20.8467 15.4467 19.62C17.06 18.54 17.06 16.78 15.4467 15.7067C13.62 14.4867 10.6134 14.4867 8.77335 15.7067Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.2267 19.3333C18.7067 19.2333 19.16 19.04 19.5334 18.7533C20.5734 17.9733 20.5734 16.6866 19.5334 15.9066C19.1667 15.6266 18.72 15.44 18.2467 15.3333"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Approval Request
          </li>
        )}
        {/* TBM only */}
        {false && programMasterId=="53e08f7a-a03b-42f3-b181-064d1afc05e3" && hasPermission("Scholarship Email") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/scholarshipEmail" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/scholarshipEmail?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Scholarship Email");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1067 13.2466C12.04 13.24 11.96 13.24 11.8867 13.2466C10.3 13.1933 9.04004 11.8933 9.04004 10.2933C9.04004 8.65998 10.36 7.33331 12 7.33331C13.6334 7.33331 14.96 8.65998 14.96 10.2933C14.9534 11.8933 13.6934 13.1933 12.1067 13.2466Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9401 8.66669C18.2334 8.66669 19.2734 9.71335 19.2734 11C19.2734 12.26 18.2734 13.2867 17.0267 13.3334C16.9734 13.3267 16.9134 13.3267 16.8534 13.3334"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.77335 15.7067C7.16002 16.7867 7.16002 18.5467 8.77335 19.62C10.6067 20.8467 13.6134 20.8467 15.4467 19.62C17.06 18.54 17.06 16.78 15.4467 15.7067C13.62 14.4867 10.6134 14.4867 8.77335 15.7067Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.2267 19.3333C18.7067 19.2333 19.16 19.04 19.5334 18.7533C20.5734 17.9733 20.5734 16.6866 19.5334 15.9066C19.1667 15.6266 18.72 15.44 18.2467 15.3333"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Scholarship Email
          </li>
        )}

        {/* {hasPermission("Refund_Request") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/refundRequest" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/refundRequest?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Refund Request");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1067 13.2466C12.04 13.24 11.96 13.24 11.8867 13.2466C10.3 13.1933 9.04004 11.8933 9.04004 10.2933C9.04004 8.65998 10.36 7.33331 12 7.33331C13.6334 7.33331 14.96 8.65998 14.96 10.2933C14.9534 11.8933 13.6934 13.1933 12.1067 13.2466Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9401 8.66669C18.2334 8.66669 19.2734 9.71335 19.2734 11C19.2734 12.26 18.2734 13.2867 17.0267 13.3334C16.9734 13.3267 16.9134 13.3267 16.8534 13.3334"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.77335 15.7067C7.16002 16.7867 7.16002 18.5467 8.77335 19.62C10.6067 20.8467 13.6134 20.8467 15.4467 19.62C17.06 18.54 17.06 16.78 15.4467 15.7067C13.62 14.4867 10.6134 14.4867 8.77335 15.7067Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.2267 19.3333C18.7067 19.2333 19.16 19.04 19.5334 18.7533C20.5734 17.9733 20.5734 16.6866 19.5334 15.9066C19.1667 15.6266 18.72 15.44 18.2467 15.3333"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Refund Request
          </li>
        )} */}

        {hasPermission("Waitlist/Rejection Mail") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/sendOfferLetter" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/sendOfferLetter?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Send Offer Letters");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.6667 9.99998H15.3334C16.6667 9.99998 16.6667 9.33331 16.6667 8.66665C16.6667 7.33331 16 7.33331 15.3334 7.33331H12.6667C12 7.33331 11.3334 7.33331 11.3334 8.66665C11.3334 9.99998 12 9.99998 12.6667 9.99998Z"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15.3333 20.6667H12C8.66667 20.6667 8 19.3333 8 16.6667V12.6667C8 9.62666 9.11333 8.79999 11.3333 8.67999"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.6666 8.67999C18.8866 8.79999 20 9.61999 20 12.6667V16"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20 18.6667V20.6667H18"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16 16.6667L19.9733 20.64"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Send Offer Letters
          </li>
        )}
        {/* TBM only */}

{(programMasterId=="53e08f7a-a03b-42f3-b181-064d1afc05e3" || programMasterId=="53e08f7a-a03b-42f3-b181-064d1afc0512") && hasPermission("Waitlist/Rejection Mail") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/waitlistRejectionMail" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/waitlistRejectionMail?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Waitlist/Rejection Mail");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.1067 13.2466C12.04 13.24 11.96 13.24 11.8867 13.2466C10.3 13.1933 9.04004 11.8933 9.04004 10.2933C9.04004 8.65998 10.36 7.33331 12 7.33331C13.6334 7.33331 14.96 8.65998 14.96 10.2933C14.9534 11.8933 13.6934 13.1933 12.1067 13.2466Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9401 8.66669C18.2334 8.66669 19.2734 9.71335 19.2734 11C19.2734 12.26 18.2734 13.2867 17.0267 13.3334C16.9734 13.3267 16.9134 13.3267 16.8534 13.3334"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8.77335 15.7067C7.16002 16.7867 7.16002 18.5467 8.77335 19.62C10.6067 20.8467 13.6134 20.8467 15.4467 19.62C17.06 18.54 17.06 16.78 15.4467 15.7067C13.62 14.4867 10.6134 14.4867 8.77335 15.7067Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18.2267 19.3333C18.7067 19.2333 19.16 19.04 19.5334 18.7533C20.5734 17.9733 20.5734 16.6866 19.5334 15.9066C19.1667 15.6266 18.72 15.44 18.2467 15.3333"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Waitlist/Rejection Mail
          </li>
        )}

        {hasPermission("Offer letter list") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/offerLetter" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/offerLetter?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Offer Letters");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 10.6667V17.3334C20 19.3334 19 20.6667 16.6667 20.6667H11.3333C9 20.6667 8 19.3334 8 17.3334V10.6667C8 8.66671 9 7.33337 11.3333 7.33337H16.6667C19 7.33337 20 8.66671 20 10.6667Z"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.3333 7.33337V12.5734C16.3333 12.8667 15.9866 13.0134 15.7733 12.82L14.2266 11.3934C14.1 11.2734 13.8999 11.2734 13.7733 11.3934L12.2266 12.82C12.0133 13.0134 11.6666 12.8667 11.6666 12.5734V7.33337H16.3333Z"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.8334 15.3334H17.6667"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 18H17.6667"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Offer Letters
          </li>
        )}

        {hasPermission("Send welcome letter") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/sendWelcomeLetter" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/sendWelcomeLetter?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Send Welcome Letters");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3333 7.33337C16.6666 7.33337 17.3333 8.00671 17.3333 9.35337V14.0534C17.3333 15.38 16.3933 15.8934 15.24 15.2L14.36 14.6667C14.16 14.5467 13.84 14.5467 13.64 14.6667L12.76 15.2C11.6066 15.8934 10.6666 15.38 10.6666 14.0534V9.35337C10.6666 8.00671 11.3333 7.33337 12.6666 7.33337H15.3333Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5467 9.32664C8.27337 9.70664 7.33337 11.1066 7.33337 13.9333V15.9533C7.33337 19.32 8.66671 20.6666 12 20.6666H16C19.3334 20.6666 20.6667 19.32 20.6667 15.9533V13.9333C20.6667 11.06 19.6934 9.65331 17.3334 9.30664"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Send Welcome Letters
          </li>
        )}

        {hasPermission("Send orientation mail") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/sendOrientationMail" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/sendOrientationMail?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Send Orientation Mail");
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.6667 12.9999V16.3333C20.6667 18.6666 19.3334 19.6666 17.3334 19.6666H10.6667C8.66671 19.6666 7.33337 18.6666 7.33337 16.3333V11.6666C7.33337 9.33325 8.66671 8.33325 10.6667 8.33325H15.3334" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.6666 12L12.7533 13.6667C13.44 14.2133 14.5666 14.2133 15.2533 13.6667L16.04 13.04" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19 11.3333C19.9205 11.3333 20.6667 10.5871 20.6667 9.66667C20.6667 8.74619 19.9205 8 19 8C18.0796 8 17.3334 8.74619 17.3334 9.66667C17.3334 10.5871 18.0796 11.3333 19 11.3333Z" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Send Orientation Mail
          </li>
        )}
                {hasPermission("Send welcome letter") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/sendCollectionMail" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/sendCollectionMail?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Send Collection Mail");
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.3334 19.6667H10.6667C8.66671 19.6667 7.33337 18.6667 7.33337 16.3334V11.6667C7.33337 9.33337 8.66671 8.33337 10.6667 8.33337H17.3334C19.3334 8.33337 20.6667 9.33337 20.6667 11.6667V16.3334C20.6667 18.6667 19.3334 19.6667 17.3334 19.6667Z" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M17.3333 12L15.2466 13.6667C14.56 14.2133 13.4333 14.2133 12.7466 13.6667L10.6666 12" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Send Collection Mail
          </li>
        )}

        {/* <li
          className={`SidemenuList ${
            location.pathname === "/revenue/cohortStatics" && "active"
          }`}
          onClick={() => {
            navigate(
              `/revenue/cohortStatics?cohortId=${programBatchId}&programMasterId=${programMasterId}`
            );
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.33333 7.33337V18.6667C7.33333 19.7734 8.22666 20.6667 9.33333 20.6667H20.6667"
              stroke="#A3A3A3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9.33333 17.3333L12.3933 13.76C12.9 13.1733 13.8 13.1333 14.3467 13.6866L14.98 14.32C15.5267 14.8666 16.4267 14.8333 16.9333 14.2466L20 10.6666"
              stroke="#A3A3A3"
              stroke-miterlimit="10"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Cohort Statistics
        </li> */}

        {hasPermission("Fee summary") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/feeSummary" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/feeSummary?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );

              setBreadCrumbs("Fee Summary");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6667 14V17.3333C20.6667 19.3333 19.3334 20.6666 17.3334 20.6666H10.6667C8.66671 20.6666 7.33337 19.3333 7.33337 17.3333V14C7.33337 12.1866 8.42671 10.92 10.1267 10.7066C10.3 10.68 10.48 10.6666 10.6667 10.6666H17.3334C17.5067 10.6666 17.6734 10.6733 17.8334 10.7C19.5534 10.9 20.6667 12.1733 20.6667 14Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.8342 10.7C17.6742 10.6734 17.5076 10.6667 17.3342 10.6667H10.6676C10.4809 10.6667 10.3009 10.68 10.1276 10.7067C10.2209 10.52 10.3542 10.3467 10.5142 10.1867L12.6809 8.01337C13.5942 7.10671 15.0742 7.10671 15.9876 8.01337L17.1542 9.19339C17.5809 9.61339 17.8076 10.1467 17.8342 10.7Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.6667 14.3334H18.6667C17.9334 14.3334 17.3334 14.9334 17.3334 15.6667C17.3334 16.4 17.9334 17 18.6667 17H20.6667"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Fee Summary
          </li>
        )}

        {hasPermission("Program Summary") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/programSummary" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/programSummary?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Program Summary");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5867 18.1V16.72"
                stroke="#A3A3A3"
                stroke-linecap="round"
              />
              <path
                d="M14 18.1V15.34"
                stroke="#A3A3A3"
                stroke-linecap="round"
              />
              <path
                d="M17.4133 18.1V13.9534"
                stroke="#A3A3A3"
                stroke-linecap="round"
              />
              <path
                d="M17.4133 9.90002L17.1067 10.26C15.4067 12.2467 13.1267 13.6534 10.5867 14.2867"
                stroke="#A3A3A3"
                stroke-linecap="round"
              />
              <path
                d="M15.46 9.90002H17.4133V11.8467"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 20.6667H16C19.3334 20.6667 20.6667 19.3334 20.6667 16V12C20.6667 8.66671 19.3334 7.33337 16 7.33337H12C8.66671 7.33337 7.33337 8.66671 7.33337 12V16C7.33337 19.3334 8.66671 20.6667 12 20.6667Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Program Summary
          </li>
        )}

        {hasPermission("Counsellor Report") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/counsellorReport" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/counsellorReport?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Counsellor Report");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.6667 12.6667V16C20.6667 19.3334 19.3334 20.6667 16 20.6667H12C8.66671 20.6667 7.33337 19.3334 7.33337 16V12C7.33337 8.66671 8.66671 7.33337 12 7.33337H15.3334"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.6667 12.6667H18C16 12.6667 15.3334 12 15.3334 10V7.33337L20.6667 12.6667Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6666 14.6666H14.6666"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.6666 17.3334H13.3333"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Counsellor Report
          </li>
        )}
        {hasPermission("Interviewer report") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/interviewReport" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/interviewReport?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.3334 19.6667H10.6667C8.66671 19.6667 7.33337 18.6667 7.33337 16.3334V11.6667C7.33337 9.33337 8.66671 8.33337 10.6667 8.33337H17.3334C19.3334 8.33337 20.6667 9.33337 20.6667 11.6667V16.3334C20.6667 18.6667 19.3334 19.6667 17.3334 19.6667Z"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M17.3333 12L15.2466 13.6667C14.56 14.2133 13.4333 14.2133 12.7466 13.6667L10.6666 12"
                stroke="#A3A3A3"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Interviewer Report
          </li>
        )}

        {hasPermission("Fee Details") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/feeDetail" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/feeDetail?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Fee Details");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 7.33337H16C19.3334 7.33337 20.6667 8.66671 20.6667 12V16C20.6667 19.3334 19.3334 20.6667 16 20.6667H12C8.66671 20.6667 7.33337 19.3334 7.33337 16V12C7.33337 8.66671 8.66671 7.33337 12 7.33337Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.7134 16.1801L16.0734 11.8201"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.9866 12.9133C12.4395 12.9133 12.8066 12.5462 12.8066 12.0933C12.8066 11.6404 12.4395 11.2733 11.9866 11.2733C11.5338 11.2733 11.1666 11.6404 11.1666 12.0933C11.1666 12.5462 11.5338 12.9133 11.9866 12.9133Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.3467 16.7267C16.7996 16.7267 17.1667 16.3595 17.1667 15.9067C17.1667 15.4538 16.7996 15.0867 16.3467 15.0867C15.8938 15.0867 15.5267 15.4538 15.5267 15.9067C15.5267 16.3595 15.8938 16.7267 16.3467 16.7267Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Fee Details
          </li>
        )}

        {hasPermission("Student list") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/studentList" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/studentList?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Student List");
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3334 14.1333H16" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11.3334 16.8H14.2534" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.6667 10H15.3334C16.6667 10 16.6667 9.33337 16.6667 8.66671C16.6667 7.33337 16 7.33337 15.3334 7.33337H12.6667C12 7.33337 11.3334 7.33337 11.3334 8.66671C11.3334 10 12 10 12.6667 10Z" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.6667 8.68005C18.8867 8.80005 20 9.62005 20 12.6667V16.6667C20 19.3334 19.3333 20.6667 16 20.6667H12C8.66667 20.6667 8 19.3334 8 16.6667V12.6667C8 9.62672 9.11333 8.80005 11.3333 8.68005" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Student List
          </li>
        )}

        {/* {hasPermission("Cohort Statistics") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/cohortStatics" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/cohortStatics?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Cohort Statistics");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3333 7.33337C16.6666 7.33337 17.3333 8.00671 17.3333 9.35337V14.0534C17.3333 15.38 16.3933 15.8934 15.24 15.2L14.36 14.6667C14.16 14.5467 13.84 14.5467 13.64 14.6667L12.76 15.2C11.6066 15.8934 10.6666 15.38 10.6666 14.0534V9.35337C10.6666 8.00671 11.3333 7.33337 12.6666 7.33337H15.3333Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5467 9.32664C8.27337 9.70664 7.33337 11.1066 7.33337 13.9333V15.9533C7.33337 19.32 8.66671 20.6666 12 20.6666H16C19.3334 20.6666 20.6667 19.32 20.6667 15.9533V13.9333C20.6667 11.06 19.6934 9.65331 17.3334 9.30664"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Cohort Statistics
          </li>
        )} */}
        {hasPermission("Loan request") && (
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/loanRequest" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/loanRequest?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Loan Request");
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5078 16.2924H12.1744" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13.8412 14.6654V17.9987" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M14.44 7.6788L14.42 7.72546L12.4866 12.2121H10.5866C10.1333 12.2121 9.69997 12.3055 9.30664 12.4721L10.4733 9.68546L10.5 9.6188L10.5466 9.51213C10.56 9.47213 10.5733 9.43213 10.5933 9.3988C11.4666 7.3788 12.4533 6.9188 14.44 7.6788Z" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M18.0334 12.3454C17.7334 12.252 17.4134 12.212 17.0934 12.212H12.4867L14.42 7.72538L14.44 7.67871C14.54 7.71204 14.6334 7.75871 14.7334 7.79871L16.2067 8.41871C17.0267 8.75871 17.6 9.11204 17.9467 9.53871C18.0134 9.61871 18.0667 9.69204 18.1134 9.77871C18.1734 9.87204 18.22 9.96538 18.2467 10.0654C18.2734 10.1254 18.2934 10.1854 18.3067 10.2387C18.4867 10.7987 18.38 11.4854 18.0334 12.3454Z" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.3479 15.4656V16.7656C20.3479 16.8989 20.3412 17.0323 20.3345 17.1656C20.2079 19.4923 18.9079 20.6656 16.4412 20.6656H11.2412C11.0812 20.6656 10.9212 20.6523 10.7679 20.6323C8.64785 20.4923 7.51452 19.3589 7.37452 17.2389C7.35452 17.0856 7.34119 16.9256 7.34119 16.7656V15.4656C7.34119 14.1256 8.15452 12.9723 9.31452 12.4723C9.71452 12.3056 10.1412 12.2123 10.5945 12.2123H17.1012C17.4279 12.2123 17.7479 12.2589 18.0412 12.3456C19.3679 12.7523 20.3479 13.9923 20.3479 15.4656Z" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.4734 9.68542L9.30671 12.4721C8.14671 12.9721 7.33337 14.1254 7.33337 15.4654V13.5121C7.33337 11.6188 8.68004 10.0388 10.4734 9.68542Z" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.3457 13.5117V15.4651C20.3457 13.9984 19.3724 12.7517 18.0391 12.3517C18.3857 11.4851 18.4857 10.8051 18.3191 10.2384C18.3057 10.1784 18.2857 10.1184 18.2591 10.0651C19.4991 10.7051 20.3457 12.0184 20.3457 13.5117Z" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Loan Request
          </li>
        )}
        <li
            className={`SidemenuList ${
              location.pathname === "/revenue/adtracker" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/adtracker?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Ads Spent");
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.33337 11.6666H15.6667" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10 17H11.3333" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M13 17H15.6667" stroke="#A3A3A3" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M20.6667 15.3534V16.74C20.6667 19.08 20.0734 19.6667 17.7067 19.6667H10.2934C7.92671 19.6667 7.33337 19.08 7.33337 16.74V11.26C7.33337 8.92004 7.92671 8.33337 10.2934 8.33337H15.6667" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.3334 12.3334V8.33337L20.6667 9.66671" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M19.3333 8.33337L18 9.66671" stroke="#A3A3A3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            Ads Spent
          </li>
          <li
            className={`SidemenuList ${
              location.pathname === "/revenue/leaderboard" && "active"
            }`}
            onClick={() => {
              navigate(
                `/revenue/leaderboard?cohortId=${programBatchId}&programMasterId=${programMasterId}`
              );
              setBreadCrumbs("Leaderboard");
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.3333 7.33337C16.6666 7.33337 17.3333 8.00671 17.3333 9.35337V14.0534C17.3333 15.38 16.3933 15.8934 15.24 15.2L14.36 14.6667C14.16 14.5467 13.84 14.5467 13.64 14.6667L12.76 15.2C11.6066 15.8934 10.6666 15.38 10.6666 14.0534V9.35337C10.6666 8.00671 11.3333 7.33337 12.6666 7.33337H15.3333Z"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.5467 9.32664C8.27337 9.70664 7.33337 11.1066 7.33337 13.9333V15.9533C7.33337 19.32 8.66671 20.6666 12 20.6666H16C19.3334 20.6666 20.6667 19.32 20.6667 15.9533V13.9333C20.6667 11.06 19.6934 9.65331 17.3334 9.30664"
                stroke="#A3A3A3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Leaderboard
          </li>

          <li className={`SidemenuList ${location.pathname === "/revenue/teamManagement" && "active"}`}
            onClick={() => {
              navigate(`/revenue/teamManagement?cohortId=${programBatchId}&programMasterId=${programMasterId}`);
              setBreadCrumbs("Team Management");
            }}
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 10.7733C17.96 10.7666 17.9133 10.7666 17.8733 10.7733C16.9533 10.74 16.22 9.98665 16.22 9.05331C16.22 8.09998 16.9866 7.33331 17.94 7.33331C18.8933 7.33331 19.66 8.10665 19.66 9.05331C19.6533 9.98665 18.92 10.74 18 10.7733Z" stroke="#0052CC" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M17.3133 15.6266C18.2267 15.78 19.2333 15.62 19.94 15.1466C20.88 14.52 20.88 13.4933 19.94 12.8666C19.2267 12.3933 18.2067 12.2333 17.2933 12.3933" stroke="#0052CC" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9.97995 10.7733C10.0199 10.7666 10.0666 10.7666 10.1066 10.7733C11.0266 10.74 11.7599 9.98665 11.7599 9.05331C11.7599 8.09998 10.9933 7.33331 10.0399 7.33331C9.08661 7.33331 8.31995 8.10665 8.31995 9.05331C8.32661 9.98665 9.05995 10.74 9.97995 10.7733Z" stroke="#0052CC" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.6666 15.6266C9.75329 15.78 8.74663 15.62 8.03996 15.1466C7.09996 14.52 7.09996 13.4933 8.03996 12.8666C8.75329 12.3933 9.77329 12.2333 10.6866 12.3933" stroke="#0052CC" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14 15.7534C13.96 15.7467 13.9133 15.7467 13.8733 15.7534C12.9533 15.72 12.22 14.9667 12.22 14.0334C12.22 13.08 12.9866 12.3134 13.94 12.3134C14.8933 12.3134 15.66 13.0867 15.66 14.0334C15.6533 14.9667 14.92 15.7267 14 15.7534Z" stroke="#0052CC" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.06 17.8534C11.12 18.48 11.12 19.5067 12.06 20.1334C13.1266 20.8467 14.8733 20.8467 15.94 20.1334C16.88 19.5067 16.88 18.48 15.94 17.8534C14.88 17.1467 13.1266 17.1467 12.06 17.8534Z" stroke="#0052CC" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Team Management
          </li>
      </ul>
    </div>
  );
};

export default SideMenu;
