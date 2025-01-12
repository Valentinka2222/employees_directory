import { Typography, Box, Link } from '@mui/material';

import { fetchWorkersAction } from '../../../redux/reducer/employeersReducer';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store/store';

import '../index.scss';

const UnexpectedError = () => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box className="error-box">
      <img className="error-box__image" src="/images/ufo.png" alt="Error occurred" />
      <Typography variant="h5" className="error-box__title">
        Unexpected error occurred...
      </Typography>
      <Typography variant="body1" color="text.secondary" className="error-box__text">
        Try again a bit later.
      </Typography>
      <Link
        onClick={() => dispatch(fetchWorkersAction())}
        component="button"
        underline="none"
        className="error-box__reload-link"
      >
        Reload Page
      </Link>
    </Box>
  );
};
export default UnexpectedError;
