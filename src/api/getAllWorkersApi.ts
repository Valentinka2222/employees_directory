import axios from 'axios';
import { Workers } from '../entities/Workers';

export const getAllWorkers = async (): Promise<Workers> => {
  const response = await axios.get<Workers>(
    'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers',
  );

  return response.data;
};
