import React, { useState, useEffect, useCallback } from 'react';
import { Link as Lnk } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Typography, Box, Tabs, Tab, Link, Skeleton, Divider } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import moment from 'moment';

import useSearchTab from '../../hooks/useSearchTab';
import { fetchWorkersAction } from '../../redux/reducer/employeersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import { tab_names } from '../../data/tab';
import { SortOrder, Employer, Employees } from '../../entities/Employees';
import useSearchInput from '../../hooks/useSearchInput';

import ufo from '../../assets/ufo.png';
import icon_search from '../../assets/icon_search.png';

import './employeesList.scss';

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

interface EmployeesListProps {
  sortOrder: SortOrder;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ sortOrder, searchTerm, setSearchTerm }) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');

  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

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
    employees: Employees,
    searchTerm: string,
    currentTab: keyof typeof tab_names,
  ): Employees => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredBySearchTerm = employees.filter(
      (worker: Employer) =>
        worker.name.toLowerCase().includes(lowercasedSearchTerm) ||
        worker.email.toLowerCase().includes(lowercasedSearchTerm) ||
        worker.tag.toLowerCase().includes(lowercasedSearchTerm),
    );

    return filteredBySearchTerm.filter(
      (worker: Employer) =>
        currentTab === 'All' ||
        worker.position.toLowerCase() === tab_names[currentTab].toLowerCase(),
    );
  };

  const sortedWorkers = sortWorkers(employees, sortOrder);
  const filteredSortedWorkers = filterAndSortWorkers(sortedWorkers, searchTerm, currentTab);

  const showError = searchTerm && filteredSortedWorkers.length === 0;

  const skeletonArray = Array.from(new Array(6));

  return (
    <ThemeProvider theme={theme}>
      <Box className="workers-list-container">
        <Box className="worker-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
          <Stack className="loading-placeholder" sx={{ padding: 2 }}>
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
          <Box className="error-box">
            <img className="error-box__image" src={ufo} alt="Error occurred" />
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
        )}

        {/* No results found */}
        {showError && (
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
        )}

        {/* Display filtered workers */}
        {!showError && !loading && !error && (
          <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
            {filteredSortedWorkers.map((worker: Employer) => (
              <Lnk
                to={`/workers/${worker.id.toString()}`}
                key={worker.id}
                className="worker-list__item no-underline"
              >
                <Stack
                  key={worker.id}
                  className="worker-list__item"
                  direction="row"
                  spacing={2}
                  alignItems="center"
                >
                  <Avatar
                    className="worker-list__item-avatar"
                    alt={worker.name}
                    src={worker.avatar}
                  />
                  <Stack direction="column">
                    <Typography
                      className="worker-list__item-details-name"
                      variant="subtitle1"
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
                    <Typography variant="body2" color="text.secondary">
                      {worker.position}
                    </Typography>
                  </Stack>
                  <Stack className="worker-list__item-details-birthday">
                    <Typography variant="body2">
                      {moment(worker.birthDate).format('DD MMM')}
                    </Typography>
                  </Stack>
                </Stack>
                {/* Divider with centered date of birth */}

                <Divider sx={{ width: '100%' }} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    {moment(worker.birthDate).format('YYYY')}
                  </Typography>
                </Divider>
              </Lnk>
            ))}
          </Stack>
        )}
      </Box>
    </ThemeProvider>
  );
};

function sortWorkers(employees: Employees, sortOrder: SortOrder): Employees {
  return [...employees].sort((a: Employer, b: Employer) =>
    sortOrder === 'name'
      ? a.name.localeCompare(b.name)
      : new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime(),
  );
}

export default EmployeesList;
