import React, { useState, ChangeEvent } from 'react';
import { TextField, IconButton, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    height: '40px',
    '& fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'light' ? '#B2BAC2' : '#6F7E8C',
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <StyledTextField
      fullWidth
      variant="outlined"
      size="small"
      placeholder="Search..."
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
  );
};

export default Search;
