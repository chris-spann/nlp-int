import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import Chart from 'react-google-charts';
import './SentForm.css';

function SentForm(): JSX.Element {
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
    setText(event.target.value);
    if (text === '') {
      setShowGuage(true);
    }
  };

  const formSubmit = (event: any) => {
    event.preventDefault();
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
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  className="switch"
                  label="Batch"
                />
                <br />
                <Form.Control
                  as="textarea"
                  name="text"
                  id="sentarea"
                  value={text}
                  data-gramm="false"
                  placeholder="Type something!"
                  onChange={handleChange}
                  style={{
                    resize: 'none',
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
              <hr />

              {showGuage && (
                <div className="d-flex justify-content-center">
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
          </Card.Body>
        </Card>
        <Card
          className="match-card text-center"
          style={{ width: '26em', height: '38em' }}
        >
          <Card.Body>
            <Card.Title id="cardtitle">Results</Card.Title>
            <br />
            <br />
            <br />
            <br />
            <hr />
            <br />
            <br />
            <br />
            <br />
            <Button id="sentbutton" variant="primary">
              Download
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
}
export default SentForm;
