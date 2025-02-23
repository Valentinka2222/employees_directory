import React from 'react';
import { Tabs } from '@mui/material';
import { tab_names } from './config';
import type { TabComponentProps } from './types';

import StyledTab from './index.styled';

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
        <StyledTab key={tab} label={tab} value={tab as keyof typeof tab_names} />
      ))}
    </Tabs>
  );
};

export default TabComponent;
