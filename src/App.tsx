import React, { Component } from "react";
import './App.css';
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryZoomContainer, VictoryContainer, createContainer } from "victory";
import { faGithub, faInstagram, faLinkedin, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";


const REALTIME_RESULTS = "https://api.davwheat.dev/fullhistory";

const classes: { [key: string]: string } = {
  "Bakerloo": "bakerloo",
  "Northern": "northern",
  "Jubilee": "jubilee",
  "TfL Rail": "tflrail",
  "Central": "central",
  "District": "district",
  "Circle": "circle",
  "Thameslink": "thameslink",
  "H&C": "handc",
  "Victoria": "victoria",
  "Metropolitan": "metropolitan",
  "Trams": "trams",
  "Overground": "overground",
  "CableCar": "cablecar",
  "DLR": "dlr",
  "Piccadilly": "picadilly",
  "???": "unknown",
}

const tweetNameMap: { [key: string]: string } = {
  "Bakerloo Line": "Bakerloo",
  "Northern Line": "Northern",
  "Jubilee Line": "Jubilee",
  "TfL Rail": "TfL Rail",
  "Central Line": "Central",
  "District Line": "District",
  "Circle Line": "Circle",
  "Thameslink": "Thameslink",
  "Hammersmith & City Line": "H&C",
  "Victoria Line": "Victoria",
  "Metropolitan Line": "Metropolitan",
  "Trams": "Trams",
  "London Overground": "Overground",
  "Cable Car": "CableCar",
  "DLR": "DLR",
  "Piccadilly Line": "Piccadilly",
}

const colours: { [key: string]: string } = {
  "Bakerloo": "#B36305",
  "Northern": "#000000",
  "Jubilee": "#A0A5A9",
  "TfL Rail": "rgb(0, 25, 168)",
  "Central": "rgb(220, 36, 31)",
  "District": "rgb(0, 125, 50)",
  "Circle": "rgb(255, 211, 41)",
  "Thameslink": "#E9438D",
  "H&C": "rgb(244, 169, 190)",
  "Victoria": "rgb(0, 152, 216)",
  "Metropolitan": "rgb(155, 0, 88)",
  "Trams": "rgb(0, 189, 25)",
  "Overground": "rgb(239, 123, 16)",
  "CableCar": "rgb(220, 36, 31)",
  "DLR": "rgb(0, 175, 173)",
  "Piccadilly": "rgb(0, 25, 168)"
}

const DEVNULL = "https://devnull-as-a-service.com/dev/null";
const PREFIX = "https://twitter.www.statshelix.com"
const FULL_PREFIX = PREFIX + "/api/Tweet/GetTweet?url=";

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
    "false",
  ],
  [
    "Circle",
    "Thameslink",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321002110801108993",
    "false",
  ],
  [
    "H&C",
    "Victoria",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321364991803621376",
    "true",
  ],
  [
    "Metropolitan",
    "Trams",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321365302811217923",
    "true",
  ],
  [
    "Overground",
    "CableCar",
    DEVNULL, // FULL_PREFIX + URL
    "false" // CHANGEME
  ],
  [
    "DLR",
    "Piccadilly",
    DEVNULL, // FULL_PREFIX + URL
    "false" // CHANGEME
  ]
]

const quarterfinals = [
  [
    "Northern",
    "Jubilee",
    DEVNULL,
    "false",
    "Waterloo"
  ],
  [
    "District",
    "Thameslink",
    DEVNULL,
    "false",
    "Blackfriars"
  ],
  [
    "Victoria",
    "Metropolitan",
    DEVNULL,
    "false",
    "King's Cross"
  ],
  [
    "???",
    "???",
    DEVNULL,
    "false",
  ],
]

interface StateInfo {
  gameName: string;
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
  venue?: string;
}

interface DavidAPI {
  tweetId: string;
  game: string;
  poll: {
    voting_status: string;
    end_datetime: string;
    id: string;
    duration_minutes: string;
    options: {
      position: number;
      label: string;
      votes: number;
    }[]
  }
}

interface ResultHistories {
  gane: string;
  options: {
    one: string;
    two: string;
  };
  results: {
    timestamp: number;
    votes: {
      one: number;
      two: number;
    };
  }[]
}

const venueMap: { [key: string]: string } = {
  "quartera1": "Waterloo",
  "quartera2": "Blackfriars",
}

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

class App extends Component<any, { resultsKnockout: StateInfo[], resultsQFinals: StateInfo[], resultsHistories: Record<string, ResultHistories> }> {

  constructor(props: any) {
    super(props);

    this.state = {
      resultsKnockout: [],
      resultsQFinals: [],
      resultsHistories: {},
    }
  }

  async updateHistory() {
    //console.log("FITOWRST");
    const history = await fetch(REALTIME_RESULTS)
    this.setState({
      resultsHistories: (await history.json())
    })
    //console.log("FIRST");
  }

  componentDidMount() {
    this.updateResults();
    this.updateHistory();
    const bound = this.updateResults.bind(this);
    setInterval(() => bound(), 20000);

    const boundHist = this.updateHistory.bind(this);

    setInterval(() => boundHist(), 60000)
  }

