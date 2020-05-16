import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import FrequencyReportForm from '../FrequencyReportForm/FrequencyReportForm';
import SentForm from '../SentForm/SentForm';
import MatcherForm from '../MatcherForm/MatcherForm';
import { Tab, Tabs } from 'react-bootstrap';
import './index.css';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Tabs defaultActiveKey="MatcherForm" id="tabs">
        <Tab eventKey="FrequencyReportForm" title="FrequencyReport">
          <FrequencyReportForm />
        </Tab>
        <Tab eventKey="MatcherForm" title="PhraseMatcher">
          <MatcherForm />
        </Tab>
        <Tab eventKey="SentForm" title="Sentiment">
          <SentForm />
        </Tab>
      </Tabs>
      <Footer />
    </div>
  );
};

export default App;
