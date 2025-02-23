import { Dispatch } from 'redux';
import { getAllEmployees } from '../../entities/Employees/gateways/index';
import { EMPLOYEES, EMPLOYEES_SUCCESS, EMPLOYEES_FAILURE } from './employeesTypes';

export const fetchEmployeers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: EMPLOYEES });

    try {
      const data = await getAllEmployees();
      dispatch({ type: EMPLOYEES_SUCCESS, payload: data });
    } catch (error: any) {
      dispatch({ type: EMPLOYEES_FAILURE, payload: error.message });
    }
  };
};
