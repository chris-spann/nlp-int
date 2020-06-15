import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SentForm from './components/SentForm/SentForm';
import FrequencyReportForm from './components/FrequencyReportForm/FrequencyReportForm';
import MatcherForm from './components/MatcherForm/MatcherForm';
import BatchSentiment from './components/BatchSentiment/BatchSentiment';

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    textTransform: 'none',
  },
  tab: {
    fontFamily: 'LyftPro-Regular',
    textTransform: 'none',
  },
  indicator: {
    width: 6,
    backgroundColor: '#420499',
  },
}));

const Tools = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        textColor="primary"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        classes={{ indicator: classes.indicator }}
      >
        <Tab
          className={classes.tab}
          label="Frequency Report"
          {...a11yProps(0)}
        />
        <Tab className={classes.tab} label="Phrase Matcher" {...a11yProps(1)} />
        <Tab
          className={classes.tab}
          label="Sentiment Calculator"
          {...a11yProps(2)}
        />
        <Tab
          className={classes.tab}
          label="Batch Sentiment"
          {...a11yProps(3)}
        />
        <Tab className={classes.tab} label="LDA Modeler" {...a11yProps(4)} />
        <Tab className={classes.tab} label="NNMF Modeler" {...a11yProps(5)} />
        <Tab className={classes.tab} label="Contact" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        {/* <FrequencyReportForm /> */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* <MatcherForm /> */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        <SentForm />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <BatchSentiment />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Latent Dirichlet Allocation
      </TabPanel>
      <TabPanel value={value} index={5}>
        Non-Negative Matrix Factorization
      </TabPanel>
      <TabPanel value={value} index={6}>
        <pre>
          Questions? Contact:{' '}
          <a
            href="https://lyft.enterprise.slack.com/user/@WJMFR38SX"
            target="_blank"
            rel="noopener noreferrer"
          >
            Chris Spann
          </a>
        </pre>
      </TabPanel>
    </div>
  );
};
export default Tools;
