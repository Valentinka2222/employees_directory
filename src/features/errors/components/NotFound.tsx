import { Typography, Box, Link } from '@mui/material';
import { fetchWorkersAction } from '../../../redux/reducer/employeersReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../../../redux/store/store';

import '../index.scss';

const ErrorNotFound = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const { employees } = useSelector((state: RootState) => state.employees);

  const filterEmployeesByTab = (employees: any[], currentTab: string) => {
    if (currentTab === 'All') return employees;
    return employees.filter(
      employee => employee.position?.toLowerCase() === currentTab.toLowerCase(),
    );
  };
  const currentTab = params.get('tab') || 'All';
  const filteredEmployees = filterEmployeesByTab(employees, currentTab);

  const handleReload = () => {
    const currentTab = params.get('tab') || 'All';

    params.delete('search');

    if (filteredEmployees.length === 0) params.set('tab', 'All');
    else params.set('tab', currentTab);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    dispatch(fetchWorkersAction());
  };

  return (
    <Box className="error-box">
      <img src="/images/icon_search.png" alt="No workers found" className="error-box__image" />
      <Typography variant="h5" className="error-box__title" color="text.primary">
        We did not find anyone
      </Typography>
      <Typography className="error-box__text" variant="body1" color="text.secondary">
        Try to adjust your request
      </Typography>
      <Link
        onClick={handleReload}
        component="button"
        underline="none"
        className="error-box__reload-link"
      >
        Return to the list
      </Link>
    </Box>
  );
};

export default ErrorNotFound;
