import React, { ReactNode } from "react"
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { Table } from "react-bootstrap"
import { StateInfo } from "./constants"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const ResultsTable: React.FunctionComponent<{
	results: StateInfo[],
	allowVenues?: boolean,
}> = (props) => {
	return (
		<Table striped bordered responsive>
			<thead>
				<tr>
					<th>Link</th>
					{props.allowVenues ? <th>Venue</th> : null}
					<th>Line 1</th>
					<th>Votes</th>
					<th>%</th>
					<th>Line 2</th>
					<th>Votes</th>
					<th>%</th>
					<th>∆</th>
				</tr>
			</thead>
			<tbody>
				{
					props.results.map((result) => {
						return (
							<tr>
								<td><a href={result.link}>View</a></td>
								{ props.allowVenues ? <td>{result.venue || "???"}</td> : null }
								<td className={result.one.className}>{result.one.name} {result.winner === 1 ? <FontAwesomeIcon icon={faCheckCircle} /> : ""}</td>
								<td>{result.one.votes}</td>
								<td style={{
									"backgroundSize": `100% ${((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%`
								}} className={result.one.className}>{((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
								<td className={result.two.className}>{result.two.name} {result.winner === 2 ? <FontAwesomeIcon icon={faCheckCircle} /> : ""}</td>
								<td>{result.two.votes}</td>
								<td style={{
									"backgroundSize": `100% ${((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%`
								}} className={result.two.className}>{((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
								<td>{result.one.votes > result.two.votes ? result.one.votes - result.two.votes : result.two.votes - result.one.votes}</td>
							</tr>
						)
					})
				}
			</tbody>
		</Table>
	)
}

export default ResultsTable;