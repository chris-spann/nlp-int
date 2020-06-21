import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
// import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Chart from 'react-google-charts';
import MaterialTable from 'material-table';
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
import './MatcherForm.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexWrap: 'wrap',
      flexGrow: 1,
      fontFamily: 'LyftPro-Regular',
      '& > *': {
        margin: theme.spacing(1),
        width: '95%',
      },
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

interface Props {
  phrases?: string;
  matches?: {
    lyft_id: BigInteger;
    message: string;
  };
}
const MatcherForm: React.FC<Props> = (matches, phrases) => {
  const classes = useStyles();
  const [searchPhrases, setSearchPhrases] = useState('');
  const [filePath, setFilePath] = useState('');
  const [poolSize, setPoolSize] = useState(0);
  const [response, setResponse] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const handlePhrasesChange: React.ChangeEventHandler = (event: any) => {
    setSearchPhrases(event.target.value);
  };
  const handleFilePathChange: React.ChangeEventHandler = (event: any) => {
    setFilePath(event.target.value);
  };

  const handleFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    setLoading(true);
    console.log('Starting PHRASE MATCHER...');
    console.log('Submitted phrases: ' + phrases);
    console.log('Submitted filepath: ' + filePath);
    axios
      .post('/get_matches', {
        phrases: searchPhrases,
        filepath: filePath,
      })
      .then((res) => {
        setResponse(JSON.parse(res.data.matches));
        setSearchPhrases(res.data.phrases);
        setPoolSize(res.data.numCon);
        setLoading(false);
        console.log(res.status);
        console.log(res.data.matches);
        console.log('Number of matches: ' + res.data.matches.length);
        console.log('Returned phrases: ' + searchPhrases);
        console.log('Ending PHRASE MATCHER.');
      })
      .catch((error) => {
        console.log(error);
      });
    // Setting the input box back to empty
    // setPhrases("")
  };
  const columns = [
    {
      name: 'lyft_id',
      selector: 'lyft_id',
      sortable: false,
      right: true,
      maxWidth: '170px',
    },
    {
      name: 'message',
      selector: 'message',
      sortable: false,
    },
  ];

  return (
    <>
      <div className="cards">
        <Paper variant="outlined" style={{ width: '22rem', height: '38rem' }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleFormSubmit}
          >
            <Typography variant="h5">Phrase Matcher</Typography>
            <TextField
              id="standard-required"
              label="Comma-separated phrases..."
              value={searchPhrases}
              onChange={handlePhrasesChange}
            />
            <TextField
              id="standard-basic"
              label="Path to file..."
              onChange={handleFilePathChange}
            />
            <Button
              variant="contained"
              style={{
                backgroundColor: '#420499',
                color: 'white',
              }}
              type="submit"
            >
              Find Matches
            </Button>
          </form>
          <pre>Phrases: {searchPhrases}</pre>
          <pre>Matches: {response.length}</pre>
          <pre>Convos Scanned: {poolSize}</pre>
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
                title: 'Lyft ID',
                field: 'lyft_id',
                sorting: false,
                width: 'auto',
                disableClick: true,
              },
              {
                title: 'Message',
                field: 'message',
                sorting: false,
                width: 'auto',

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
export default MatcherForm;
