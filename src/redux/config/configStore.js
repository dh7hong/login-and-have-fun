import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../modules/userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
