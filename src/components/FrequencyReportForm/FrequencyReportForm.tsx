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
        <Card.Title id="cardtitle">FrequencyReport</Card.Title>
        <Card.Body>
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
          <Card.Subtitle id="cardsubtitle">How To:</Card.Subtitle>
          <br />
          <Card.Text>
            This is the FrequencyReport. Upload a file to analyze.
          </Card.Text>
          <Card.Text>
            Fusce sapien massa, eleifend et nunc ut, aliquam molestie enim.
            Donec consequat sed mauris a gravida. Sed a lectus in justo auctor
            dictum. Nullam semper, leo et venenatis vehicula, mi nibh luctus
            urna, vel placerat nibh neque sit amet magna. Sed pharetra enim eget
            nulla imperdiet, in vulputate ligula rhoncus.
          </Card.Text>
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
