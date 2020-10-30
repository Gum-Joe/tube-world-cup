import React, { Component } from "react";
import './App.css';
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryZoomContainer, VictoryContainer, createContainer } from "victory";
import { faGithub, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { StateInfo, ResultHistories, REALTIME_RESULTS, DavidAPI, tweetNameMap, classes, DEVNULL, quarterfinals, colours } from "./constants";
import ResultsTable from "./ResultsTable";

const venueMap: { [key: string]: string } = {
  "quartera1": "Waterloo",
  "quartera2": "Blackfriars",
  "quarterb3": "King's Cross",
  "quarterb4": "Shadwell",
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
        <h3>Quarterfinals:</h3>
        <ResultsTable results={this.state.resultsQFinals} />
        
        
        <h3>Today's games:</h3>
        <h6>Straight lines represent votes in the same match from previous years.</h6>
        <h6>Thin grey lines represent the difference between options.</h6>
        <Container>
            {
            [...this.state.resultsKnockout, ...this.state.resultsQFinals].filter(result => result.today).map((result) => {

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

        <h3>Knockout stage results:</h3>
        <ResultsTable results={this.state.resultsKnockout} />

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
