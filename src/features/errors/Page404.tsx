import { Typography, Box, Link } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchWorkersAction } from '../../redux/reducer/employeersReducer';
import { AppDispatch } from '../../redux/store/store';

import './index.scss';

const Page404 = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleReload = () => {
    dispatch(fetchWorkersAction());
    navigate('/');
  };

  return (
    <Box className="error-box">
      <img className="error-box__image" src="/images/ufo.png" alt="Error occurred" />
      <Typography variant="h5" className="error-box__title">
        Some superintelligence broke everything...
      </Typography>
      <Typography variant="body1" color="text.secondary" className="error-box__text">
        We will try to fix it quickly. Try again a bit later.
      </Typography>
      <Link
        onClick={handleReload}
        component="button"
        underline="none"
        className="error-box__reload-link"
      >
        Try again
      </Link>
    </Box>
  );
};

export default Page404;
