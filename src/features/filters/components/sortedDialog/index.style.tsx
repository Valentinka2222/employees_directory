import styled from 'styled-components';

const StyledModalContent = styled.div<{ isExpanded: boolean; isMobile: boolean }>`
  background-color: ${({ theme }) => theme.palette.background.paper};
  box-shadow: ${({ theme }) => theme.shadows[5]};
  transition: height 0.3s ease-in-out;

  height: ${({ isExpanded, isMobile }) => (isMobile ? (isExpanded ? '192px' : '34px') : '218px')};

  @media (max-width: 375px) {
    padding: ${({ isExpanded }) => (isExpanded ? '8px 16px' : '9px')};
  }
`;

export default StyledModalContent;