  async getUpdates(gameString: string): Promise<StateInfo[]> {
    // NEW API
    const res = await fetch("https://api.davwheat.dev/getpolls");
    const resJSON = await res.json();
    return resJSON.filter((tweet: DavidAPI) => tweet.game.includes(gameString)).map((tweet: DavidAPI): StateInfo => {
      console.log(tweetNameMap[tweet.poll.options[0].label])
      return {
        gameName: tweet.game,
        one: {
          name: tweetNameMap[tweet.poll.options[0].label] || "???",
          votes: tweet.poll.options[0].votes,
          className: classes[tweetNameMap[tweet.poll.options[0].label] || "???"]
        },
        two: {
          name: tweetNameMap[tweet.poll.options[1].label] || "???",
          votes: tweet.poll.options[1].votes,
          className: classes[tweetNameMap[tweet.poll.options[1].label] || "???"]
        },
        winner: (
          tweet.poll.options[0].votes > tweet.poll.options[1].votes ? 1 : 2
        ),
        link: "https://twitter.com/geofftech/status/" + tweet.tweetId,
        today: tweet.poll.voting_status === "open" ? true : false,
        venue: venueMap[tweet.game] || "???",
      }
    });
  }

  // Kept around because we need it for pending 
  async getUpdatesOld(tuple: string[]): Promise<StateInfo> {
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
      console.log(err.stack);
    } finally {
      return {
        gameName: "unknown",
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
        venue: tuple[4],
      }
    }
  }

  updateResults() {
    //const newPairs: Promise<StateInfo>[] = pairs.map(this.getUpdates);
    console.log("UPDATED");

    this.getUpdates("knockout").then((results) => this.setState({
      resultsKnockout: results,
    }));

    const newquarterFinals: Promise<StateInfo>[] = quarterfinals.map(this.getUpdatesOld);

    Promise.all(newquarterFinals).then((resultsQFinals) => {
      this.getUpdates("quarter").then((results) => {
        this.setState({
          resultsQFinals: [
            ...results,
            ...resultsQFinals,
          ],
        })
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>Tube Lines World Cup:</h1>
          <h5>Updated every 20 secs. Please view in landscape.</h5>
          <h6>Note: if no votes are showing, the API this site uses has gone down and should be back up in a few mins.</h6>
        </div>
        <h3>Knockout stage games:</h3>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Link</th>
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
              this.state.resultsKnockout.map((result) => {
                return (
                  <tr>
                    <td><a href={result.link}>View</a></td>
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
                    <td>{result.one.votes > result.two.votes ? result.one.votes - result.two.votes : result.two.votes - result.one.votes}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        
        
        <h3>Today's games:</h3>
        <h6>Straight lines represent votes in the same match from previous years.</h6>
        <h6>Thin grey lines represent the difference between options.</h6>
        <Container>
            {
              this.state.resultsKnockout.filter(result => result.today).map((result) => {

                const historydata: ResultHistories = this.state.resultsHistories[result.gameName];
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
                  <Row>
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
                            axisLabel: { fontSize: 30, padding: 30 },
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
                            axisLabel: { fontSize: 20, padding: 40 },
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
                  </Row>
                )
              })
            }
        </Container>

        <h3>Upcoming quarterfinals:</h3>
        <Table striped bordered responsive>
          <thead>
            <tr>
              <th>Venue</th>
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
              this.state.resultsQFinals.map((result) => {
                return (
                  <tr>
                    <td>{result.venue || "???"}</td>
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
                    <td><a href={result.link}>View</a></td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        <h3>Past games:</h3>
        <Container>
          <Row>
            {
              this.state.resultsKnockout.filter(result => !result.today && typeof result.link !== "undefined").map((result) => {
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
                              //console.log(datum.xName);
                              //console.log(colours[datum.xName]);
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

        <footer>
          <Container>
            Created by @k_sam_mighty for <a href="https://twitter.com/geofftech">Geoff Marshall's</a> World Cup of Tube Lines.<br/>
            Find me (@k_sam_mighty) here:<br />
            <a href="https://github.com/Gum-Joe"><FontAwesomeIcon icon={faGithub} /> Gum-Joe</a> <br />
            <a href="hhttps://twitter.com/official_gumjoe"><FontAwesomeIcon icon={faTwitter} /> @official_gumjoe</a> <br />
            <a href="https://www.instagram.com/k_sam_mighty"><FontAwesomeIcon icon={faInstagram} /> @k_sam_mighty</a> <br />
            <a href="https://www.youtube.com/channel/UCIwdVs7v-WL7_5erRzNv6sw"><FontAwesomeIcon icon={faYoutube} /> Gum Joe</a>
            <br />
            Special thanks to <a href="https://github.com/davwheat">@davwheat</a> for the API, and <a href="https://twitter.com/_FlaiFlai">@_FlaiFlai</a> for the original API.
            <br />Thank you to all the memebers of the community who contributed ideas!
          </Container>
        </footer>
      </div>
    );
  }
}



export default App;
