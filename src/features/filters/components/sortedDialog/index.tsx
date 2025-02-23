import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Divider, Collapse, useMediaQuery, Modal } from '@mui/material';
import type { SortOrder } from '../../../../entities/Employees/types/index';
import ModalInner from './sortedInner';
import type { SortedModalProps } from './types';

import StyledModalContent from './index.style';
import './index.scss';

const SortedModal: React.FC<SortedModalProps> = ({
  isSortOpened,
  isExpanded,
  setisSortOpened,
  setExpanded,
  handleClear,
}) => {
  const isMobile = useMediaQuery('(max-width: 375px)');
  const navigate = useNavigate();
  const location = useLocation();

  const currentSortOrder = (new URLSearchParams(location.search).get('sort') as SortOrder) || '';

  useEffect(() => {
    if (isMobile) {
      setisSortOpened(true);
      setExpanded(false);
    }
  }, [isMobile, isSortOpened, setExpanded]);

  const handleSortChange = (newSortOrder: SortOrder) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', newSortOrder);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const toggleExpand = () => setExpanded(!isExpanded);

  return (
    <Modal
      open={isSortOpened}
      onClose={isMobile ? undefined : handleClear}
      BackdropProps={{
        invisible: isMobile,
      }}
    >
      <StyledModalContent
        isExpanded={isExpanded}
        isMobile={isMobile}
        onClick={toggleExpand}
        className="modal-content"
      >
        {isMobile ? (
          <>
            <Collapse in={isExpanded}>
              <Divider className="modal-content__inner-divider" />
              <ModalInner
                handleClose={() => setExpanded(false)}
                sortOrder={currentSortOrder}
                handleSortChange={event => handleSortChange(event.target.value as SortOrder)}
              />
            </Collapse>
            <Divider className="modal-content__divider" />
          </>
        ) : (
          <ModalInner
            handleClose={() => setisSortOpened(false)}
            sortOrder={currentSortOrder}
            handleSortChange={event => handleSortChange(event.target.value as SortOrder)}
          />
        )}
      </StyledModalContent>
    </Modal>
  );
};

export default SortedModal;
