import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authentication/authSlice";
import userSlice from "./User/UserSlice";
import reportCardSlice from "./reportCard/reportCardSlice";
export const store = configureStore({
  reducer: {
    authentication: authSlice.reducer,
    user: userSlice.reducer,
    reportCards: reportCardSlice.reducer,
  },
});
