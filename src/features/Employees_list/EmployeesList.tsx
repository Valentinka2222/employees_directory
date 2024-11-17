import React, { useState, useEffect, useCallback } from 'react';
import { Link as Lnk, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Stack, Typography, Box, Tabs, Tab, Skeleton, Divider } from '@mui/material';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import styled from 'styled-components';
import moment from 'moment';

import useSearchTab from '../../hooks/useSearchTab';
import { fetchWorkersAction } from '../../redux/reducer/employeersReducer';
import { RootState, AppDispatch } from '../../redux/store/store';
import { tab_names } from '../../data/tab';
import { SortOrder, Employer, Employees } from '../../entities/Employees';
import UnexpectedError from '../errors/UnexpectedError';
import ErrorNotFound from '../errors/NotFound';
import useSearchInput from '../../hooks/useSearchInput';

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

        {error && <UnexpectedError />}

        {showError && <ErrorNotFound />}

        {!showError && !loading && !error && (
          <Stack direction="column" spacing={2} sx={{ padding: 2 }}>
            {filteredSortedWorkers.map((employee: Employer) => (
              <Lnk
                to={`/workers/${employee.id.toString()}`}
                state={{ from: location }}
                key={employee.id}
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
                  <Stack className="worker-list__item-details-birthday">
                    <Typography variant="body2">
                      {moment(employee.birthDate).format('DD MMM')}
                    </Typography>
                  </Stack>
                </Stack>
                <Divider sx={{ width: '100%' }} textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    {moment(employee.birthDate).format('YYYY')}
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
