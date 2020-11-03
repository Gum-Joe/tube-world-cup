import React, { Component } from "react";
import './App.css';
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryZoomContainer, VictoryContainer, createContainer } from "victory";
import { faGithub, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { StateInfo, ResultHistories, REALTIME_RESULTS, DavidAPI, tweetNameMap, classes, DEVNULL, semifinals, playoff, finals } from "./constants";
import ResultsTable from "./ResultsTable";
import Graphs from "./Graphs";
import ResultsTableCompact from "./ResultsTableCompact";

const venueMap: { [key: string]: string } = {
  "quartera1": "Waterloo",
  "quartera2": "Blackfriars",
  "quarterb1": "King's Cross",
  "quarterb2": "Shadwell",
  "semia1": "West Hampstead",
  "semib1": "???",
  "final": "???",
  "playoff": "???"
}

const venueQuoteMap: Record<string, string> = {
  "Waterloo": "BREAKING: A reporter for the Geoff Broadcasting Corporation (GBC), at Waterloo, has informed us that \"a socially distanced crowd wearing face coverings has turned up at the Waterloo ticket hall concourse to see this highly anticipated match\""
}



class App extends Component<any, {
  resultsKnockout: StateInfo[],
  resultsQFinals: StateInfo[],
  resultsSemiFinals: StateInfo[],
  resultsHistories: Record<string, ResultHistories>,
  pairedPastGames: Array<[StateInfo, StateInfo | undefined]>,
  resultsFinals: StateInfo[],
  resultsPlayoff: StateInfo[],
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      resultsKnockout: [],
      resultsQFinals: [],
      resultsHistories: {},
      pairedPastGames: [],
      resultsSemiFinals: [],
      resultsFinals: [],
      resultsPlayoff: [],
    }
  }

  async updateHistory() {
    //console.log("FITOWRST");
    const history = await fetch(REALTIME_RESULTS)
    this.setState({
      resultsHistories: (await history.json())
    })

    // Update pairs
    // Generate past games
    let pairedPastGames: Array<[StateInfo, StateInfo]> = [];
    const filtered = [...this.state.resultsKnockout, ...this.state.resultsQFinals, ...this.state.resultsSemiFinals].filter(result => !result.today && typeof result.link !== "undefined");
    filtered.forEach((result, index) => {
      if ((index % 2) === 0) {
        pairedPastGames.push([
          result,
          filtered[index + 1],
        ])
      }
    });
    //console.log(pairedPastGames);
    this.setState({
      pairedPastGames,
    });
  }

  componentDidMount() {
    this.updateResults();
    this.updateHistory();
    const bound = this.updateResults.bind(this);
    setInterval(() => bound(), 60000);

    const boundHist = this.updateHistory.bind(this);

    setInterval(() => boundHist(), 60000)
  }

  getUpdates(resJSON: DavidAPI[], gameString: string): StateInfo[] {
    // NEW API
    const filtered =  resJSON.filter((tweet: DavidAPI) => tweet.game.includes(gameString)).map((tweet: DavidAPI): StateInfo => {
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
    console.log("getUpdates DONE");
    return filtered;
  }

  // Kept around because we need it for pending 
  getUpdatesOld(tuple: string[]): StateInfo {
    return {
      gameName: "unknown",
      one: {
        name: tuple[0],
        votes: 0,
        className: classes[tuple[0]]
      },
      two: {
        name: tuple[1],
        votes: 0,
        className: classes[tuple[1]]
      },
      winner: 0,
      link: tuple[2].split("url=")[1],
      today: tuple[3] === "true" ? true : false,
      venue: tuple[4],
    }
    /*let one: number = 0;
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
      } else {
        console.log("DEVNULL");
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
    }*/
  }

  async updateResults() {
    //const newPairs: Promise<StateInfo>[] = pairs.map(this.getUpdates);
    console.log("UPDATING");

    // FETCH!
    const res = await fetch("https://api.davwheat.dev/getpolls");
    const resJSON = await res.json();

    //const newsemiFinals: StateInfo[] = [this.getUpdatesOld(semifinals[0]), this.getUpdatesOld(semifinals[1])];

    //const newFinals: StateInfo[] = [this.getUpdatesOld(finals[0])];

    //const newPlayoff: StateInfo[] = [this.getUpdatesOld(playoff[0])];
    const newsemiFinals = [];
const newFinals = [];
const newPlayoff = [];
    const newState = {
      resultsKnockout: this.getUpdates(resJSON, "knockout"),
      resultsQFinals: this.getUpdates(resJSON, "quarter"),
      resultsSemiFinals: [
        ...this.getUpdates(resJSON, "semi"), /*...this.getUpdates(resJSON, "unknown"),*/ ...newsemiFinals
      ],
      resultsFinals: [
        ...this.getUpdates(resJSON, "final"), /*...this.getUpdates(resJSON, "unknown"),*/ ...newFinals
      ],
      resultsPlayoff: [
        ...this.getUpdates(resJSON, "playoff"), /*...this.getUpdates(resJSON, "unknown"),*/  ...newPlayoff
      ]
    }

    console.log("Setting state...");

    this.setState(newState);

    console.log("DONE");
  }

  render() {

    return (
      <div className="App">
        <div className="header">
          <h1>Tube Lines World Cup:</h1>
          <h5>Updated every 60 secs. Please view in landscape.</h5>
          <h6>Note: if no votes are showing, the API this site uses has gone down and should be back up in a few mins.</h6>
        </div>
        <h3>Quarterfinals:</h3>
        <ResultsTable results={this.state.resultsQFinals} allowVenues />
        
        
        <h3>Today's games:</h3>
        <h6>Straight lines represent votes in the same match from previous years.</h6>
        <h6>Thin grey lines represent the difference between options.</h6>

        { this.state.resultsQFinals.filter(result => result.today).map(result => {
          if (typeof result.venue !== "undefined" && typeof venueQuoteMap[result.venue] !== "undefined") {
            return (
              <Container className="quotedReport">
                <h5>{venueQuoteMap[result.venue]}</h5>
              </Container>
            )
          } else {
            return null;
          }
        }) }
        
        <Container>
          <Row>
            <Graphs results={[...this.state.resultsQFinals, ...this.state.resultsKnockout, ...this.state.resultsSemiFinals ]} history={this.state.resultsHistories} />
          </Row>
        </Container>

        <h3>Upcoming Semifinals:</h3>
        <ResultsTable results={this.state.resultsSemiFinals} allowVenues />

        <h3>3rd/4th Playoff:</h3>
        <ResultsTable results={this.state.resultsPlayoff} allowVenues />

        <h3>THE FINAL:</h3>
        <ResultsTableCompact results={this.state.resultsFinals} allowVenues />
        { /*<ResultsTable results={this.state.resultsFinals} allowVenues />*/}

        <h3>Knockout stage results:</h3>
        <ResultsTable results={this.state.resultsKnockout} />

        <h3>Past games:</h3>
        <Container>
            {
             this.state.pairedPastGames.map(([game1, game2]) => {
               //console.log(game1);
               return (
               <Row>
                   <Graphs results={typeof game2 !== "undefined" ? [game1, game2] : [game1]} history={this.state.resultsHistories} isToday={false}/>
               </Row>)
             })
            }
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
