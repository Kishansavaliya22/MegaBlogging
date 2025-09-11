import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  userData: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    storeLogin: (state, action) => {
      state.authStatus = true;
      state.userData = action.payload;
    },
    storeLogout: (state) => {
      state.authStatus = false;
      state.userData = null;
    },
  },
});

export const { storeLogin, storeLogout } = authSlice.actions;
export default authSlice.reducer;
