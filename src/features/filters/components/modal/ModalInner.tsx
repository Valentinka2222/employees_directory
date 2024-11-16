import React from 'react';
import { IconButton, Radio, FormControlLabel, Typography } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import type { SortOrder } from '../../../../entities/Employees';

import './modal.scss';

interface ModalInnerProps {
  handleClose: () => void;
  sortOrder: SortOrder;
  handleSortChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ModalInner: React.FC<ModalInnerProps> = ({ handleClose, sortOrder, handleSortChange }) => {
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
            checked={sortOrder === 'name'}
            onChange={handleSortChange}
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
            checked={sortOrder === 'birthDate'}
            onChange={handleSortChange}
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
