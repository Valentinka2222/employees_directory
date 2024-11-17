import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Box, Stack, Typography, Avatar } from '@mui/material';

import { fetchWorkersAction } from '../../../redux/reducer/employeersReducer';
import { Employer } from '../../../entities/Employees';
import { RootState, AppDispatch } from '../../../redux/store/store';

import './employeesDetails.scss';

const EmployeesDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { employees } = useSelector((state: RootState) => state.employees);
  const employee = employees.find((employee: Employer) => employee.id === id);

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const currentTab = queryParams.get('tab');

  useEffect(() => {
    if (!employees.length) {
      dispatch(fetchWorkersAction());
    }
  }, [dispatch, employees]);

  const handleGoBack = () => navigate(location.state?.from || `/?tab=${currentTab}`);

  return (
    <Box className="worker-details">
      <Box className="worker-details__header">
        <button onClick={handleGoBack}>
          <img src="/images/right_arrow.png" alt="Go back" />
        </button>
      </Box>
      {employee && (
        <Stack className="worker-details__info-card" spacing={2}>
          <Avatar alt={employee.name} src={employee.avatar} />
          <Stack direction="column">
            <Typography
              className="worker-details__info-card__name"
              variant="subtitle2"
              color="text.primary"
            >
              {employee.name}{' '}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                className="worker-list__item-details-tag"
              >
                {employee.tag}
              </Typography>
            </Typography>
            <Typography
              className="worker-details__info-card__position"
              textAlign="center"
              variant="body2"
              color="text.secondary"
            >
              {employee.position}
            </Typography>
          </Stack>
        </Stack>
      )}
      {employee && (
        <Box>
          <Box className="worker-details__details-item">
            <img src="/images/stars.png" alt="Birthday" />
            <Typography variant="body1">
              {moment(employee.birthDate).format('D MMMM YYYY')}
            </Typography>
          </Box>
          <Box className="worker-details__details-item">
            <img src="/images/phone.png" alt="Phone" />
            <Typography variant="body1">{employee.phone}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default EmployeesDetails;
