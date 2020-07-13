import React, { useState } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import tableIcons from '../../../App/TableIcons';
import MaterialTable from 'material-table';
import './Nnmf.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {},
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
  avg_sent?: BigInteger;
  sents?: {
    lyft_id: BigInteger;
    message: string;
    compound: BigInteger;
    scores: string;
  };
}

const Nnmf: React.FC<Props> = (sents) => {
  const classes = useStyles();
  const [filePath, setFilePath] = useState('');
  const [response, setResponse] = useState([] as any);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event: any) => {
    setFilePath((event.target as HTMLInputElement).value);
  };

  const formSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (showResults === false) {
      setShowResults(true);
    }
    console.log('Submitted filepath: ' + filePath);
    axios
      .post('/get_nnmf', {
        filepath: filePath,
      })
      .then((res) => {
        setResponse(JSON.parse(res.data.sents));
        setLoading(false);
        setShowResults(false);
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
            <Typography variant="h5">Topic Modeler</Typography>
            <TextField
              id="standard-basic"
              label="Path to file..."
              // value={text || ''}
              onChange={handleChange}
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
              Get Sentiment
            </Button>
          </form>
          <br />

          {showResults && (
            <div className={classes.root}>
              <TextField fullWidth={true} value={'text'} rowsMax={3} />
            </div>
          )}
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
export default Nnmf;
