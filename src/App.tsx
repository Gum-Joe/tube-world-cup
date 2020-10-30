import React, { Component } from "react";
import './App.css';
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryZoomContainer, VictoryContainer, createContainer } from "victory";
import { faGithub, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { StateInfo, ResultHistories, REALTIME_RESULTS, DavidAPI, tweetNameMap, classes, DEVNULL, quarterfinals, colours } from "./constants";
import ResultsTable from "./ResultsTable";
import Graphs from "./Graphs";

const venueMap: { [key: string]: string } = {
  "quartera1": "Waterloo",
  "quartera2": "Blackfriars",
  "quarterb3": "King's Cross",
  "quarterb4": "Shadwell",
}

const venueQuoteMap: Record<string, string> = {
  "Waterloo": "BREAKING: A reporter for the Geoff Broadcasting Corporation (GBC), at Waterloo, has informed us that \"a socially distanced crowd wearing face coverings has turned up at the Waterloo ticket hall concourse to see this highly anticipated match\""
}



class App extends Component<any, {
  resultsKnockout: StateInfo[],
  resultsQFinals: StateInfo[],
  resultsHistories: Record<string, ResultHistories>,
  pairedPastGames: Array<[StateInfo, StateInfo | undefined]>,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      resultsKnockout: [],
      resultsQFinals: [],
      resultsHistories: {},
      pairedPastGames: [],
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
    const filtered = this.state.resultsKnockout.filter(result => !result.today && typeof result.link !== "undefined");
    filtered.forEach((result, index) => {
      if ((index % 2) === 0) {
        pairedPastGames.push([
          result,
          filtered[index + 1],
        ])
      }
    });
    console.log(pairedPastGames);
    this.setState({
      pairedPastGames,
    });
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
            <Graphs results={[...this.state.resultsQFinals, ...this.state.resultsKnockout ]} history={this.state.resultsHistories} />
          </Row>
        </Container>

        <h3>Knockout stage results:</h3>
        <ResultsTable results={this.state.resultsKnockout} />

        <h3>Past games:</h3>
        <Container>
            {
             this.state.pairedPastGames.map(([game1, game2]) => {
               console.log(game1);
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
