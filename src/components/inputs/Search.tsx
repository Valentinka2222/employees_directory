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
  Divider,
  Collapse,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import CloseIcon from '@mui/icons-material/Close';
import styled from 'styled-components';

import { WorkersList } from '../../entities/Workers';
import type { SortOrder } from '../../entities/Workers';
import useSearchFilter from '../../hooks/useSearchFilter';

import '../../index.css';

const StyledModalContent = styled.div<{ expanded: boolean }>`
  position: absolute;
  display: flex;
  flex-direction: column;

  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};

  border-radius: 20px;
  width: 373px;
  height: 218px;
  line-height: '60px';
  padding: 0 16px 0px 16px;
  transition:
    height 0.3s ease-in-out,
    padding 0.3s ease-in-out;

  @media (max-width: 375px) {
    top: auto;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: 100%;
    height: ${({ expanded }) => (expanded ? '192px' : '34px')};
    border-radius: ${({ expanded }) => (expanded ? '20px 20px 0 0 ' : '0')};
    padding: ${({ expanded }) => (expanded ? '0 16px 0px 16px ' : '9px')};
    font-size: 16px;
  }
`;

const Search: React.FC<WorkersList> = ({ sortOrder, setSortOrder, setSearchTerm, searchTerm }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useMediaQuery('(max-width: 375px)');

  const navigate = useNavigate();
  const location = useLocation();

  useSearchFilter({ setSortOrder });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value);

  const handleClear = () => {
    setIsOpened(!isOpened);
    setSearchTerm('');
    setExpanded(false);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder = event.target.value as SortOrder;
    setSortOrder(newSortOrder);
    updateUrlWithSort(newSortOrder);
  };

  const handleClose = () => setIsOpened(false);

  const toggleExpand = () => setExpanded(!expanded);

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
            <InputAdornment className="hide" position="end">
              <IconButton onClick={handleClear} edge="end" size="small">
                <SortIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Modal open={isOpened} onClose={handleClear}>
        <StyledModalContent expanded={expanded} onClick={toggleExpand}>
          <Collapse in={expanded}>
            <Divider
              sx={{
                width: '56px',
                height: '4px',
                background: isMobile ? '#C3C3C6' : 'transparent',
                margin: '12px auto 4px',
              }}
            />
            <Typography sx={{ height: '48px', textAlign: 'center' }} variant="h6" component="h2">
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
                <CloseIcon className="hide" />
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
          </Collapse>
          <Divider
            sx={{
              width: '134px',
              height: '5px',
              background: isMobile ? '#C3C3C6' : 'transparent',
              margin: ' auto',
            }}
          />
        </StyledModalContent>
      </Modal>
    </>
  );
};

export default Search;
