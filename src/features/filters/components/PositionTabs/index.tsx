import React from 'react';
import { Tabs } from '@mui/material';
import { tab_names } from './config';

import StyledTab from './index.styled';

interface TabComponentProps {
  currentTab: keyof typeof tab_names; // Change to keyof typeof tab_names
  handleTabChange: (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => void;
  tabNames: Record<string, string>;
}

const TabComponent: React.FC<TabComponentProps> = ({ currentTab, handleTabChange, tabNames }) => {
  return (
    <Tabs
      indicatorColor="secondary"
      variant="fullWidth"
      value={currentTab} // Ensure this matches the tab values
      onChange={handleTabChange}
      aria-label="worker tabs"
    >
      {Object.keys(tabNames).map(tab => (
        <StyledTab key={tab} label={tab} value={tab as keyof typeof tab_names} />
      ))}
    </Tabs>
  );
};

export default TabComponent;
