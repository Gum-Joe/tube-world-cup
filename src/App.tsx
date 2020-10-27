import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle, faTicketAlt } from "@fortawesome/free-solid-svg-icons";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis } from "victory";


const classes: { [key: string]: string } = {
  "Bakerloo": "bakerloo",
  "Northern": "northern",
  "Jubilee": "jubilee",
  "TfL Rail": "tflrail",
  "Central": "central",
  "District": "district",
  "Circle": "circle",
  "Thames Link": "thameslink"
}

const colours: { [key: string]: string } = {
  "Bakerloo": "#B36305",
  "Northern": "#000000",
  "Jubilee": "#A0A5A9",
  "TfL Rail": "rgb(0, 25, 168)",
  "Central": "rgb(220, 36, 31)",
  "District": "rgb(0, 125, 50)",
  "Circle": "rgb(255, 211, 41)",
  "Thames Link": "#E9438D"
}

const DEVNULL = "https://devnull-as-a-service.com/dev/null";
const PREFIX = "https://gentle-wildflower-0e5e.kishansambhi.workers.dev/?https://twitter.www.statshelix.com"

const pairs = [
  [
    "Bakerloo",
    "Northern",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637628518223872",
    "false"
  ],
  [
    "Jubilee",
    "TfL Rail",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637979858247680",
    "false"
  ],
  [
    "Central",
    "District",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321001660479639552",
    "true",
  ],
  [
    "Circle",
    "Thames Link",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321002110801108993",
    "true",
  ]
]

interface StateInfo {
  one: {
    name: string;
    votes: number;
    className: string;
  };
  two: {
    name: string;
    votes: number;
    className: string;
  };
  winner: number;
  link: string;
  today: boolean;
}

class CustomizedLabel extends Component<{ [key:string]: any }> {

  render() {
    const { x, y, fill, value } = this.props;
    return <text
      x={x}
      y={y}

      fontSize='16'
      fontFamily='sans-serif'
      fill={fill}
      textAnchor="start">{value}%</text>
  }
};

class App extends Component<any, { results: StateInfo[] }> {

  constructor(props: any) {
    super(props);

    this.state = {
      results: []
    }
  }

  componentDidMount() {
    this.updateResults();
    const bound = this.updateResults.bind(this);
    //setInterval(() => bound(), 30000);
  }

  updateResults() {
    const newPairs: Promise<StateInfo>[] = pairs.map(async (tuple): Promise<StateInfo> => {
      let one: number = 0;
      let two: number = 0;
      let winner: number = 0;
      try {
        if (tuple[2] !== DEVNULL) {
          // Can get it
          const res = await fetch(tuple[2]);

          const resBody = await res.text();
          // Assume pairs in correct order
          const splitted = resBody.split("\n");
          const oneHere = splitted[0].match(/^\d+|\d+\b|\d+(?=\w)/g) || ["0"];
          one = parseInt(oneHere[0], 10);
          if (oneHere.length > 1 && oneHere[1] === "1") {
            winner = 1;
          }

          const twoHere = splitted[1].match(/^\d+|\d+\b|\d+(?=\w)/g) || ["0"];
          two = parseInt(twoHere[0], 10);
          if (twoHere.length > 1 && twoHere[1] === "1") {
            winner = 2;
          }

        }
      } catch (err) {
        //console.log(err.stack);
      } finally {
        return {
          one: {
            name: tuple[0],
            votes: one,
            className: classes[tuple[0]]
          },
          two: {
            name: tuple[1],
            votes: two,
            className: classes[tuple[1]]
          },
          winner,
          link: tuple[2].split("url=")[1],
          today: tuple[3] === "true" ? true : false,
        }
      }
    });

    Promise.all(newPairs).then((results) => this.setState({
      results,
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Tube Lines World Cup:</h1>
          <h5>Updated every 30 secs. Please view in landscape.</h5>
        </div>
        <h3>Knockout stage games:</h3>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Line 1</th>
              <th>Votes</th>
              <th>%</th>
              <th>Line 2</th>
              <th>Votes</th>
              <th>%</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.results.map((result) => {
                return (
                  <tr>
                    <td className={result.one.className}>{result.one.name} { result.winner === 1 ? <FontAwesomeIcon icon={faCheckCircle}/> : "" }</td>
                    <td>{result.one.votes}</td>
                    <td style={{
                      "backgroundSize": `100% ${((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%`
                    }} className={result.one.className}>{((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
                    <td className={result.two.className}>{result.two.name} {result.winner === 2 ? <FontAwesomeIcon icon={faCheckCircle} /> : ""}</td>
                    <td>{result.two.votes}</td>
                    <td style={{
                      "backgroundSize": `100% ${((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%`
                    }} className={result.two.className}>{((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
                    <td><a href={result.link}>View</a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        
        
        <h3>Today's games:</h3>
        <Container>
          <Row>
            {
              this.state.results.filter(result => result.today).map((result) => {
            
                return (
                  <Col sm md lg>
                    <VictoryChart
                      horizontal={true}
                      domainPadding={{ x: 100 }}
                      categories={{ x: [result.one.name, result.two.name] }}
                      height={350}
                      //width={500}
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
                          axisLabel: { fontSize: 30, padding: 30 },
                          tickLabels: { fontSize: 20, padding: 5 },
                          grid: { stroke: "grey" },
                          ticks: { stroke: "grey" },
                        }}
                      />
                      <VictoryBar
                        style={{
                          data: { fill: ({datum}) => {
                            console.log(datum.xName);
                            console.log(colours[datum.xName]);
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
                )
              })
            }
          </Row>
        </Container>

        <h3>Past games:</h3>
        <Container>
          <Row>
            {
              this.state.results.filter(result => !result.today).map((result) => {

                return (
                  <Col sm md lg>
                    <VictoryChart
                      horizontal={true}
                      domainPadding={{ x: 100 }}
                      categories={{ x: [result.one.name, result.two.name] }}
                      height={350}
                      //width={500}
                      padding={{
                        top: 0,
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
                          axisLabel: { fontSize: 30, padding: 30 },
                          tickLabels: { fontSize: 20, padding: 5 },
                          grid: { stroke: "grey" },
                          ticks: { stroke: "grey" },
                        }}
                      />
                      <VictoryBar
                        style={{
                          data: {
                            fill: ({ datum }) => {
                              console.log(datum.xName);
                              console.log(colours[datum.xName]);
                              return colours[datum.xName];
                            }, width: 60
                          }, labels: {
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
                )
              })
            }
          </Row>
        </Container>

      </div>
    );
  }
}



export default App;
