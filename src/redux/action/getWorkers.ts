import { Dispatch } from 'redux';
import { getAllWorkers } from '../../api/getAllWorkersApi';
import {
  FETCH_WORKERS_REQUEST,
  FETCH_WORKERS_SUCCESS,
  FETCH_WORKERS_FAILURE,
} from './workersTypes';

export const fetchWorkers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_WORKERS_REQUEST });

    try {
      const data = await getAllWorkers();
      dispatch({ type: FETCH_WORKERS_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: FETCH_WORKERS_FAILURE, payload: error.message });
    }
  };
};
