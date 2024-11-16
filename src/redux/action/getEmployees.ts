import { Dispatch } from 'redux';
import { getAllEmployeers } from '../../api/getAllEmployeersApi';
import {
  FETCH_WORKERS_REQUEST,
  FETCH_WORKERS_SUCCESS,
  FETCH_WORKERS_FAILURE,
} from './workersTypes';

export const fetchEmployeers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_WORKERS_REQUEST });

    try {
      const data = await getAllEmployeers();
      dispatch({ type: FETCH_WORKERS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: FETCH_WORKERS_FAILURE, payload: error.message });
    }
  };
};
