import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../modules/userSlice';
import todosSlice from "../modules/todosSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    todos: todosSlice,
  },
});

export default store;
