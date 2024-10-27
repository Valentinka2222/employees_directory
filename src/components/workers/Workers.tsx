import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Typography, Box, Tabs, Tab, Link, Skeleton } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import styled from 'styled-components';

import useSearchTab from '../../hooks/useSearchTab';
import { fetchWorkersAction } from '../../redux/reducer/workersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import { tab_names } from '../../data/tab';
import { SortOrder, Worker, Workers } from '../../entities/Workers';
import useSearchInput from '../../hooks/useSearchInput';

import ufo from '../../assets/ufo.png';
import icon_search from '../../assets/icon_search.png';

const StyledTab = styled(Tab)`
  text-transform: none;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  font-size: ${({ theme }) => theme.typography.pxToRem(15)};
  margin-right: ${({ theme }) => theme.spacing(1)};
  height: 36px;
  color: ${({ theme }) => theme.palette.text.secondary};
  &.Mui-selected {
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

const ErrorBox = styled(Box)`
  text-align: center;
  padding: ${({ theme }) => theme.spacing(4)};
  margin: auto;
  margin-top: 149px;
`;

interface WorkersListProps {
  sortOrder: SortOrder;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const WorkersList: React.FC<WorkersListProps> = ({ sortOrder, searchTerm, setSearchTerm }) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');

  const { workers, loading, error } = useSelector((state: RootState) => state.workers);

  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  useSearchInput({ searchTerm, currentTab });

  const { updateUrlParams } = useSearchTab({ setSearchTerm, setCurrentTab, currentTab });

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => {
      if (newValue !== currentTab) {
        setCurrentTab(newValue);
        updateUrlParams();
      }
    },
    [currentTab, updateUrlParams],
  );

  const filterAndSortWorkers = (
    workers: Workers,
    searchTerm: string,
    currentTab: keyof typeof tab_names,
  ): Workers => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredBySearchTerm = workers.filter(
      (worker: Worker) =>
        worker.name.toLowerCase().includes(lowercasedSearchTerm) ||
        worker.email.toLowerCase().includes(lowercasedSearchTerm) ||
        worker.tag.toLowerCase().includes(lowercasedSearchTerm),
    );

    // Filter by current tab
    return filteredBySearchTerm.filter(
      (worker: Worker) =>
        currentTab === 'All' ||
        worker.position.toLowerCase() === tab_names[currentTab].toLowerCase(),
    );
  };

  const sortedWorkers = sortWorkers(workers, sortOrder);
  const filteredSortedWorkers = filterAndSortWorkers(sortedWorkers, searchTerm, currentTab);

  const showError = searchTerm && filteredSortedWorkers.length === 0;

  const skeletonArray = Array.from(new Array(6));

  return (
    <ThemeProvider theme={theme}>
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

        {/* Loading state */}
        {loading && (
          <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
            {skeletonArray.map((_, index) => (
              <Stack key={index} direction="row" spacing={2} alignItems="center">
                <Skeleton variant="circular" width={72} height={72} />
                <Stack direction="column">
                  <Skeleton variant="text" width={150} height={28} />
                  <Skeleton variant="text" width={100} height={20} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}

        {/* Error state */}
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
              onClick={() => dispatch(fetchWorkersAction())}
              component="button"
              underline="none"
              sx={{
                color: 'rgba(101, 52, 255, 1)',
                margin: '0',
                lineHeight: '20px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Reload Page
            </Link>
          </ErrorBox>
        )}

        {/* No results found */}
        {showError && (
          <ErrorBox>
            <img
              src={icon_search}
              alt="No workers found"
              style={{ width: '56px', height: '56px' }}
            />
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

        {/* Display filtered workers */}
        {!showError && !loading && !error && (
          <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
            {filteredSortedWorkers.map((worker: Worker) => (
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
    </ThemeProvider>
  );
};

// Sorting function
function sortWorkers(workers: Workers, sortOrder: SortOrder): Workers {
  return [...workers].sort((a: Worker, b: Worker) =>
    sortOrder === 'name'
      ? a.name.localeCompare(b.name)
      : new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(),
  );
}

export default WorkersList;
