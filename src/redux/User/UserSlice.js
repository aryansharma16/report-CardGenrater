import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const data =
  Cookies.get("loginData") !== "undefined" && Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
    let orgId
    let userId
    let userName
    let createdBy
    let organizationId
    let token
    let headers

const apiUrl = process.env.REACT_APP_BACKEND_URL;

const setTokenValues = () => {
  const data = Cookies.get('loginData')
    ? JSON.parse(Cookies.get('loginData'))
    : null
console.log("login",data)
  userId = data?.Data?.id
  userName = data?.Data?.firstName + ' ' + data?.Data?.lastName

  organizationId = data?.organizationId
  token = Cookies.get('token')
  console.log(token);
  headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}
token = Cookies.get('token')
console.log(token+"...userslice");
headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`
}

// get login data for change Password functionality
const getTokenValues = () => {
  const dt=Cookies.get("loginData")
  ? JSON.parse(Cookies.get("loginData"))
  : null;
     userId = dt?.id;
};

//createUser
export const createUser = createAsyncThunk(
  "createUser",
  async (obj, thunkAPI) => {
    try {
      setTokenValues();

      const response = await fetch(`${apiUrl}/wordpress/createUser`, {
        method: "POST",
        headers,
        body: JSON.stringify(obj),
      });
      const data = await response.json();
     
        if (response.status === 200) {
            console.log(data);
          return data;
        } else {
          return thunkAPI.rejectWithValue(data);
        }
      
    } catch (e) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

/**GET ALL USERS  */
export const getAllUsers = createAsyncThunk(
  "getAllUsers",
  async (obj, thunkAPI) => {
    try {
      console.log(obj)
      console.log(apiUrl+"..apiurl");
      setTokenValues();
      const response = await fetch(
        `${apiUrl}/wordpress/getAllUsers?searchQuery=${obj?.searchValue}`,
        {
          method: "GET",
          headers,
          // headers,
        }
      );
      let data = await response.json();
      if (response.status === 200) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {
      console.log(error, "err");
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  }
);

// update user

export const updateUser = createAsyncThunk(
  'updateUser',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/wordpress/updateUser/${obj.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(obj)
      })
      let data = await response.json()
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log(error, 'err')
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)
// delete user

export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (obj, thunkAPI) => {
    try {
      setTokenValues()
      const response = await fetch(`${apiUrl}/wordpress/deleteUser/${obj.id}`, {
        method: 'PUT',
        headers,
        body: JSON.stringify(obj)
      })
      let data = await response.json()
      if (response.status === 200) {
        return data
      } else {
        return thunkAPI.rejectWithValue(data)
      }
    } catch (error) {
      console.log(error, 'err')
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)


const initialStateValues = {
    isuserSliceFetching: false,
  isuserSliceFetchingSmall: false,
  isuserEditSliceSuccess: false,
  isuserDeleteSliceSuccess:false,
    isuserSliceSuccess: false,
    isuserSliceError: false,
    userSliceErrorMessage: "",
    userSliceSuccessMessage: "",
    allOrgUsers: [],
    userCount:0,

};

const userSlice = createSlice({
  name: "user",
  initialState: initialStateValues,
  reducers: {
 
    clearUserSliceStates:(state,action)=>{
        state.isuserSliceFetching = false;
        state.isuserSliceFetchingSmall = false;
        state.isuserSliceSuccess = false;
        state.isuserSliceError = false;
        state.userSliceErrorMessage = "";
        state.isuserEditSliceSuccess=false
        state.isuserDeleteSliceSuccess= false
    },
    clearUserSliceData: (state, action) => {
        state.userCount=0;
        state.allOrgUsers=[];
        return state
    }
      },
  extraReducers: (builder) => {
   

    builder.addCase(createUser.fulfilled, (state, { payload }) => {
        console.log(payload, "-------------------create-user--------");
        state.isuserSliceFetching = false;
        state.allOrgUsers =  [...state.allOrgUsers,payload];
        state.userSliceSuccessMessage = payload?.Message || "user created";
        state.isuserSliceSuccess = true;
  
        return state;
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.isuserSliceFetching = false;
      state.isuserSliceError = true;
      state.userSliceErrorMessage = payload || "Something Went Wrong";
    });
    builder.addCase(createUser.pending, (state, { payload }) => {
      state.isuserSliceFetching = true;
    });


    builder.addCase(getAllUsers.fulfilled, (state, { payload }) => {
        console.log(payload, "-------------------all-user--------");

        state.isuserSliceFetching = false;
        state.allOrgUsers = [...state.allOrgUsers,...payload.Data];
        // console.log(JSON.stringify(state.allOrgUsers)+ "All org");
        console.log(JSON.stringify(state.allOrgUsers.length)+ "All org length");
        state.userCount=payload?.userCount;
        return state;
    });
    builder.addCase(getAllUsers.rejected, (state, { payload }) => {
      state.isuserSliceFetching = false;
      state.isuserSliceError = true;
      state.userSliceErrorMessage = payload?.Message || "Something Went Wrong";
    });
    builder.addCase(getAllUsers.pending, (state, { payload }) => {
      state.isuserSliceFetching = true;
    });
//...........updateUser...............
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      console.log("....."+ JSON.stringify(payload.Data)
        );
      state.isuserSliceFetchingSmall = false
      state.isuserEditSliceSuccess = true
      // state.allOrgUsers = [...state.allOrgUsers, payload.Data];
console.log(JSON.stringify(state.allOrgUsers)+"....");
     let userIndex= state.allOrgUsers.findIndex(user => 
         user?._id === payload.Data._id
      )
      console.log(userIndex+ "userindex")
    //   let UserblogIndex= state.UserBlogs.findIndex(blog => 
    //     blog._id === payload.Data._id
    //  )
      state.allOrgUsers[userIndex]=payload?.Data
      state.userSliceSuccessMessage = payload?.Message || 'Success'
      return state
    })
    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.isuserSliceFetchingSmall = false
      state.isuserSliceError = true
      state.userSliceErrorMessage = payload?.message || 'Something Went Wrong'
    })
    builder.addCase(updateUser.pending, (state, { payload }) => {
      state.isuserSliceFetchingSmall = true
    })

    //......delete user.........
    builder.addCase(deleteUser.fulfilled, (state, { payload }) => {
      state.isuserSliceFetchingSmall = false
      state.isuserDeleteSliceSuccess = true
      state.userSliceSuccessMessage = payload?.Message
      state.allOrgUsers = state.allOrgUsers.filter(user => user._id !== payload.Data)
      state.userCount=payload?.totalUsers
      return state
    })
    builder.addCase(deleteUser.rejected, (state, { payload }) => {
      state.isuserSliceFetchingSmall = false
      state.isuserSliceError = true
      state.userSliceErrorMessage = payload?.Message || 'Something Went Wrong'
    })
    builder.addCase(deleteUser.pending, (state, { payload }) => {
      state.isuserSliceFetchingSmall = true
    })
    
  },
  

  
});

export const { clearUserSliceStates, clearAllSliceStates, clearUserSliceData} = userSlice.actions;
export default userSlice;
