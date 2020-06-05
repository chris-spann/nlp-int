import React from 'react';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Stretch from './Stretch';
import Wrapper from './Wrapper';
import logo from './logo.svg';

import './Header.css';
import SentForm from '../SentForm/SentForm';
import FrequencyReportForm from '../FrequencyReportForm/FrequencyReportForm';
import MatcherForm from '../MatcherForm/MatcherForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
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
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    fontFamily: 'LyftPro-Regular',
  },
  indicator: {
    backgroundColor: 'white',
    border: 'none',
    outline: 'none',
  },
  tab: {
    fontFamily: 'LyftPro-Regular',
  },
});

const Header: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Wrapper>
        <a href="/">
          <img alt="" src={logo} width="60" height="60" />
          <Typography variant="h6" className="d-inline-block txt">
            JTA
          </Typography>
        </a>
        <Stretch />
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="inherit"
          classes={{ indicator: classes.indicator }}
          centered
        >
          <Tab label="Home" {...a11yProps(0)} />
          <Tab label="Freq Report" {...a11yProps(1)} />
          <Tab label="Phrases" {...a11yProps(2)} />
          <Tab label="Sentiment" {...a11yProps(3)} />
          <Tab label="Test" {...a11yProps(4)} />
        </Tabs>
        <Stretch />
      </Wrapper>
      {/* Push content below Header */}

      <TabPanel value={value} index={0}>
        {/* Push content below Header */}
        <Typography>yyy></Typography>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>yyy></Typography>
        <FrequencyReportForm />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>yyy></Typography>
        <MatcherForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Typography>yyy></Typography>
        <SentForm />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Typography>yyy></Typography>
      </TabPanel>
    </>
  );
};
export default Header;
