import React, { useState, ChangeEvent, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import SortedModal from '../sortedDialog';

import '../../../../index.scss';

const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);

  // Extract search query from URL params
  const queryParams = new URLSearchParams(location.search);
  const searchParam = queryParams.get('search') || '';

  const [searchTerm, setSearchTerm] = useState(searchParam);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    // Update URL with new search term
    queryParams.set('search', newSearchTerm);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const handleClear = () => {
    setSearchTerm('');
    queryParams.delete('search');
    navigate(`?${queryParams.toString()}`, { replace: true });

    setIsOpened(!isOpened);
    setExpanded(false);
  };

  // Keep `searchTerm` in sync with the URL on location change
  useEffect(() => {
    const updatedSearchParam = queryParams.get('search') || '';
    setSearchTerm(updatedSearchParam);
  }, [location.search]);

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
            <InputAdornment className="hide" position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <SortIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <SortedModal
        isOpened={isOpened}
        expanded={expanded}
        setIsOpened={setIsOpened}
        setExpanded={setExpanded}
        handleClear={handleClear}
      />
    </>
  );
};

export default Search;
