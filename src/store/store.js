import { configureStore } from '@reduxjs/toolkit';
import getDataSliceReducer from './reducers/getDataSlice';

const store = configureStore({
  reducer: {
    getData: getDataSliceReducer,
  },
});

export default store;
