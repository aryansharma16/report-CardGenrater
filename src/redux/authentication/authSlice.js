import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const data =
  Cookies.get("loginData") !== "undefined" && Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
let orgId;
let userId;
let createdBy;
let officialEmail;

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const setTokenValues = () => {
  orgId = data.user.Organization.uuid;
  userId = 17;
  createdBy = data.user.uuid;
  officialEmail = data.user.officialEmail;
};

// get login data for change Password functionality
const getTokenValues = () => {
  const dt=Cookies.get("loginData")
  ? JSON.parse(Cookies.get("loginData"))
  : null;
     userId = dt?.id;
};

export const loginUser = createAsyncThunk(
  "loginUser",
  async (obj, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}auth/loginuser`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (response?.status === 200) {
        console.log(data);
        Cookies.set("loginData", JSON.stringify(data));
        Cookies.set("token", data.Token);
        Cookies.set("userName", data.Data.firstName + " " + data.Data.lastName);
        Cookies.set("userId", data.Data.id);
        // Cookies.set("roles", JSON.stringify(data.Data.role));
    
        console.log(data, "data");
        return data;
      } else {
        console.log(data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);


const initialStateValues = {
  isAuthSliceFetching: false,
  isAuthSliceSuccess: false,
  isAuthSliceError: false,
  authSliceErrorMessage: "",
  authSliceSuccessMessage:"",
  isAuthSliceFetchingSmall:false,
  userData: [],

};

const authSlice = createSlice({
  name: "authentication",
  initialState: initialStateValues,
  reducers: {
    // omit reducer cases
    logout: (state, action) => {
      // Cookies.remove();
      return initialStateValues;
    },
    clearAllSliceStates:(state,action)=>{
      state.authSliceSuccessMessage='';
      state.authSliceErrorMessage='';
      state.isAuthSliceError=false;
      state.isAuthSliceFetching=false;
      state.isAuthSliceFetchingSmall=false;
      state.isAuthSliceSuccess=false;
    }
    },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.isAuthSliceFetching = false;
      //   state.isLoggedIn = true;
      state.isAuthSliceSuccess = true;
 
         state.userData = payload;

      return state;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isAuthSliceFetching = false;
      state.isAuthSliceError = true;
      state.authSliceErrorMessage = payload?.Message || "Something Went Wrong";
    });
    builder.addCase(loginUser.pending, (state, { payload }) => {
      state.isAuthSliceFetching = true;
    });

   
  },
  
});

export const { logout ,clearAllSliceStates} = authSlice.actions;
export default authSlice;
