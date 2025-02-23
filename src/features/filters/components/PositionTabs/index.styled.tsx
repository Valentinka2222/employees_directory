import styled from 'styled-components';
import { Tab } from '@mui/material';

const StyledTab = styled(Tab)`
  text-transform: capitalize;
  font-weight: ${({ theme }) => theme.typography.fontWeightRegular};
  font-size: ${({ theme }) => theme.typography.pxToRem(15)};
  margin-right: ${({ theme }) => theme.spacing(1)};
  height: 36px;
  color: ${({ theme }) => theme.palette.text.secondary};
  &.Mui-selected {
    font-weight: ${({ theme }) => theme.typography.fontWeightMedium};
    color: ${({ theme }) => theme.palette.text.primary};
  }
`;

export default StyledTab;
