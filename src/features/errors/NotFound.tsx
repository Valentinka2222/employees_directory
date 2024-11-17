import { Typography, Box } from '@mui/material';

import icon_search from '../../assets/icon_search.png';

import './error.scss';

const ErrorNotFound = () => {
  return (
    <Box className="error-box">
      <img src={icon_search} alt="No workers found" className="error-box__image" />
      <Typography
        variant="h5"
        className="error-box__title"
        sx={{ marginBottom: '12px' }}
        color="text.primary"
      >
        We did not find anyone
      </Typography>
      <Typography
        sx={{ marginBottom: '12px' }}
        className="error-box__text"
        variant="body1"
        color="text.secondary"
      >
        Try to adjust your request
      </Typography>
    </Box>
  );
};
export default ErrorNotFound;
