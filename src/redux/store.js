import { configureStore } from "@reduxjs/toolkit";

import simplePopupSlice from "./slices/popups/simplePopupSlice";

export default configureStore({
  reducer: {
    simplePopup: simplePopupSlice,
  },
});
