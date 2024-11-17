import { Dispatch } from 'redux';
import { getAllEmployeers } from '../../api/getAllEmployeersApi';
import {
  FETCH_EMPLOYEES_REQUEST,
  FETCH_EMPLOYEES_SUCCESS,
  FETCH_EMPLOYEES_FAILURE,
} from './employeesTypes';

export const fetchEmployeers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_EMPLOYEES_REQUEST });

    try {
      const data = await getAllEmployeers();
      dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: FETCH_EMPLOYEES_FAILURE, payload: error.message });
    }
  };
};
