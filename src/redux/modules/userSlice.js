import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userId: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserId: (state, action) => { // Add a reducer to set userId
      state.userId = action.payload;  
    },
    logout: (state) => {
      state.token = null;
      state.userId = null; // Clear userId on logout
    },
  },
});

export const { setToken, setUserId, logout } = userSlice.actions;
export default userSlice.reducer;
