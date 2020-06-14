import React, { useState } from 'react';
import axios from 'axios';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Paper, TextField } from '@material-ui/core';
import Chart from 'react-google-charts';
import './SentForm.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
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
        width: '25ch',
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

const SentForm: React.FC<Props> = (sents) => {
  const classes = useStyles();
  const [text, setText] = useState('');
  const [comp, setComp] = useState(0);
  const [showGuage, setShowGuage] = useState(false);

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
    setText((event.target as HTMLInputElement).value);
  };

  const formSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (showGuage === false) {
      setShowGuage(true);
    }
    console.log('Submitted: ' + text);
    axios
      .post('/get_sentiment', {
        text: text,
      })
      .then((res) => {
        console.log('Returned: ' + res.data.text);
        console.log('Score: ' + res.data.comp);
        setText(res.data.searchText);
        setComp(parseFloat(res.data.comp));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="cards">
        <Paper variant="outlined" style={{ width: '32rem', height: '38rem' }}>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={formSubmit}
          >
            <h3>Sentiment Calulator</h3>

            <TextField
              id="standard-basic"
              label="Type Something..."
              value={text || ''}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" type="submit">
              Get Sentiment
            </Button>
          </form>
          <br />
          <div className="d-flex justify-content-center">
            {showGuage && (
              <div>
                <TextField value={text} />

                <Chart
                  className="gauge"
                  chartType="Gauge"
                  width="300px"
                  height="300px"
                  data={[
                    ['Label', 'Value'],
                    ['SENTIMENT', comp],
                  ]}
                  options={guageOptions}
                />
              </div>
            )}
          </div>
        </Paper>
      </div>
    </>
  );
};
export default SentForm;
