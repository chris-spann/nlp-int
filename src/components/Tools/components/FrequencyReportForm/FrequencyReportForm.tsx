import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import './FrequencyReportForm.css';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Icons } from 'material-table';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: '95%',
      },
      flexGrow: 1,
      fontFamily: 'LyftPro-Regular',
    },
  })
);

const tableIcons: Icons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const FrequencyReportForm: React.FC = () => {
  const classes = useStyles();
  const [filePath, setFilePath] = useState('');
  const [wordFreq, setWordFreq] = useState('');
  const [bigramFreq, setBigramFreq] = useState('');
  const [trigramFreq, setTrigramFreq] = useState('');
  const [response, setResponse] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const handleFilePathChange = (event: any) => {
    setFilePath(event.target.value);
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    console.log('Starting FrequencyReport...');
    console.log('Submitted filepath: ' + filePath);
    axios
      .post('/get_freq', {
        filepath: filePath,
      })
      .then((res) => {
        setWordFreq(res.data.word_freq);
        setBigramFreq(res.data.bigram_freq);
        setTrigramFreq(res.data.Trigram_freq);
        console.log(wordFreq);
        console.log(bigramFreq);
        console.log(trigramFreq);

        console.log('Ending FrequencyReport.');
      })
      .catch((error) => {
        console.log(error);
      });
    // Setting the input box back to empty
    // setFilePath("")
  };
  return (
    <>
      <div className="cards">
        <Paper variant="outlined" style={{ width: '22rem', height: '38rem' }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={formSubmit}
          >
            <Typography variant="h5">Frequency Report</Typography>
            <TextField
              id="standard-basic"
              label="Path to file..."
              // value={text || ''}
              onChange={handleFilePathChange}
            />
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: '#420499',
                color: 'white',
              }}
            >
              Get Frequency
            </Button>
          </form>
        </Paper>
        <Paper variant="outlined" style={{ width: '45rem', height: '35rem' }}>
          <Typography
            align="center"
            style={{ paddingTop: 10, paddingBottom: 10 }}
            variant="h5"
          >
            Results
          </Typography>

          <MaterialTable
            icons={tableIcons}
            isLoading={loading}
            columns={[
              {
                title: 'Word',
                field: 'word',
                sorting: false,
                width: 'auto',
                disableClick: true,
              },
              {
                title: 'Count',
                field: 'count',
                sorting: true,
                width: 'auto',
              },
              {
                cellStyle: {
                  fontFamily: 'LyftPro-Regular',
                },
              },
            ]}
            data={response}
            // style={{
            //   fontFamily: 'LyftPro-Regular',
            //   fontSize: '10',
            // }}
            options={{
              showTitle: false,
              pageSize: 10,
              pageSizeOptions: [10, 25, 100],
              overflowY: 'scroll',
              toolbar: true,
              exportButton: true,
              maxBodyHeight: 438,
              headerStyle: {
                width: 26,
                whiteSpace: 'nowrap',
                textAlign: 'center',
                flexDirection: 'row',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                paddingLeft: 5,
                paddingRight: 5,
                backgroundColor: '#420499',
                fontFamily: 'LyftPro-Regular',
                fontWeight: 'bold',
                color: 'white',
                paddingTop: 1,
                paddingBottom: 1,
              },
            }}
          />
        </Paper>
      </div>
    </>
  );
};
export default FrequencyReportForm;
