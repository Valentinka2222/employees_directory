import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Divider, Collapse, useMediaQuery, Modal } from '@mui/material';
import type { SortOrder } from '../../entities/Workers';
import styled from 'styled-components';
import ModalInner from './ModalInner';

import './modal.scss';

interface SortedModalProps {
  sortOrder: SortOrder;
  isOpened: boolean;
  expanded: boolean;
  setSortOrder: (order: SortOrder) => void;
  setIsOpened: (isOpened: boolean) => void;
  setExpanded: (expanded: boolean) => void;
  handleClear: () => void;
}

const StyledModalContent = styled.div<{ expanded: boolean; isMobile: boolean }>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  transition: height 0.3s ease-in-out;
  height: ${({ expanded, isMobile }) => (isMobile ? (expanded ? '192px' : '34px') : 'auto')};

  @media (max-width: 375px) {
    padding: ${({ expanded }) => (expanded ? '8px 16px' : '9px')};
  }
`;

const SortedModal: React.FC<SortedModalProps> = ({
  sortOrder,
  isOpened,
  expanded,
  setSortOrder,
  setIsOpened,
  setExpanded,
  handleClear,
}) => {
  const isMobile = useMediaQuery('(max-width: 375px)');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isMobile) {
      setIsOpened(true);
      setExpanded(false);
    }
  }, [isMobile, setIsOpened, setExpanded]);

  const updateUrlWithSort = (sort: SortOrder) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('sort', sort);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSortOrder = event.target.value as SortOrder;
    setSortOrder(newSortOrder);
    updateUrlWithSort(newSortOrder);
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
                sortOrder={sortOrder}
                handleSortChange={handleSortChange}
              />
            </Collapse>
            <Divider className="modal-content__divider" />
          </>
        ) : (
          <ModalInner
            handleClose={() => setIsOpened(false)}
            sortOrder={sortOrder}
            handleSortChange={handleSortChange}
          />
        )}
      </StyledModalContent>
    </Modal>
  );
};

export default SortedModal;
