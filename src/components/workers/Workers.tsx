import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { Typography, Box, Tabs, Tab, Link } from '@mui/material';
import { fetchWorkersAction } from '../../redux/reducer/workersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import { tab_names } from '../../data/tab';
import { SortOrder, Worker, Workers } from '../../entities/Workers';

import ufo from '../../assets/ufo.png';
import icon_search from '../../assets/icon_search.png';

interface WorkersListProps {
  sortOrder: SortOrder;
  searchTerm: string;
  setSearchTerm: (term: string) => void; // Add this line
}

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

  margin: 'auto',
  marginTop: '149px',
}));

const WorkersList: React.FC<WorkersListProps> = ({ sortOrder, searchTerm, setSearchTerm }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { workers, loading, error } = useSelector((state: RootState) => state.workers);
  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');

  const sortedWorkers = sortWorkers(workers, sortOrder);

  const filterAndSortWorkers = (workers: Workers, searchTerm: string): Workers => {
    if (!searchTerm) return sortedWorkers; // No search term, return sorted workers as is

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return sortedWorkers.filter(
      (worker: Worker) =>
        worker.name.toLowerCase().includes(lowercasedSearchTerm) ||
        worker.email.toLowerCase().includes(lowercasedSearchTerm) ||
        worker.tag.toLowerCase().includes(lowercasedSearchTerm),
    );
  };

  const filteredSortedWorkers = filterAndSortWorkers(sortedWorkers, searchTerm);

  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get('search');
    const tabFromUrl = searchParams.get('tab') as keyof typeof tab_names;

    if (searchFromUrl) setSearchTerm(searchFromUrl);
    if (tabFromUrl && tab_names[tabFromUrl]) setCurrentTab(tabFromUrl);
  }, [location.search, setSearchTerm]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    searchTerm ? searchParams.set('search', searchTerm) : searchParams.delete('search');
    searchParams.set('tab', currentTab);

    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [searchTerm, currentTab, navigate, location.pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => {
    setCurrentTab(newValue);
  };

  const filteredWorkers = filteredSortedWorkers.filter(
    (worker: Worker) =>
      currentTab === 'All' || worker.position.toLowerCase() === tab_names[currentTab].toLowerCase(),
  );

  // Determine whether to show the error message for no workers found
  const showError = searchTerm && filteredWorkers.length === 0;

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
            <StyledTab key={tab} label={tab} value={tab as keyof typeof tab_names} />
          ))}
        </Tabs>
      </Box>

      {loading && (
        <Typography variant="h6" textAlign="center">
          Loading...
        </Typography>
      )}

      {error && (
        <ErrorBox>
          <img src={ufo} alt="Error occurred" style={{ width: '56px', height: '56px' }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: 'text.primary', marginBottom: '15px' }}
          >
            Unexpected error occurred...
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: '15px' }}>
            Try again a bit later.
          </Typography>
          <Link
            href={window.location.href}
            underline="none"
            sx={{
              color: 'rgba(101, 52, 255, 1)',
              margin: '0',

              lineHeight: '20px',
              fontWeight: '600',
            }}
          >
            Reload Page
          </Link>
        </ErrorBox>
      )}

      {showError && (
        <ErrorBox>
          <img src={icon_search} alt="No workers found" style={{ width: '56px', height: '56px' }} />
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: 'text.primary', marginBottom: '12px' }}
          >
            We did not find anyone
          </Typography>
          <Typography sx={{ marginBottom: '12px' }} variant="body1" color="text.secondary">
            Try to adjust your request
          </Typography>
        </ErrorBox>
      )}

      {!showError && !loading && !error && (
        <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
          {filteredWorkers.map((worker: Worker) => (
            <Stack
              key={worker.id}
              direction="row"
              spacing={2}
              alignItems="center"
              sx={{ height: '80px' }}
            >
              <Avatar
                sx={{ height: '72px', width: '72px' }}
                alt={worker.name}
                src={worker.avatar}
              />
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
      )}
    </Box>
  );
};

export default WorkersList;

function sortWorkers(workers: Workers, sortOrder: SortOrder): Workers {
  return [...workers].sort((a: Worker, b: Worker) =>
    sortOrder === 'name'
      ? a.name.localeCompare(b.name)
      : new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(),
  );
}
