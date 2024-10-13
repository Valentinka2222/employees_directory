import React, { useState, ChangeEvent } from 'react';
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

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpened, setIsOpened] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>('name');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setIsOpened(!isOpened);
    setSearchTerm('');
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOrder(event.target.value);
  };

  const handleClose = () => {
    setIsOpened(false); // Close the modal
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
                checked={sortOrder === 'dateOfBirth'}
                onChange={handleSortChange}
                value="dateOfBirth"
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
