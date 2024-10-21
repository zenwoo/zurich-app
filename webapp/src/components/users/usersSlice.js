import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const REQUEST_URL = 'https://reqres.in/api/users';

export const fetchUsers = createAsyncThunk('users/getUsers', async (args) => {
  try {
    const response = await fetch(`${REQUEST_URL}?page=${args?.page ?? 1}&per_page=${args?.rowsPerPage ?? 100}`);
    return await response.json();
  } catch (error) {
    return error;
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: { status: 'idle', users: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';

        const filteredUsers = action.payload.data.filter((user) => (
          user.first_name.toLowerCase().startsWith('g')
          || user.last_name.toLowerCase().startsWith('w')
        ));

        state.users = {
          ...action.payload,
          data: filteredUsers
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }
});

export const userActions = usersSlice.actions;
export default usersSlice.reducer;
