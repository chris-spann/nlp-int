import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import './FrequencyReportForm.css';

const FrequencyReportForm: React.FC = () => {
  const [filePath, setFilePath] = useState('');
  const [wordFreq, setWordFreq] = useState('');
  const [bigramFreq, setBigramFreq] = useState('');
  const [trigramFreq, setTrigramFreq] = useState('');

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
    <CardGroup>
      <Card
        className="match-card text-center"
        style={{ width: '26rem', height: '38rem' }}
      >
        <Card.Body>
          <div className="App">
            <Card.Title id="cardtitle">FrequencyReport</Card.Title>
            <br />
            <Form onSubmit={formSubmit} spellCheck="false">
              <Form.Control
                type="text"
                id="filePathField"
                value={filePath}
                placeholder="Path to file..."
                onChange={handleFilePathChange}
              />

              <Button id="matchbutton" variant="primary" type="submit">
                Get Report!
              </Button>
            </Form>
            <hr />
          </div>
        </Card.Body>
      </Card>
      <Card
        className="match-card text-center"
        style={{ width: '26rem', height: '38rem' }}
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
  );
};
export default FrequencyReportForm;
