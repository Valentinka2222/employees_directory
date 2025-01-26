import React, { useState, useEffect, useCallback } from 'react';
import { Link as Lnk, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Typography, Box, Skeleton, Divider } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import moment from 'moment';

import { fetchWorkersAction } from '../../redux/reducer/employeersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import { tab_names } from '../filters/components/PositionTabs/config/index';
import type { SortOrder, Employer, Employees } from '../../entities/Employees/types/index';
import UnexpectedError from '../errors/components/UnexpectedError';
import ErrorNotFound from '../errors/components/NotFound';
import TabComponent from '../filters/components/PositionTabs';

import './index.scss';

const EmployeesList: React.FC = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('birthDate');

  const { employees, loading, error } = useSelector((state: RootState) => state.employees);

  useEffect(() => {
    dispatch(fetchWorkersAction());
  }, [dispatch]);

  // Read query parameters from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('search') || '';
    const tabQuery = (queryParams.get('tab') || 'All') as keyof typeof tab_names;
    const sortQuery = (queryParams.get('sortOrder') || 'birthDate') as SortOrder;

    setSearchTerm(searchQuery);
    setCurrentTab(tabQuery);
    setSortOrder(sortQuery);

    // Ensure workers are fetched again when search or tab changes
    dispatch(fetchWorkersAction());
  }, [location.search, dispatch]); // Make sure to add `dispatch` as a dependency if it's used inside the effect

  const handleTabChange = useCallback(
    (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => {
      setCurrentTab(newValue);
      const queryParams = new URLSearchParams(location.search);
      queryParams.set('tab', newValue);
      navigate(`?${queryParams.toString()}`, { replace: true });
    },
    [navigate, location.search],
  );

  const filterAndSortWorkers = (
    employees: Employees,
    searchTerm: string,
    currentTab: keyof typeof tab_names,
  ): Employees => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filteredBySearchTerm = employees.filter((employee: Employer) => {
      const nameMatch = employee.name?.toLowerCase().includes(lowercasedSearchTerm);
      const emailMatch = employee.email?.toLowerCase().includes(lowercasedSearchTerm);
      const tagMatch = employee.tag?.toLowerCase().includes(lowercasedSearchTerm);

      return nameMatch || emailMatch || tagMatch;
    });

    return filteredBySearchTerm.filter(
      (employee: Employer) =>
        currentTab === 'All' ||
        employee.position?.toLowerCase() === tab_names[currentTab]?.toLowerCase(),
    );
  };

  const sortedWorkers = sortWorkers(employees, sortOrder);
  const filteredSortedWorkers = filterAndSortWorkers(sortedWorkers, searchTerm, currentTab);

  const showError =
    (searchTerm && filteredSortedWorkers.length === 0) || filteredSortedWorkers.length === 0;

  const skeletonArray = Array.from(new Array(12));

  const renderedBirthDates = new Set<string>();

  return (
    <ThemeProvider theme={theme}>
      <Box className="workers-list-container">
        <Box className="worker-tabs" sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabComponent
            currentTab={currentTab}
            handleTabChange={handleTabChange}
            tabNames={tab_names}
          />
        </Box>

        {loading && !error && (
          <Stack className="loading-placeholder">
            {skeletonArray.map((_, index) => (
              <Stack
                className="loading-placeholder_item"
                key={index}
                direction="row"
                spacing={2}
                alignItems="center"
              >
                <Skeleton variant="circular" width={72} height={72} />
                <Stack direction="column">
                  <Skeleton variant="text" width={150} height={28} />
                  <Skeleton variant="text" width={100} height={20} />
                </Stack>
              </Stack>
            ))}
          </Stack>
        )}

        {error && <UnexpectedError />}

        {showError && !loading && !error && <ErrorNotFound />}

        {!showError && !loading && !error && (
          <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
            {filteredSortedWorkers.map((employee: Employer) => {
              const birthDateKey = moment(employee.birthDate).format('YYYY-MM-DD');
              // Show birthdate line only if sorting by birthDate
              const showDateLine =
                sortOrder === 'birthDate' && !renderedBirthDates.has(birthDateKey);
              if (showDateLine) renderedBirthDates.add(birthDateKey);

              return (
                <React.Fragment key={employee.id}>
                  <Lnk
                    to={`/workers/${employee.id.toString()}`}
                    state={{ from: location }}
                    className="worker-list__item no-underline"
                  >
                    <Stack
                      key={employee.id}
                      className="worker-list__item"
                      direction="row"
                      spacing={2}
                      alignItems="center"
                    >
                      <Avatar
                        className="worker-list__item-avatar"
                        alt={employee.name}
                        src={employee.avatar}
                      />
                      <Stack direction="column">
                        <Typography
                          className="worker-list__item-details-name"
                          variant="subtitle1"
                          color="text.primary"
                        >
                          {employee.name}{' '}
                          <Typography
                            component="span"
                            variant="body2"
                            color="text.secondary"
                            className="worker-list__item-details-tag"
                          >
                            {employee.tag}
                          </Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {employee.position}
                        </Typography>
                      </Stack>
                      {showDateLine && (
                        <Stack className="worker-list__item-details-birthday">
                          <Typography variant="body2">
                            {moment(employee.birthDate).format('DD MMM')}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Lnk>
                  {showDateLine && (
                    <Divider sx={{ width: '100%' }} textAlign="center">
                      <Typography variant="body2" color="text.secondary">
                        {moment(employee.birthDate).format('YYYY')}
                      </Typography>
                    </Divider>
                  )}
                </React.Fragment>
              );
            })}
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
      : moment(a.birthDate).valueOf() - moment(b.birthDate).valueOf(),
  );
}

export default EmployeesList;
