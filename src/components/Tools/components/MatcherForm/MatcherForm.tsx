import React, { useState } from 'react';
import axios from 'axios';
import { Card, CardGroup, Button, Form } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import Chart from 'react-google-charts';
import './MatcherForm.css';

interface Props {
  phrases?: string;
  matches?: {
    lyft_id: BigInteger;
    message: string;
  };
}
const MatcherForm: React.FC<Props> = (matches, phrases) => {
  const [searchPhrases, setSearchPhrases] = useState('');
  const [filePath, setFilePath] = useState('');
  const [poolSize, setPoolSize] = useState(0);
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
        setPoolSize(res.data.numCon);
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
                  data-gramm="false"
                />

                <Button id="matchbutton" variant="primary" type="submit">
                  Find Matches!
                </Button>
              </Form>
              <hr />
              <Card.Subtitle id="cardsubtitle">How To:</Card.Subtitle>
              <br />
              <Card.Text>
                This is the PhraseMatcher. You can enter some phrases you'd like
                to search for here. Fusce sapien massa, eleifend et nunc ut,
                aliquam molestie enim. Donec consequat sed mauris a gravida. Sed
                a lectus in justo auctor dictum.
              </Card.Text>
              <Card.Text>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis egestas. Sed maximus elit at purus
                tempus consequat. Maecenas posuere mattis nunc, sed placerat
                tellus blandit at. Etiam placerat odio est, vel interdum quam
                porttitor et.
              </Card.Text>
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
            <Card.Text>Phrases: {searchPhrases}</Card.Text>
            <Card.Text>Matches: {response.length}</Card.Text>
            <Card.Text>Convos Scanned: {poolSize}</Card.Text>

            <hr />
            <Chart
              className="pie"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              width="24rem"
              height="23rem"
              data={[
                ['Label', 'Value'],
                ['Matches', response.length],
                ['Non-Matches', poolSize - response.length],
              ]}
              options={{
                // title: '',
                // Just add this option
                is3D: true,
                // fontSize: 8,
                legendTextStyle: {
                  color: 'black',
                  // fontSize: 7,
                },
                pieSliceTextStyle: {
                  color: 'black',
                  // fontSize: 8,
                },
              }}
            />
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
              <Button id="matchbutton" variant="primary" type="submit">
                Download
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </CardGroup>
    </>
  );
};
export default MatcherForm;
