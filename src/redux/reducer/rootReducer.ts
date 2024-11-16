import { combineReducers } from '@reduxjs/toolkit';
import employeesReducer from './employeersReducer';

const rootReducer = combineReducers({
  employees: employeesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
