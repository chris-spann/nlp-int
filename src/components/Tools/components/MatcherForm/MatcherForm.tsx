import React, { useState } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import tableIcons from '../../../App/TableIcons';
import './MatcherForm.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      fontFamily: 'LyftPro-Regular',
      fontSize: 9,
    },
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      flexGrow: 1,
      fontFamily: 'LyftPro-Regular',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  })
);

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
              fullWidth={true}
            />
            <TextField
              id="standard-basic"
              label="Path to file..."
              onChange={handleFilePathChange}
              fullWidth={true}
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
