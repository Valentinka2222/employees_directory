 import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

  
export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
          value={value}         
          indicatorColor="secondary"
          textColor="primary"
          onChange={handleChange} 
          aria-label="basic tabs example"
          variant="fullWidth"  
          sx={{ 
            '& .MuiTabs-flexContainer': {
              justifyContent: 'space-between',
            },
            '& .MuiTab-root': {
              color: theme.palette.text.primary, // This sets the text color to 'black' as defined in your theme
              },
  
          }}
        >
          <Tab label="Item One" {...a11yProps(0)} sx={{ flexGrow: 1 }} />
          <Tab label="Item Two" {...a11yProps(1)} sx={{ flexGrow: 1 }} />
          <Tab label="Item Three" {...a11yProps(2)} sx={{ flexGrow: 1 }} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </Box>
  );
}