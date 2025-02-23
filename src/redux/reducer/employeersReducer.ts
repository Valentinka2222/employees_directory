import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getAllEmployees } from '../../entities/Employees/gateways/index';
import { Employees, EmployeesState } from '../../entities/Employees/types/index';

const initialState: EmployeesState = {
  loading: false,
  employees: [],
  error: null,
};

export const fetchWorkersAction = createAsyncThunk<Employees, void, { rejectValue: string }>(
  'workers/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getAllEmployees();
      return data;
    } catch (error) {
      return rejectWithValue(
        (error as { response?: { data?: { message?: string } } }).response?.data?.message ||
          'Failed to fetch employees',
      );
    }
  },
);

const workersSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchWorkersAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkersAction.fulfilled, (state, action: PayloadAction<Employees>) => {
        state.loading = false;
        state.employees = action.payload;
        state.error = null;
      })
      .addCase(fetchWorkersAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default workersSlice.reducer;
