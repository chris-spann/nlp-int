import React from 'react';
import { Box, Tab, Tabs, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Stretch from './Stretch';
import Wrapper from './Wrapper';
import logo from './logo.svg';
import Tools from '../Tools/Tools';
import './index.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    indicator: {
      backgroundColor: 'white',
      border: 'none',
      outline: 'none',
      height: 3,
    },
    tab: {
      fontFamily: 'LyftPro-Regular',
      fontSize: 12,
      textTransform: 'none',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
    toolbar: theme.mixins.toolbar,
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      minHeight: '50px',
    },
  })
);

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

const App: React.FC = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(4);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <div className={classes.tab}>
        <Wrapper>
          <a href="/">
            <img alt="" src={logo} width="72" height="50" />
            <Typography variant="subtitle2" className="d-inline-block txt">
              JARVIS
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
            <Tab className={classes.tab} label="Team" {...a11yProps(0)} />
            <Tab className={classes.tab} label="Audiences" {...a11yProps(1)} />
            <Tab className={classes.tab} label="My Views" {...a11yProps(2)} />
            <Tab
              className={classes.tab}
              label="Conversations"
              {...a11yProps(3)}
            />
            <Tab className={classes.tab} label="Tools" {...a11yProps(4)} />
          </Tabs>
          <Stretch />
        </Wrapper>
        {/* <div className={classes.toolbar} /> */}
        <TabPanel value={value} index={0}></TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
        <TabPanel value={value} index={3}></TabPanel>
        <TabPanel value={value} index={4}>
          <Tools />
        </TabPanel>
      </div>
    </>
  );
};

export default App;
