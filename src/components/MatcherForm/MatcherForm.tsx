import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import './MatcherForm.css';

interface Props {
  phrases?: string;
  matches?: {
    lyft_id: string;
    message: string;
  };
}
const MatcherForm: React.FC<Props> = (matches, phrases) => {
  const [searchPhrases, setSearchPhrases] = useState('');
  const [filePath, setFilePath] = useState('');
  const [response, setResponse] = useState([] as any);

  const handlePhrasesChange: React.ChangeEventHandler = (event: any) => {
    setSearchPhrases(event.target.value);
  };
  const handleFilePathChange: React.ChangeEventHandler = (event: any) => {
    setFilePath(event.target.value);
  };

  const handleFormSubmit: React.FormEventHandler = (event) => {
    event.preventDefault();
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
  const columns = [
    {
      name: 'lyft_id',
      selector: 'lyft_id',
      sortable: false,
      right: true,
      maxWidth: '170px',
    },
    {
      name: 'message',
      selector: 'message',
      sortable: false,
    },
  ];
  return (
    <>
      <CardGroup>
        <Card
          className="match-card text-center"
          style={{ width: '26rem', height: '38rem' }}
        >
          <Card.Body>
            <div className="App">
              <Card.Title id="cardtitle">PhraseMatcher</Card.Title>
              <br />
              <Form onSubmit={handleFormSubmit}>
                <Form.Control
                  type="text"
                  id="phrasesField"
                  value={searchPhrases}
                  placeholder="Comma-separated phrases..."
                  onChange={handlePhrasesChange}
                />

                <Form.Control
                  type="text"
                  id="filePathField"
                  value={filePath}
                  placeholder="Path to file..."
                  onChange={handleFilePathChange}
                  spellCheck="false"
                />

                <Button id="matchbutton" variant="primary" type="submit">
                  Find Matches!
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
            <p>Phrases: {searchPhrases}</p>
            <p>Number of Matches: {response.length}</p>
            <hr />
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
              overflowY={true}
              fixedHeader
              fixedHeaderScrollHeight="700px"
              striped={true}
            />
            <Button id="matchbutton" variant="primary" type="submit">
              Download
            </Button>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};
export default MatcherForm;
