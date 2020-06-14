import React, { useState } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, TextField } from '@material-ui/core';
import Chart from 'react-google-charts';
import DataTable from 'react-data-table-component';
import './BatchSentiment.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
      flexGrow: 1,
      fontFamily: 'LyftPro-Regular',
    },
  })
);

interface Props {
  avg_sent?: BigInteger;
  sents?: {
    lyft_id: BigInteger;
    message: string;
    compound: BigInteger;
    scores: string;
  };
}

const BatchSentiment: React.FC<Props> = (sents) => {
  const classes = useStyles();
  const [avgSent, setAvgSent] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [showReportGuage, setShowReportGuage] = useState(false);
  const [response, setResponse] = useState([] as any);

  const guageOptions = {
    min: -1.0,
    max: 1.0,
    greenColor: '0dc98b',
    greenFrom: 0.3,
    greenTo: 1.0,
    yellowColor: 'ffd952',
    yellowFrom: -0.3,
    yellowTo: 0.3,
    redColor: 'ff4c4d',
    redFrom: -1.0,
    redTo: -0.3,
    majorTicks: ['-1.0', '1.0'],
    minorTicks: 1,
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
      name: 'compound',
      selector: 'compound',
      sortable: true,
      maxWidth: '75px',
    },
    {
      name: 'message',
      selector: 'message',
      sortable: false,
    },
  ];
  const handleChange = (event: any) => {
    setShowReportGuage(false);
    setFilePath((event.target as HTMLInputElement).value);
  };

  const batchFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowReportGuage(true);
    console.log('Starting SENTIMENT ANALYZER...');
    console.log('Submitted filepath: ' + filePath);
    axios
      .post('/get_sentiment_report', {
        filepath: filePath,
      })
      .then((res) => {
        setResponse(JSON.parse(res.data.sents));
        setAvgSent(parseFloat(res.data.avgSent));
        console.log(res.status);
        console.log(res.data.sents);
        console.log(res.data.avgSent);
        console.log('Ending SENTIMENT ANALYZER.');
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDownload: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log('Downloading Results.');
  };

  return (
    <>
      <div className="cards">
        <Paper variant="outlined" style={{ width: '32rem', height: '38rem' }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={batchFormSubmit}
          >
            <h3>Batch Sentiment Calulator</h3>
            <TextField
              id="standard-basic"
              label="Path to file..."
              // value={text || ''}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Get Sentiment
            </Button>
          </form>
          <br />
          <div className="d-flex justify-content-center">
            {showReportGuage && (
              <Chart
                className="gauge"
                chartType="Gauge"
                width="300px"
                height="300px"
                data={[
                  ['Label', 'Value'],
                  ['SENTIMENT', avgSent],
                ]}
                options={guageOptions}
              />
            )}
          </div>
        </Paper>
        <Paper variant="outlined" style={{ width: '50rem', height: '38rem' }}>
          <DataTable
            className="dataTable"
            title="Messages"
            columns={columns}
            data={response}
            dense={true}
            fixedHeader
            fixedHeaderScrollHeight="700px"
            overflowY={true}
            striped={true}
          />
          <form className={classes.root} onSubmit={handleDownload}>
            <Button variant="contained" color="primary" type="submit">
              Download
            </Button>
          </form>
        </Paper>
      </div>
    </>
  );
};
export default BatchSentiment;
