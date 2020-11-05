import React, { ReactNode } from "react";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { StateInfo } from "./constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Container, Row, Table } from "react-bootstrap";


const ResultsTableCompact: React.FunctionComponent<{
	results: StateInfo[],
	allowVenues?: boolean,
}> = (props) => {
	return (
		<Container>
			{
				props.results.map((result) => {
					return (
						<Container>
							<Row className="align-items-center">
								<Col>
									<Table striped bordered responsive>
										<thead>
											<tr>
												<th>Line</th>
												<th>Votes</th>
												<th>%</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className={result.one.className}>{result.one.name} {result.winner === 1 ? <FontAwesomeIcon icon={faCheckCircle} /> : ""}</td>
												<td>{result.one.votes}</td>
												<td style={{
													"backgroundSize": `100% ${((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%`
												}} className={result.one.className}>{((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
											</tr>
											<tr>
												<td className={result.two.className}>{result.two.name} {result.winner === 2 ? <FontAwesomeIcon icon={faCheckCircle} /> : ""}</td>
												<td>{result.two.votes}</td>
												<td style={{
													"backgroundSize": `100% ${((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%`
												}} className={result.two.className}>{((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
											</tr>
										</tbody>
									</Table>
								</Col>
								<Col lg={2} className={"compact-headers"}>
									<h6 className={"align-middle"}>
									Venue: {result.venue}<br />
									Difference: {result.one.votes > result.two.votes ? result.one.votes - result.two.votes : result.two.votes - result.one.votes}<br />
                	Total: {result.one.votes + result.two.votes}<br />
                	Vote here: <a href={result.link}>Link</a>
									</h6>
								</Col>
							</Row>
						</Container>
					)
				})
			}
		</Container>
	)
}

export default ResultsTableCompact;