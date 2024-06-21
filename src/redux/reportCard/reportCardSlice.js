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
  const dt = Cookies.get("loginData")
    ? JSON.parse(Cookies.get("loginData"))
    : null;
  userId = dt?.id;
};

export const getAllCards = createAsyncThunk(
  "getAllCards",
  async (obj, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/getCards`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (response?.status === 200) {
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
export const getCardById = createAsyncThunk(
  "getCardById",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/getReportCard/${id}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      const data = await response.json();
      if (response?.status === 200) {
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

export const createReportCardTemplate = createAsyncThunk(
  "createReportCardTemplate",
  async (reportFormData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(reportFormData),
      });
      const data = await response.json();
      if (response?.status === 200) {
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

export const deleteReportCardTemplate = createAsyncThunk(
  "deleteReportCardTemplate",
  async (reportCardId, thunkAPI) => {
    try {
      const response = await fetch(
        `${apiUrl}reportCard/deleteReportCard/${reportCardId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data, "data");
        return data;
      } else {
        console.log(data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getAllReportBatch = createAsyncThunk(
  "getAllReportBatch",
  async (obj, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/reportbatches`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(obj),
      });
      const data = await response.json();
      if (response?.status === 200) {
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

export const createReportCardBatch = createAsyncThunk(
  "createReportCardBatch",
  async (reportFormData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/createreportbatch`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(reportFormData),
      });
      const data = await response.json();
      if (response?.status === 201 || response?.status === 200) {
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

export const deleteReportBatch = createAsyncThunk(
  "deleteReportBatch",
  async (reportCardId, thunkAPI) => {
    try {
      const response = await fetch(
        `${apiUrl}reportCard/deleteReportbatch/${reportCardId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.json();
      if (response.status === 200) {
        console.log(data, "data");
        return data;
      } else {
        console.log(data);
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createReportsInfo = createAsyncThunk(
  "createReportsInfo",
  async (reportFormData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/createReportInfo`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(reportFormData),
      });
      const data = await response.json();
      if (response?.status === 201) {
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
export const getAllReportCardWithBatchId = createAsyncThunk(
  "getAllReportCardWithBatchId",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${apiUrl}reportCard/getReportInfoByBatchId/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.json();
      if (response?.status === 200) {
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

export const getAllEmailTemplatesWithId = createAsyncThunk(
  "getAllEmailTemplatesWithId",
  async (id, thunkAPI) => {
    try {
      const response = await fetch(
        `${apiUrl}reportCard/getAllEmailTemplates/${id}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const data = await response.json();
      if (response?.status === 200) {
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

export const sendEmailsToStudents = createAsyncThunk(
  "sendEmailsToStudents",
  async (reportFormData, thunkAPI) => {
    try {
      const response = await fetch(`${apiUrl}reportCard/sendMailsToStudents`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
        body: JSON.stringify(reportFormData),
      });
      const data = await response.json();
      if (response?.status === 201) {
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
  // fetching reducers
  isgetAllReportCardFetching: false,
  isgetSingleReportCardFetching: false,
  isCreateReportCardFetching: false,
  isDeleteReportCardFetching: false,
  isDeleteReportBatchFetching: false,
  isgetAllReportBatchesFetching: false,
  isCreatereportBatchFetching: false,
  isCreatereportCardInfoFetching: false,
  isCreatereportCardInfoByBatchIDFetching: false,
  isEmailTemplatesWithIDFetching: false,
  isSendEmailsFetching: false,

  // success
  isgetAllCardsSliceSuccess: false,
  isgetSingleCardsSliceSuccess: false,
  isreportCardSliceError: false,
  isCreateReportCardSuccess: false,
  isDeleteReportCardSuccess: false,
  isDeleteReportBatchSuccess: false,
  isgetAllReportBatchesSuccess: false,
  isCreatereportBatchSuccess: false,
  isCreatereportCardInfoSuccess: false,
  isCreatereportCardInfoByBatchIDSuccess: false,
  isEmailTemalatesWithIDSuccess: false,
  isSendEmailsSuccess: false,

  reportCardSliceErrorMessage: "",
  reportCardSliceSuccessMessage: "",
  allReportCardsData: [],
  allReportbatchesData: [],
  singleReportCardsData: [],
  createReportBatchData: [],
  createReportCardInfoData: [],
  createReportFromData: [],
  reportCardInfoData: [],
  emailTemplatesData: [],
  sendEmailsData: [],
};

const reportCardSlice = createSlice({
  name: "authentication",
  initialState: initialStateValues,
  reducers: {
    // omit reducer cases
    logout: (state, action) => {
      // Cookies.remove();
      return initialStateValues;
    },
    setCreateReportformDataState: (state, action) => {
      state.createReportFromData = action.payload;
    },
    setReportCode: (state, { payload }) => {
      state.createReportFromData = {
        ...state.createReportFromData,
        reportDesignCode: payload,
      };
    },
    clearAllSliceStates: (state, action) => {
      state.reportCardSliceSuccessMessage = "";
      state.reportCardSliceErrorMessage = "";
      state.isreportCardSliceError = false;
      state.isgetAllReportCardFetching = false;
      state.isgetAllCardsSliceSuccess = false;
      state.isCreateReportCardFetching = false;
      state.isgetSingleReportCardFetching = false;
      state.isCreateReportCardSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCards.fulfilled, (state, { payload }) => {
      state.isgetAllReportCardFetching = false;
      state.isgetAllCardsSliceSuccess = true;
      state.allReportCardsData = payload.Data;
      return state;
    });
    builder.addCase(getAllCards.rejected, (state, { payload }) => {
      state.isgetAllReportCardFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(getAllCards.pending, (state, { payload }) => {
      state.isgetAllReportCardFetching = true;
    });
    // get cards data by Id
    builder.addCase(getCardById.fulfilled, (state, { payload }) => {
      state.isgetSingleReportCardFetching = false;
      state.isgetSingleCardsSliceSuccess = true;
      state.singleReportCardsData = payload.Data;
      return state;
    });
    builder.addCase(getCardById.rejected, (state, { payload }) => {
      state.isgetSingleReportCardFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(getCardById.pending, (state, { payload }) => {
      state.isgetSingleReportCardFetching = true;
    });

    // create report reducers
    builder.addCase(
      createReportCardTemplate.fulfilled,
      (state, { payload }) => {
        state.isCreateReportCardFetching = false;
        state.isCreateReportCardSuccess = true;
        return state;
      }
    );
    builder.addCase(createReportCardTemplate.rejected, (state, { payload }) => {
      state.isCreateReportCardFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(createReportCardTemplate.pending, (state, { payload }) => {
      state.isCreateReportCardFetching = true;
    });

    // Reducer modifications for delete report card action
    builder.addCase(
      deleteReportCardTemplate.fulfilled,
      (state, { payload }) => {
        state.isDeleteReportCardFetching = false;
        state.isDeleteReportCardSuccess = true;
        return state;
      }
    );
    builder.addCase(deleteReportCardTemplate.rejected, (state, { payload }) => {
      state.isDeleteReportCardFetching = false;
      // state.isDeleteReportCardSuccess = false;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(deleteReportCardTemplate.pending, (state, { payload }) => {
      state.isDeleteReportCardFetching = true;
    });

    // Batches Slices
    builder.addCase(getAllReportBatch.fulfilled, (state, { payload }) => {
      state.isgetAllReportBatchesFetching = false;
      state.isgetAllReportBatchesSuccess = true;
      state.allReportbatchesData = payload;
      return state;
    });
    builder.addCase(getAllReportBatch.rejected, (state, { payload }) => {
      state.isgetAllReportBatchesFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(getAllReportBatch.pending, (state, { payload }) => {
      state.isgetAllReportBatchesFetching = true;
    });

    // create report batch
    builder.addCase(createReportCardBatch.fulfilled, (state, { payload }) => {
      console.log(payload, "payload Slice se");
      state.isCreatereportBatchFetching = false;
      state.isCreatereportBatchSuccess = true;
      state.createReportBatchData = payload;

      return state;
    });
    builder.addCase(createReportCardBatch.rejected, (state, { payload }) => {
      state.isCreatereportBatchFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(createReportCardBatch.pending, (state, { payload }) => {
      state.isCreatereportBatchFetching = true;
    });

    // Reducer modifications for delete report card batch action
    builder.addCase(deleteReportBatch.fulfilled, (state, { payload }) => {
      state.isDeleteReportBatchFetching = false;
      state.isDeleteReportBatchSuccess = true;
      return state;
    });
    builder.addCase(deleteReportBatch.rejected, (state, { payload }) => {
      state.isDeleteReportBatchFetching = false;
      // state.isDeleteReportCardSuccess = false;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(deleteReportBatch.pending, (state, { payload }) => {
      state.isDeleteReportBatchFetching = true;
    });

    builder.addCase(createReportsInfo.fulfilled, (state, { payload }) => {
      console.log(payload, "payload Slice se");
      state.isCreatereportCardInfoFetching = false;
      state.isCreatereportCardInfoSuccess = true;
      state.createReportCardInfoData = payload;

      return state;
    });
    builder.addCase(createReportsInfo.rejected, (state, { payload }) => {
      state.isCreatereportCardInfoFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(createReportsInfo.pending, (state, { payload }) => {
      state.isCreatereportCardInfoFetching = true;
    });

    builder.addCase(
      getAllReportCardWithBatchId.fulfilled,
      (state, { payload }) => {
        //console.log(payload,"payload Slice se")
        state.isCreatereportCardInfoByBatchIDFetching = false;
        state.isCreatereportCardInfoByBatchIDSuccess = true;
        state.reportCardInfoData = payload.Data;

        return state;
      }
    );
    builder.addCase(
      getAllReportCardWithBatchId.rejected,
      (state, { payload }) => {
        state.isCreatereportCardInfoByBatchIDFetching = false;
        state.isreportCardSliceError = true;
        state.reportCardSliceErrorMessage =
          payload?.Message || "Something Went Wrong";
      }
    );
    builder.addCase(
      getAllReportCardWithBatchId.pending,
      (state, { payload }) => {
        state.isCreatereportCardInfoByBatchIDFetching = true;
      }
    );

    // email templates
    builder.addCase(
      getAllEmailTemplatesWithId.fulfilled,
      (state, { payload }) => {
        //console.log(payload,"payload Slice se")
        state.isEmailTemplatesWithIDFetching = false;
        state.isEmailTemalatesWithIDSuccess = true;
        state.emailTemplatesData = payload.Data;

        return state;
      }
    );
    builder.addCase(
      getAllEmailTemplatesWithId.rejected,
      (state, { payload }) => {
        state.isEmailTemplatesWithIDFetching = false;
        state.isreportCardSliceError = true;
        state.reportCardSliceErrorMessage =
          payload?.Message || "Something Went Wrong";
      }
    );
    builder.addCase(
      getAllEmailTemplatesWithId.pending,
      (state, { payload }) => {
        state.isEmailTemplatesWithIDFetching = true;
      }
    );

    builder.addCase(sendEmailsToStudents.fulfilled, (state, { payload }) => {
      //console.log(payload,"payload Slice se")
      state.isSendEmailsFetching = false;
      state.isSendEmailsSuccess = true;
      state.sendEmailsData = payload.Data;

      return state;
    });
    builder.addCase(sendEmailsToStudents.rejected, (state, { payload }) => {
      state.isSendEmailsFetching = false;
      state.isreportCardSliceError = true;
      state.reportCardSliceErrorMessage =
        payload?.Message || "Something Went Wrong";
    });
    builder.addCase(sendEmailsToStudents.pending, (state, { payload }) => {
      state.isSendEmailsFetching = true;
    });
  },
});

export const {
  logout,
  clearAllSliceStates,
  setCreateReportformDataState,
  setReportCode,
} = reportCardSlice.actions;
export default reportCardSlice;
