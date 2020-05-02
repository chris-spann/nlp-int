import React from "react"
import SentForm from "../SentForm/SentForm"
import MatcherForm from "../MatcherForm/MatcherForm"
import { Tab, Tabs } from "react-bootstrap"
import "./index.css"

const App: React.FC = () => {
	return (
		<div>
			<Tabs defaultActiveKey="SentForm" id="tabs">
				<Tab eventKey="SentForm" title="Sentiment">
					<SentForm />
				</Tab>
				<Tab eventKey="MatcherForm" title="Match">
					<MatcherForm />
				</Tab>
			</Tabs>
		</div>
	)
}

export default App
