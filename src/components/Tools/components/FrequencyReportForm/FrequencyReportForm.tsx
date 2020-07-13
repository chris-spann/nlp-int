import React, { useState } from 'react';
import axios from 'axios';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import tableIcons from '../../../App/TableIcons';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        // width: '95%',
      },
      flexGrow: 1,
      fontFamily: 'LyftPro-Regular',
    },
  })
);

const FrequencyReportForm: React.FC = () => {
  const classes = useStyles();
  const [filePath, setFilePath] = useState('');
  const [wordFreq, setWordFreq] = useState('');
  const [unsubs, setUnsubs] = useState(0);
  const [lyftMentions, setLyftMentions] = useState(0);
  const [taylorMentions, setTaylorMentions] = useState(0);
  // const [bigramFreq, setBigramFreq] = useState('');
  // const [trigramFreq, setTrigramFreq] = useState('');
  const [response, setResponse] = useState([] as any);
  const [loading, setLoading] = useState(false);

  const handleFilePathChange = (event: any) => {
    setFilePath(event.target.value);
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
    console.log('Starting FrequencyReport...');
    console.log('Submitted filepath: ' + filePath);
    setLoading(true);
    axios
      .post('/get_freq', {
        filepath: filePath,
      })
      .then((res) => {
        setResponse(JSON.parse(res.data.wordFreq));
        setWordFreq(res.data.word_freq_json);
        setUnsubs(parseFloat(res.data.unsubs));
        setLyftMentions(parseFloat(res.data.lyftMentions));
        setTaylorMentions(parseFloat(res.data.taylorMentions));
        setLoading(false);
        // setBigramFreq(res.data.bigram_freq_json);
        // setTrigramFreq(res.data.trigram_freq_json);
        console.log(wordFreq);
        // console.log(bigramFreq);
        // console.log(trigramFreq);

        console.log('Ending FrequencyReport.');
      })
      .catch((error) => {
        console.log(error);
      });
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
              onChange={handleFilePathChange}
              fullWidth={true}
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
          <pre>Unsubs: {unsubs}</pre>
          <pre>Lyft Mentions: {lyftMentions}</pre>
          <pre>Taylor Mentions: {taylorMentions}</pre>
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
                field: 'token',
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
