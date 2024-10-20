import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  TextField,
  IconButton,
  InputAdornment,
  Modal,
  Box,
  Radio,
  FormControlLabel,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';

import { WorkersListProps } from '../../entities/Workers';
import type { SortOrder } from '../../entities/Workers';

const style = {
  position: 'absolute' as const,
  display: 'flex',
  flexDirection: 'column',
  textAlign: 'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 4,
  width: 373,
  lineHeight: 60,
  height: 192,
};

const Search: React.FC<WorkersListProps> = ({
  sortOrder,
  setSortOrder,
  setSearchTerm,
  searchTerm,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    const sortFromUrl = searchParams.get('sort') as SortOrder;

    if (sortFromUrl && (sortFromUrl === 'name' || sortFromUrl === 'birthDate'))
      setSortOrder(sortFromUrl);
  }, [location.search, setSortOrder]);

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
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
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
        </Box>
      </Modal>
    </>
  );
};

export default Search;
