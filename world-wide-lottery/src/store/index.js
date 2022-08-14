import { configureStore } from "@reduxjs/toolkit";
import usersList from "./userSlice";

const store = configureStore({
  reducer: { users: usersList.reducer },
});

export default store;
