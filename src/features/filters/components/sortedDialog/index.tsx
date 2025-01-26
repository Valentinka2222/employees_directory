import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Divider, Collapse, useMediaQuery, Modal } from '@mui/material';
import type { SortOrder } from '../../../../entities/Employees/types/index';
import styled from 'styled-components';
import ModalInner from './sortedInner';

import './index.scss';

type SortedModalProps = {
  isOpened: boolean;
  expanded: boolean;
  setIsOpened: (isOpened: boolean) => void;
  setExpanded: (expanded: boolean) => void;
  handleClear: () => void;
};

const StyledModalContent = styled.div<{ expanded: boolean; isMobile: boolean }>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  transition: height 0.3s ease-in-out;

  height: ${({ expanded, isMobile }) => (isMobile ? (expanded ? '192px' : '34px') : '218px')};

  @media (max-width: 375px) {
    padding: ${({ expanded }) => (expanded ? '8px 16px' : '9px')};
  }
`;

const SortedModal: React.FC<SortedModalProps> = ({
  isOpened,
  expanded,
  setIsOpened,
  setExpanded,
  handleClear,
}) => {
  const isMobile = useMediaQuery('(max-width: 375px)');
  const navigate = useNavigate();
  const location = useLocation();

  const currentSortOrder = (new URLSearchParams(location.search).get('sort') as SortOrder) || '';

  useEffect(() => {
    if (isMobile) {
      setIsOpened(true);
      setExpanded(false);
    }
  }, [isMobile, setIsOpened, setExpanded]);

  const handleSortChange = (newSortOrder: SortOrder) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', newSortOrder);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Modal
      open={isOpened}
      onClose={isMobile ? undefined : handleClear}
      BackdropProps={{
        invisible: isMobile,
      }}
    >
      <StyledModalContent
        expanded={expanded}
        isMobile={isMobile}
        onClick={toggleExpand}
        className="modal-content"
      >
        {isMobile ? (
          <>
            <Collapse in={expanded}>
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
            handleClose={() => setIsOpened(false)}
            sortOrder={currentSortOrder}
            handleSortChange={event => handleSortChange(event.target.value as SortOrder)}
          />
        )}
      </StyledModalContent>
    </Modal>
  );
};

export default SortedModal;
