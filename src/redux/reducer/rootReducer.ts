import { combineReducers } from '@reduxjs/toolkit';
import workersReducer from './workersReducer'; // Correct import path

const rootReducer = combineReducers({
  workers: workersReducer, // Ensure this matches the slice name
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
