import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryLine, VictoryTooltip, VictoryContainer, createContainer } from "victory";
import { colours, ResultHistories, StateInfo } from "./constants";

interface GraphProps {
	results: StateInfo[],
	history: Record<string, ResultHistories>,
	isToday?: boolean,
}


const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

const Graphs: React.FunctionComponent<GraphProps> = (props) => {
	return (
			<>
				{
				props.results.filter(result => result.today === (props.isToday ?? true)).map((result) => {

						const historydata: ResultHistories = props.history[result.gameName];
						if (typeof historydata === "undefined") {
							return;
						}

						let oneVotes = historydata.results.map((resultHere) => {
							//console.log(resultHere.time - historydata.startTime);
							return {
								x: (resultHere.timestamp - historydata.results[0].timestamp) / 1000 / 60 / 60,
								y: resultHere.votes.one
							}
						});
						let twoVotes = historydata.results.map((resultHere) => {
							//console.log(resultHere.time - historydata.startTime);
							return {
								x: (resultHere.timestamp - historydata.results[1].timestamp) / 1000 / 60 / 60,
								y: resultHere.votes.two
							}
						});

						let difference = historydata.results.map((resultHere) => {
							return {
								x: (resultHere.timestamp - historydata.results[1].timestamp) / 1000 / 60 / 60,
								y: resultHere.votes.one > resultHere.votes.two ? resultHere.votes.one - resultHere.votes.two : resultHere.votes.two - resultHere.votes.one
							}
						})

						console.log(result.one.name);
						console.log(result.two.name);
			
						return (
							<>
								<Col sm md lg>
									<VictoryChart
										horizontal={true}
										domainPadding={{ x: 100 }}
										categories={{ x: [result.one.name, result.two.name] }}
										height={350}
										width={500}
										padding={{
											top:0,
											bottom: 80,
											right: 10,
											left: 10
										}}
									>
										<VictoryAxis
											dependentAxis
											label="Votes"
											fixLabelOverlap
											style={{
												axis: { stroke: "#756f6a" },
												axisLabel: { fontSize: 30, padding: 40 },
												tickLabels: { fontSize: 20, padding: 5 },
												grid: { stroke: "grey" },
												ticks: { stroke: "grey" },
											}}
										/>
										<VictoryBar
											style={{
												data: { fill: ({datum}) => {
													//console.log(datum.xName);
													//console.log(colours[datum.xName]);
													return colours[datum.xName];
												}, width: 60 }, labels: {
													fill: "#ffffff",
													fontSize: 30,
												}
											}}
											alignment="middle"
											labels={({ datum }) => `${datum.x}`}
											labelComponent={<VictoryLabel textAnchor={"end"} dx={-20} />}
											data={[
												{ y: result.one.votes, x: result.one.name },
												{ y: result.two.votes, x: result.two.name }
											]}
										/>
										<VictoryAxis
											fixLabelOverlap
											style={{
												axis: { stroke: "#756f6a" },
												axisLabel: { fontSize: 0, padding: 0 },
												tickLabels: { fontSize: 0, padding: 0 },
												grid: { stroke: "grey", strokeWidth: 0 },
												ticks: { strokeWidth: 0 },
											}}
										/>
									</VictoryChart>
								</Col>
								{/*BEGIN LINES */}
								<Col sm md lg>
									<VictoryChart
										theme={VictoryTheme.material}
										height={350 * 1.5 - 50}
										width={750}
										domainPadding={{ y: 100 }}
										padding={{
											top: 0,
											bottom: 80,
											left: 100
										}}
										containerComponent={
											// @ts-ignore
											<VictoryZoomVoronoiContainer voronoiDimension="x"
												radius={100000}
												// @ts-ignore
												labels={({ datum }) => `${datum.y}`}
												labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white", fontSize: 20 }} />}
											/>
										}
									>
										<VictoryAxis
											dependentAxis
											label="Votes"
											fixLabelOverlap
											style={{
												axis: { stroke: "#756f6a" },
												axisLabel: { fontSize: 20, padding: 70 },
												tickLabels: { fontSize: 20, padding: 5 },
												grid: { stroke: "grey" },
												ticks: { stroke: "grey" },
											}}
										/>
										<VictoryAxis
											label="Time (hrs)"
											fixLabelOverlap
											style={{
												axis: { stroke: "#756f6a" },
												axisLabel: { fontSize: 20, padding: 40 },
												tickLabels: { fontSize: 20, padding: 5 },
												grid: { stroke: "grey" },
												ticks: { stroke: "grey" },
											}}
										/>
										{/* If Picadilly and DLR, PLOT */}
										{
											result.one.name === "DLR" && result.two.name === "Piccadilly" ?
												// DLR
												<VictoryLine
													name={result.one.name}
													style={{
														data: { stroke: colours["DLR"], strokeWidth: 3 },
														parent: { border: "1px solid #ccc" },
													}}
													data={[
														{
															x: 0,
															y: 1711
														},
														{
															x: (twoVotes[twoVotes.length - 1] || { x: 0 }).x,
															y: 1711
														}
													]}
												/>
												: null
										}
										{
											result.one.name === "DLR" && result.two.name === "Piccadilly" ?
												// DLR
												<VictoryLine
													style={{
														data: { stroke: colours["Piccadilly"], strokeWidth: 3 },
														parent: { border: "1px solid #ccc" }
													}}
													data={[
														{
															x: 0,
															y: 1882
														},
														{
															x: (twoVotes[twoVotes.length - 1] || { x: 0 }).x,
															y: 1882
														}
													]}
												/>
												: null
										}
										<VictoryLine
											style={{
												data: { stroke: "rgb(65, 75, 86)", strokeWidth: 2 },
												parent: { border: "1px solid #ccc" },
											}}
											data={difference}
										/>
										<VictoryLine
											style={{
												data: { stroke: colours[result.one.name], strokeWidth: 5 },
												parent: { border: "1px solid #ccc" },
												labels: {
													fill: colours[result.one.name]
												}
											}}
											data={oneVotes}
										/>
										<VictoryLine
											style={{
												data: { stroke: colours[result.two.name], strokeWidth: 5 },
												parent: { border: "1px solid #ccc" },
												labels: {
													fill: colours[result.two.name]
												}
											}}
											data={twoVotes}
										/>
									</VictoryChart>
								</Col>
							</>
						)
					})
				}
			</>
	)
}

export default Graphs;