import React, { useState, useEffect, useCallback } from 'react';
import { Link as Lnk, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Typography, Box, Tabs, Skeleton, Divider } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';

import moment from 'moment';

import useSearchTab from '../../hooks/useSearchTab';
import { fetchWorkersAction } from '../../redux/reducer/employeersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import { tab_names } from '../../data/tab';
import { SortOrder, Employer, Employees } from '../../entities/Employees';
import UnexpectedError from '../errors/components/UnexpectedError';
import ErrorNotFound from '../errors/components/NotFound';
import useSearchInput from '../../hooks/useSearchInput';

import './index.scss';
import StyledTab from './index.styled';

interface EmployeesListProps {
  sortOrder: SortOrder;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ sortOrder, searchTerm, setSearchTerm }) => {
  const showBirthdateLine = sortOrder === 'birthDate';

  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState<keyof typeof tab_names>('All');
  const location = useLocation();

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
      (employee: Employer) =>
        employee.name.toLowerCase().includes(lowercasedSearchTerm) ||
        employee.email.toLowerCase().includes(lowercasedSearchTerm) ||
        employee.tag.toLowerCase().includes(lowercasedSearchTerm),
    );

    return filteredBySearchTerm.filter(
      (employee: Employer) =>
        currentTab === 'All' ||
        employee.position.toLowerCase() === tab_names[currentTab].toLowerCase(),
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
              const showDateLine = showBirthdateLine && !renderedBirthDates.has(birthDateKey);
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
