import React, { useState, ChangeEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TextField,
  IconButton,
  InputAdornment,
  Modal,
  Radio,
  FormControlLabel,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

import { WorkersList } from '../../entities/Workers';
import type { SortOrder } from '../../entities/Workers';
import useSearchFilter from '../../hooks/useSearchFilter';

const StyledModalContent = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  padding: 20px 16px 0 16px;
  border-radius: 20px;
  width: 373px;
  line-height: 60px;
  height: 192px;
`;

const Search: React.FC<WorkersList> = ({ sortOrder, setSortOrder, setSearchTerm, searchTerm }) => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useSearchFilter({ setSortOrder });
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const handleClear = () => {
    setIsOpened(!isOpened);
    setSearchTerm('');
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder = event.target.value as SortOrder;
    setSortOrder(newSortOrder);
    updateUrlWithSort(newSortOrder);
  };

  const handleClose = () => setIsOpened(false);

  const updateUrlWithSort = (sort: SortOrder) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', sort);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  return (
    <>
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        placeholder="Enter name, email, tag"
        value={searchTerm}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <SortIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Modal open={isOpened} onClose={handleClear}>
        <StyledModalContent>
          <Typography sx={{ height: '48px' }} variant="h6" component="h2">
            Sort Options
            <IconButton
              sx={{
                position: 'absolute',
                top: 20,
                right: 8,
              }}
              onClick={handleClose}
              size="small"
            >
              <CloseIcon />
            </IconButton>
          </Typography>
          <FormControlLabel
            sx={{ height: '40px' }}
            control={
              <Radio
                checked={sortOrder === 'name'}
                onChange={handleSortChange}
                value="name"
                name="sortOrder"
              />
            }
            label="Sort by Name"
          />
          <FormControlLabel
            sx={{ height: '40px', marginTop: '20px' }}
            control={
              <Radio
                checked={sortOrder === 'birthDate'}
                onChange={handleSortChange}
                value="birthDate"
                name="sortOrder"
              />
            }
            label="Sort by Date of Birth"
          />
        </StyledModalContent>
      </Modal>
    </>
  );
};

export default Search;
