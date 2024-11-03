import React, { useState, ChangeEvent } from 'react';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import SortedModal from '../modal/SortedModal';

import { WorkersList } from '../../entities/Workers';

import useSearchFilter from '../../hooks/useSearchFilter';

import '../../index.scss';

const Search: React.FC<WorkersList> = ({ sortOrder, setSortOrder, setSearchTerm, searchTerm }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useSearchFilter({ setSortOrder });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const handleClear = () => {
    setIsOpened(!isOpened);
    setSearchTerm('');
    setExpanded(false);
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
            <InputAdornment className="hide" position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <SortIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <SortedModal
        sortOrder={sortOrder}
        isOpened={isOpened}
        expanded={expanded}
        setSortOrder={setSortOrder}
        setIsOpened={setIsOpened}
        setExpanded={setExpanded}
        handleClear={handleClear}
      />
    </>
  );
};

export default Search;
