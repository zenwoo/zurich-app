import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUsers = createAsyncThunk('users/getUsers', async () => {
  try {
    const response = await fetch('api/users');
    return await response.json();
  } catch (error) {
    return error;
  }
});

export const getUserEmail = createAsyncThunk('users/getUserById', async ({ id, isEmailHidden }) => {
  try {
    const response = await fetch(`api/users/${id}?hideEmail=${+isEmailHidden}`);
    const { data } = await response.json();

    return {
      data: {
        ...data,
        isEmailHidden
      }
    };
  } catch (error) {
    return error;
  }
});
