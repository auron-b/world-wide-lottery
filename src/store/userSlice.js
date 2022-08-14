import { createSlice } from "@reduxjs/toolkit";

const usersInitialState = {
  users: [],
  currentUser: null,
  winners: [],
};

const usersList = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    upsertUser(state, action) {
      state.currentUser = action.payload;
      const newUser = action.payload;
      const existingUser = state.users.find((item) => newUser.id === item.id);
      if (newUser.isWinner) {
        state.winners.push(newUser);
      }
      if (existingUser) {
        existingUser.timesPlayed++;
        existingUser.isWinner = newUser.isWinner;
      } else {
        state.users.push(newUser);
      }
    },
    clearUsersList(state) {
      state.users = [];
      state.winners = [];
      state.currentUser = null;
    },
    editEmail(state, action) {
      const userToEdit = action.payload;
      const existingUser = state.users.find(
        (item) => userToEdit.id === item.id
      );
      const existingWinner = state.winners.find(
        (item) => userToEdit.id === item.id
      );
      existingWinner.email = userToEdit.newEmail;
      existingUser.email = userToEdit.newEmail;
      state.currentUser.email = userToEdit.newEmail;
    },
  },
});

export const usersListActions = usersList.actions;

export default usersList;
