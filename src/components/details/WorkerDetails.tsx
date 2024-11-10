import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import { useParams, Link } from 'react-router-dom';

import { Box, Stack, Typography, Avatar } from '@mui/material';

import { fetchWorkersAction } from '../../redux/reducer/workersReducer';
import { Worker } from '../../entities/Workers';
import { RootState, AppDispatch } from '../../redux/store/store';

import star from '../../assets/star.png';
import phone from '../../assets/phone.png';
import right_arrow from '../../assets/right_arrow.png';

import './workerDetails.scss';

const WorkerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const { workers } = useSelector((state: RootState) => state.workers);
  const worker = workers.find((worker: Worker) => worker.id === id);

  useEffect(() => {
    if (!workers.length) {
      dispatch(fetchWorkersAction());
    }
  }, [dispatch, workers]);

  return (
    <Box className="worker-details">
      <Box className="worker-details__header">
        <Link to="/">
          <img src={right_arrow} alt="Go back" />
        </Link>
      </Box>
      {worker && (
        <Stack className="worker-details__info-card" spacing={2}>
          <Avatar alt={worker.name} src={worker.avatar} />
          <Stack direction="column">
            <Typography
              className="worker-details__info-card__name"
              variant="subtitle2"
              color="text.primary"
            >
              {worker.name}{' '}
              <Typography
                component="span"
                variant="body2"
                color="text.secondary"
                className="worker-list__item-details-tag"
              >
                {worker.tag}
              </Typography>
            </Typography>
            <Typography
              className="worker-details__info-card__position"
              textAlign="center"
              variant="body2"
              color="text.secondary"
            >
              {worker.position}
            </Typography>
          </Stack>
        </Stack>
      )}
      {worker && (
        <Box>
          <Box className="worker-details__details-item">
            <img src={star} alt="Birthday" />
            <Typography variant="body1">
              {moment(worker.birthDate).format('D MMMM YYYY')}
            </Typography>
          </Box>
          <Box className="worker-details__details-item">
            <img height="28px" src={phone} alt="Phone" />
            <Typography variant="body1">{worker.phone}</Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default WorkerDetails;
