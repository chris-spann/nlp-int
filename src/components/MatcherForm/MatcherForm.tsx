import React, { useState } from "react"
import axios from "axios"
import { Card, Button, Form } from "react-bootstrap"
import "./MatcherForm.css"

const MatcherForm = () => {
	const [phrases, setPhrases] = useState("")
	const [filePath, setFilePath] = useState("")
	const [matches, setMatches] = useState("")

	const handlePhrasesChange = (event: any) => {
		setPhrases(event.target.value)
	}
	const handleFilePathChange = (event: any) => {
		setFilePath(event.target.value)
	}

	const formSubmit = (event: any) => {
		event.preventDefault()
		console.log("Starting PHRASE MATCHER...")
		console.log("Submitted phrases: " + phrases)
		console.log("Submitted filepath: " + filePath)
		axios
			.post("/get_matches", {
				phrases: phrases,
				filepath: filePath,
			})
			.then(res => {
				setMatches(res.data.matches)
				console.log("Returned phrases: " + phrases)
				console.log("Number of matches: " + matches.length)
				console.log("Matches: " + matches)
				console.log("Ending PHRASE MATCHER.")
			})
			.catch(error => {
				console.log(error)
			})
		// Setting the input box back to empty
		// setPhrases("")
	}
	return (
		<Card
			className="match-card text-center"
			style={{ width: "25rem", height: "38rem" }}>
			<Card.Body>
				<div className="App">
					<Card.Title id="cardtitle">Phrase Matcher</Card.Title>
					<br />
					<Form onSubmit={formSubmit}>
						<Form.Control
							type="text"
							id="phrasesField"
							value={phrases}
							placeholder="Comma-separated phrases..."
							onChange={handlePhrasesChange}
						/>

						<Form.Control
							type="text"
							id="filePathField"
							value={filePath}
							placeholder="Path to file..."
							onChange={handleFilePathChange}
						/>

						<Button id="matchbutton" variant="primary" type="submit">
							Find Matches!
						</Button>
					</Form>
					<hr />
				</div>
			</Card.Body>
		</Card>
	)
}
export default MatcherForm
