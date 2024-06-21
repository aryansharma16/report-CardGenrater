import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

import Button from "../../Components/Button/Button";
import InputField from "../../Components/InputField/InputField";
import PageLoader from "../../Components/loaders/PageLoader/PageLoader";

import { clearAllSliceStates, loginUser, logout } from "../../redux/authentication/authSlice";
import "./LoginStyle.css";
import Cookies from "js-cookie";
import { useEffect } from "react";
import Image from "../../Components/Image/Image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const formObject = { email: "", password: "" };
  const [formData, setFormData] = useState(formObject);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const {
    isAuthSliceFetching,
    isAuthSliceSuccess,
    isAuthSliceError,
    authSliceErrorMessage,
  } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = Cookies.get("token");

  useEffect(() => {
    if (isAuthSliceSuccess) {
      dispatch(clearAllSliceStates())
      navigate("/", { replace: true });
    }
  }, [isAuthSliceSuccess]);

  useEffect(() => {
    //  Clears all the states in the redux store
    dispatch(logout())
    if(isAuthSliceError){
      errorToast()
    }
  }, [isAuthSliceError])

  /**Handling formData with single onChange */
  const onChangeFormData = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors({ email: "", password: "" });
  };

  const handleSignIn = () => {
    let newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    if (newErrors.email || newErrors.password) {
      setErrors(newErrors);
      return;
    }


    dispatch(loginUser(formData));
  };

  const [type, setType] = useState(true);

  const errorToast = () => {
    toast.error(authSliceErrorMessage, {
      // position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 1000, // Close the toast after 1 seconds
      hideProgressBar: false, // Display progress bar
      pauseOnHover: true, // Pause the timer when hovering over the toast
    });
  };
  
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Trigger the signIn function when Enter is pressed
      handleSignIn();
    }
  };

  return (
    <>
    <ToastContainer />
      {!token && (
        <div className="authenticationWrapper">
          {isAuthSliceFetching && <PageLoader />}

          <div className="authenticationRight">
            <div className="greyBoxWrap flexbox">
              <Image name={"muLogo"} />
              <Image classname={'centeredBG'} name={"adminBGNew"} extention={".png"} />

            </div>
          </div>

          <div className="authenticationLeft">
            <span className="logo">
              <img src="/assets/img/logo.png" alt="" />
            </span>

            <h1 className="welcomeHeading mt-50">Masters'union Blogs</h1>
            <p className="welcomeData mt-5">
              It's an all-in-one online platform for handling mastersunion blogs.
            </p>
            <div className="loginWrap">
              <InputField
                notImp={"notimp"}
                labelName={"Email ID"}
                placeholder={"Enter Your Email"}
                onChange={onChangeFormData}
                name="email"
                type={"text"}
                isError={errors.email ? true : false}
                erroMessage={errors.email}
              />
              <InputField
                notImp={"notimp"}
                labelName={"Password"}
                placeholder={"Enter Your Password"}
                onChange={onChangeFormData}
                name="password"
                type={type === true ? "password" : "text"}
                isError={errors.password ? true : false}
                erroMessage={errors.password}
                inputIcon={type === true ? "hideIcon" : "viewIcon"}
                onclick={() => setType(!type)}
                onKeyPress={handleKeyPress}
              />
              {/* <div className="textRight mt-10">
                <p className="redLink">Forget Password</p>
              </div> */}
              <Button
                onClick={handleSignIn}
                className={"BlueFillButton loginButton"}
                name={"Sign in"}
              />
            </div>
          </div>
        </div>
      )}

      {token && <Navigate to="/" />}
    </>
  );
};

export default Login;
