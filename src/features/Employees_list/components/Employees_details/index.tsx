import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Stack, Typography, Avatar, CircularProgress } from '@mui/material';

import { fetchWorkersAction } from './../../../../redux/reducer/employeersReducer';
import { Employer } from '../../../../entities/Employees/types/index';
import { RootState, AppDispatch } from './../../../../redux/store/store';

import ErrorNotFound from '../../../errors/components/NotFound';

import '../../index.scss';

const EmployeesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  const employee = employees.find((employee: Employer) => employee.id.toString() === id) || null;

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab');

  useEffect(() => {
    if (!employees.length) dispatch(fetchWorkersAction());
  }, [dispatch, employees]);

  const handleGoBack = () => navigate(location.state?.from || `/?tab=${currentTab}`);

  if (!loading && !employee) return <ErrorNotFound />;

  return (
    <Box className="worker-details">
      <Box className="worker-details__header">
        <button onClick={handleGoBack}>
          <img src="/images/right_arrow.png" alt="Go back" />
        </button>
      </Box>

      {loading && !employee && (
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <CircularProgress />
          <Typography>Loading...</Typography>
        </Stack>
      )}

      {error && (
        <Stack alignItems="center" justifyContent="center" spacing={2}>
          <Typography variant="h6" color="error">
            Something went wrong. Please try again later.
          </Typography>
        </Stack>
      )}

      {/* Employee Details Card */}
      <Stack className="worker-details__info-card" spacing={2}>
        <Avatar alt={employee?.name || ''} src={employee?.avatar || ''} />
        <Stack direction="column">
          <Typography
            className="worker-details__info-card__name"
            variant="subtitle2"
            color="text.primary"
          >
            {employee?.name}{' '}
            <Typography
              component="span"
              variant="body2"
              color="text.secondary"
              className="worker-list__item-details-tag"
            >
              {employee?.tag}
            </Typography>
          </Typography>
          <Typography
            className="worker-details__info-card__position"
            textAlign="center"
            variant="body2"
            color="text.secondary"
          >
            {employee?.position}
          </Typography>
        </Stack>
      </Stack>

      {/* Details Section */}
      <Box>
        <Box className="worker-details__details-item">
          <img src="/images/stars.png" alt="Birthday" />
          <Typography variant="body1">
            {employee ? moment(employee.birthDate).format('D MMMM YYYY') : 'N/A'}
          </Typography>
        </Box>
        <Box className="worker-details__details-item">
          <img src="/images/phone.png" alt="Phone" />
          <Typography variant="body1">{employee?.phone || 'N/A'}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeesDetails;
