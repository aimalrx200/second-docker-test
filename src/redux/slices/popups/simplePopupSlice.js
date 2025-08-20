import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  popupType: null,
  data: null,
};

export const simplePopupSlice = createSlice({
  name: "simplePopup",
  initialState,
  reducers: {
    setPopup: (state, action) => {
      state.open = action.payload.open;
      state.popupType = action.payload.popupType;
      state.data = action.payload.data;
    },
  },
});

export const { setPopup } = simplePopupSlice.actions;

export default simplePopupSlice.reducer;
