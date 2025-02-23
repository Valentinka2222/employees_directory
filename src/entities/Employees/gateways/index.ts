import axios from 'axios';
import { Employees } from '../../Employees/types';

export const getAllEmployees = async (): Promise<Employees> => {
  const response = await axios.get<Employees>(
    'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers',
  );

  return response.data;
};
