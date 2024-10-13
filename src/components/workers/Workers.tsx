import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkersAction } from '../../redux/reducer/workersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Typography, Box, Tabs, Tab, Link } from '@mui/material';
import { tab_names } from '../../data/tab';
import { Workers } from '../../entities/Workers';
import ufo from '../../assets/ufo.png';

// Styled components
const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  height: '36px',
  color: theme.palette.text.secondary,
  '&.Mui-selected': {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
  },
}));

const ErrorBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(4),
}));

const WorkersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { workers, loading, error } = useSelector((state: RootState) => state.workers);
  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');

  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  if (loading) {
    return (
      <Typography variant="h6" textAlign="center">
        Loading...
      </Typography>
    );
  }

  if (error) {
    return (
      <ErrorBox>
        <img src={ufo} alt="Error occurred" style={{ width: '56px', height: '56px' }} />
        <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Unexpected error occurred...
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Try again a bit later.
        </Typography>
        <Link href={window.location.href} underline="none" sx={{ color: 'rgba(101, 52, 255, 1)' }}>
          Reload Page
        </Link>
      </ErrorBox>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => {
    setCurrentTab(newValue);
  };

  const filteredWorkers = workers.filter(
    (worker: Workers) =>
      currentTab === 'All' || worker.position.toLowerCase() === tab_names[currentTab].toLowerCase(),
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          indicatorColor="secondary"
          variant="fullWidth"
          value={currentTab}
          onChange={handleTabChange}
          aria-label="worker tabs"
        >
          {Object.keys(tab_names).map(tab => (
            <StyledTab key={tab} label={tab} value={tab} />
          ))}
        </Tabs>
      </Box>
      <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
        {filteredWorkers.map((worker: Workers) => (
          <Stack
            key={worker.id}
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{ height: '80px' }}
          >
            <Avatar sx={{ height: '72px', width: '72px' }} alt={worker.name} src={worker.avatar} />
            <Stack direction="column">
              <Typography variant="subtitle1" color="text.primary" sx={{ fontWeight: 500 }}>
                {worker.name}{' '}
                <Typography
                  component="span"
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontWeight: 400 }}
                >
                  {worker.tag}
                </Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {worker.position}
              </Typography>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

export default WorkersList;
