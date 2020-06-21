import React, { useState, forwardRef } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
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
import './BatchSentiment.css';

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
  const [loading, setLoading] = useState(false);

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

  const handleChange = (event: any) => {
    setShowReportGuage(false);
    setFilePath((event.target as HTMLInputElement).value);
  };

  const batchFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setLoading(true);
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
        setLoading(false);
        console.log(res.status);
        console.log(res.data.sents);
        console.log(res.data.avgSent);
        console.log('Ending SENTIMENT ANALYZER.');
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
            onSubmit={batchFormSubmit}
          >
            <Typography variant="h5">Batch Sentiment Calulator</Typography>
            <TextField
              id="standard-basic"
              label="Path to file..."
              // value={text || ''}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              type="submit"
              style={{
                backgroundColor: '#420499',
                color: 'white',
              }}
            >
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
                title: 'Sentiment',
                field: 'compound',
                sorting: true,
                width: 'auto',
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
export default BatchSentiment;
