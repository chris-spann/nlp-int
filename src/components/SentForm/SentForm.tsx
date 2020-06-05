import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import Chart from 'react-google-charts';
import DataTable from 'react-data-table-component';
import './SentForm.css';

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
  const [text, setText] = useState('');
  const [comp, setComp] = useState(0);
  const [avgSent, setAvgSent] = useState(0);
  const [filePath, setFilePath] = useState('');
  const [showGuage, setShowGuage] = useState(false);
  const [showReportGuage, setShowReportGuage] = useState(false);
  const [response, setResponse] = useState([] as any);
  const inputRef = useRef<HTMLInputElement>(null);

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
    setText((event.target as HTMLInputElement).value);
  };

  const handleFilePathChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    if (inputRef && inputRef.current) {
      setFilePath(inputRef.current.value);
    }
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
    // Setting the input box back to empty
    // setText("")
  };
  const batchFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowGuage(false);
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
    // Setting the input box back to empty
    // setFilePath("")
  };

  return (
    <>
      <CardGroup>
        <Card
          className="sent-card text-center"
          style={{ width: '26rem', height: '38rem' }}
        >
          <Card.Body>
            <div>
              <Card.Title id="cardtitle">Sentiment</Card.Title>
              <br />
              <Form onSubmit={formSubmit}>
                <br />
                <Form.Control
                  ref={inputRef}
                  type="text"
                  id="sentarea"
                  value={text || ''}
                  data-gramm="false"
                  placeholder="Type something!"
                  onChange={handleChange}
                  style={{
                    resize: 'vertical',
                    // minHeight: 59,
                    overflowY: 'scroll',
                  }}
                />
                <br />
                <div unselectable="on">
                  <Button id="sentbutton" variant="primary" type="submit">
                    Get Sentiment!
                  </Button>
                </div>
              </Form>
              <Form onSubmit={batchFormSubmit}>
                <br />
                <Form.Control
                  ref={inputRef}
                  type="text"
                  id="filePathField"
                  value={filePath || ''}
                  onChange={handleFilePathChange}
                  data-gramm="false"
                  placeholder="Path to file..."
                  spellCheck="false"
                />
                <br />
                <div unselectable="on">
                  <Button id="sentbutton" variant="primary" type="submit">
                    Get Sentiment Report!
                  </Button>
                </div>
              </Form>
              <hr />
              <Card.Subtitle id="cardsubtitle">How To:</Card.Subtitle>
              <br />
              <Card.Text className="panel-text">
                This is the SentimentAnalyzer. You can enter some text you'd
                like to analyze above. Flip the switch to Batch to upload a .csv
                to analyze. Probaly will include some more details about what
                this does. A <a href="/">link</a> to more resources would be
                nice too!
              </Card.Text>
            </div>
          </Card.Body>
        </Card>
        <Card
          className="match-card text-center"
          style={{ width: '26em', height: '38em' }}
        >
          <Card.Body>
            <Card.Title id="cardtitle">Score</Card.Title>
            <br />
            <br />
            <br />
            <div className="d-flex justify-content-center">
              {showGuage && (
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
              )}
            </div>
            <div className="d-flex justify-content-center">
              {showReportGuage && !showGuage && (
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
            <br />
            <br />
            <br />
            <br />
          </Card.Body>
        </Card>
        <Card
          className="match-card text-center"
          style={{ width: '26rem', height: '38rem' }}
        >
          <Card.Body>
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
            <Form>
              <Button id="dlbutton" variant="primary" type="submit">
                Download
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};
export default SentForm;
