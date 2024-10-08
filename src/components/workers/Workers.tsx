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

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
  },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
  },
  '& .css-yk2v1h-MuiTabs-root': {
    height: '36px',
  },
  '& .MuiTab-root': {
    color: theme.palette.text.secondary,
    height: '36px',
  },
  '& .Mui-selected': {
    color: theme.palette.text.primary,
  },
}));

const WorkersList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { workers, loading, error } = useSelector((state: RootState) => state.workers);
  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');

  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <Box sx={{ textAlign: 'center', padding: 4 }}>
        <img src={ufo} alt="Error occurred" style={{ width: '56px', height: '56px' }} />
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontSize: '17px',
            fontWeight: 600,
            lineHeight: '22px',
            color: 'text.primary',
          }}
          component="h5"
        >
          Unexpected error occurred...
        </Typography>
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '20px',
            color: 'rgba(151, 151, 155, 1)',
          }}
          component="h5"
        >
          Try again a bit later
        </Typography>
        <Link sx={{ color: ' rgba(101, 52, 255, 1)' }} href={window.location.href} underline="none">
          Reload Page
        </Link>
      </Box>
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
          sx={{ width: 'max-content' }}
        >
          {Object.keys(tab_names).map(tab => (
            <StyledTab key={tab} label={tab} value={tab} sx={{ flexGrow: 1 }} />
          ))}
        </Tabs>
      </Box>
      <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
        {filteredWorkers.map((worker: Workers) => (
          <Stack
            sx={{ height: '80px' }}
            key={worker.id}
            direction="row"
            spacing={2}
            alignItems="center"
          >
            <Avatar sx={{ height: '72px', width: '72px' }} alt={worker.name} src={worker.avatar} />
            <Stack direction="column">
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontSize: '16px',
                  fontWeight: 500,
                  lineHeight: '20px',
                  textAlign: 'left',
                  color: 'text.primary',
                }}
                variant="subtitle1"
              >
                {worker.name}{' '}
                <Typography
                  component="span"
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: '13px',
                    fontWeight: 400,
                    lineHeight: '16px',
                    textAlign: 'left',
                    color: 'text.secondary',
                    display: 'inline',
                  }}
                  variant="body2"
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
