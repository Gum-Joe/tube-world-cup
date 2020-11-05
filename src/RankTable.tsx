import React from "react";
import { Container, Table } from "react-bootstrap";
import { StateInfo } from "./constants";


const RankingTableEntry: React.FunctionComponent<{ result: StateInfo, index: 0 | 1, actualRank: 1 | 2 | 3 | 4 }> = (props)=> {
	const resultHere = props.index === 0 ? props.result.one : props.result.two;
	const other = props.index === 0 ? props.result.two : props.result.one;
	return (
		<tr>
			<td className={resultHere.className}>{props.actualRank}</td>
			<td className={resultHere.className}>{resultHere.name}</td>
			<td className={resultHere.className}>{resultHere.votes}</td>
			<td className={resultHere.className}>{((resultHere.votes / (resultHere.votes + other.votes) * 100) || 0).toFixed(1)}%</td>
		</tr>
	)
}

const FinalRanking: React.FunctionComponent<{ playoff: StateInfo, final: StateInfo }> = (props) => {
	console.log(props);
	return (
		<Container>
		<Table striped bordered responsive>
			<thead>
				<tr>
					<th>Rank</th>
					<th>Line</th>
					<th>Votes</th>
					<th>%</th>
				</tr>
			</thead>
			<tbody>
				<RankingTableEntry actualRank={1} result={props.final} index={props.final.one.votes > props.final.two.votes ? 0 : 1} />
				<RankingTableEntry actualRank={2} result={props.final} index={props.final.one.votes > props.final.two.votes ? 1 : 0} />
				<RankingTableEntry actualRank={3} result={props.playoff} index={props.playoff.one.votes > props.playoff.two.votes ? 0 : 1} />
				<RankingTableEntry actualRank={4} result={props.playoff} index={props.playoff.one.votes > props.playoff.two.votes ? 1 : 0} />
			</tbody>
		</Table>
		</Container>
	)
}

export default FinalRanking;