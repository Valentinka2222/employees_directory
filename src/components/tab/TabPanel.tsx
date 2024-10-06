import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useTheme, styled } from '@mui/material/styles';
import { tab_names } from '../../data/tab';

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
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  '&.Mui-selected': {
    fontWeight: theme.typography.fontWeightMedium,
    color: theme.palette.text.primary,
  },
  '& .MuiTabs-flexContainer': {
    justifyContent: 'space-between',
  },
  '& .css-yk2v1h-MuiTabs-root': {
    height: '36px',
  },
  '& .MuiTab-root': {
    color: theme.palette.text.secondary,
    height: '36px',
  },
  '& .Mui-selected': {
    color: theme.palette.text.primary,
  },
}));

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
        >
          {tab_names.map((t: string, i: number) => (
            <StyledTab key={i} label={t} {...a11yProps(i)} sx={{ flexGrow: 1 }} />
          ))}
        </Tabs>
      </Box>
      {tab_names.map((t: string, i: number) => (
        <TabPanel key={i} value={value} index={i}>
          {`Content for ${t}`}
        </TabPanel>
      ))}
    </Box>
  );
}
