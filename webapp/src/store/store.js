import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '../store/user/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer
  }
});

export default store;
