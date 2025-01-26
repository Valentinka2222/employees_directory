import { Typography, Box, Link } from '@mui/material';
import { fetchWorkersAction } from '../../../redux/reducer/employeersReducer';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store/store';

import '../index.scss';

const ErrorNotFound = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleReload = () => {
    const params = new URLSearchParams(location.search);
    const currentTab = params.get('tab') || 'All';
    params.set('tab', currentTab);
    params.delete('search');
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
