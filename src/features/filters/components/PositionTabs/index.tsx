import React from 'react';
import { Tabs } from '@mui/material';
import { tab_names } from './config';

import StyledTab from './index.styled';

interface TabComponentProps {
  currentTab: string;
  handleTabChange: (event: React.SyntheticEvent, newValue: keyof typeof tab_names) => void; // Expecting keyof typeof tab_names
  tabNames: Record<string, string>;
}

const TabComponent: React.FC<TabComponentProps> = ({ currentTab, handleTabChange, tabNames }) => {
  return (
    <Tabs
      indicatorColor="secondary"
      variant="fullWidth"
      value={currentTab}
      onChange={handleTabChange}
      aria-label="worker tabs"
    >
      {Object.keys(tabNames).map(tab => (
        <StyledTab key={tab} label={tab} value={tab} />
      ))}
    </Tabs>
  );
};

export default TabComponent;
