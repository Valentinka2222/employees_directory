import React, { useEffect, useState } from 'react';
import { IconButton, Radio, FormControlLabel, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';

import type { SortOrder } from '../../../../../entities/Employees/types/index';

import '../index.scss';

type ModalInnerProps = {
  handleClose: () => void;
  sortOrder: SortOrder;
  handleSortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalInner: React.FC<ModalInnerProps> = ({ handleClose, handleSortChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentSortOrder, setCurrentSortOrder] = useState<SortOrder>('birthDate');

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sortQuery = queryParams.get('sortOrder') as SortOrder;
    if (sortQuery) setCurrentSortOrder(sortQuery);
    else setCurrentSortOrder('birthDate');
  }, [location.search]);

  const updateSortOrderInUrl = (newSortOrder: SortOrder) => {
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('sortOrder', newSortOrder);
    navigate(`?${queryParams.toString()}`, { replace: true });
  };

  const onSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder = event.target.value as SortOrder;
    setCurrentSortOrder(newSortOrder);
    handleSortChange(event);
    updateSortOrderInUrl(newSortOrder);
  };

  return (
    <>
      <Typography className="modalHeader" variant="h6" component="h2">
        <span className="modalTitle">Sort Options</span>
        <IconButton className="closeButton hide" onClick={handleClose} size="small">
          <CloseIcon />
        </IconButton>
      </Typography>

      <FormControlLabel
        className="formControlLabel"
        control={
          <Radio
            checked={currentSortOrder === 'name'}
            onChange={onSortChange}
            value="name"
            name="sortOrder"
          />
        }
        label="Sort by Name"
      />
      <FormControlLabel
        className="formControlLabelMargin"
        control={
          <Radio
            checked={currentSortOrder === 'birthDate'}
            onChange={onSortChange}
            value="birthDate"
            name="sortOrder"
          />
        }
        label="Sort by Date of Birth"
      />
    </>
  );
};

export default ModalInner;
