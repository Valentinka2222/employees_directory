import React, { useState, ChangeEvent } from 'react';
import { TextField, IconButton, InputAdornment, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '20px',
    height: '24px', // Set the overall height to 40px
    padding: '0 14px', // Adjust padding as needed
    display: 'flex',
    alignItems: 'center',

    '& input': {
      height: '24px', // Set the input height to 24px
      padding: '0', // Remove default padding
    },

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
  '& .MuiInputAdornment-root': {
    height: '24px', // Adjust the height of the adornments
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
  );
};

export default Search;
