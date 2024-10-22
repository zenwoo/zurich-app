import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers, getUserEmail } from './userThunk';

const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', users: [] },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload.data;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(getUserEmail.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserEmail.fulfilled, (state, action) => {
        const { data } = action.payload;

        state.status = 'succeeded';
        state.users = state.users.map((user) => {
          if (user.id === data.id) {
            return {
              ...user,
              ...data
            };
          }

          return user;
        });
      })
      .addCase(getUserEmail.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }
});

export default usersSlice.reducer;
