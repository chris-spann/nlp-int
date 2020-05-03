import React, { useState, Fragment } from "react"
import axios from "axios"
import { Card, Button, Form } from "react-bootstrap"
import Chart from "react-google-charts"
import "./SentForm.css"

function SentForm(): JSX.Element {
	const [text, setText] = useState("")
	const [comp, setComp] = useState(0)

	var guageOptions = {
		min: -1.0,
		max: 1.0,
		greenColor: "0dc98b",
		greenFrom: 0.3,
		greenTo: 1.0,
		yellowColor: "ffd952",
		yellowFrom: -0.3,
		yellowTo: 0.3,
		redColor: "ff4c4d",
		redFrom: -1.0,
		redTo: -0.3,
		majorTicks: ["-1.0", "1.0"],
		minorTicks: 1,
	}

	const handleChange = (event: any) => {
		setText(event.target.value)
	}

	const formSubmit = (event: any) => {
		event.preventDefault()
		console.log("Submitted: " + text)
		axios
			.post("/get_sentiment", {
				text: text,
			})
			.then(res => {
				console.log("Received: " + res.data.text)
				console.log("Score: " + res.data.comp)
				setText(res.data.searchText)
				setComp(parseFloat(res.data.comp))
			})
			.catch(error => {
				console.log(error)
			})
		// Setting the input box back to empty
		// setText("")
	}
	return (
		<Fragment>
			<Card
				className="sent-card text-center"
				style={{ width: "26rem", height: "38rem" }}>
				<Card.Body>
					<div className="App">
						<Card.Title id="cardtitle">Sentiment</Card.Title>
						<br />
						<Form onSubmit={formSubmit}>
							<Form.Control
								as="textarea"
								name="text"
								id="sentarea"
								value={text}
								data-gramm="false"
								placeholder="Type something!"
								onChange={handleChange}
								style={{
									resize: "none",
									overflowY: "scroll",
								}}
							/>
							<br />
							<Button id="sentbutton" variant="primary" type="submit">
								Get Sentiment!
							</Button>
						</Form>
						<hr />
						<Chart
							chartType="Gauge"
							width="100%"
							height="27rem"
							data={[
								["Label", "Value"],
								["SENTIMENT", comp],
							]}
							options={guageOptions}
						/>
					</div>
				</Card.Body>
			</Card>
		</Fragment>
	)
}
export default SentForm
