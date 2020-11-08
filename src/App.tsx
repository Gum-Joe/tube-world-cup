import React, { Component } from "react";
import './App.css';
import { Col, Container, Row, Table, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis, VictoryLine, VictoryVoronoiContainer, VictoryTooltip, VictoryZoomContainer, VictoryContainer, createContainer } from "victory";
import { faGithub, faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { StateInfo, ResultHistories, REALTIME_RESULTS, DavidAPI, tweetNameMap, classes, DEVNULL, semifinals, playoff, finals, BLANK_RESULT } from "./constants";
import ResultsTable from "./ResultsTable";
import Graphs from "./Graphs";
import ResultsTableCompact from "./ResultsTableCompact";
import CookieConsent from "react-cookie-consent";
import gaSetState, { GA_DISABLE_COOKIE_STR, GA_PROPERTY } from "./gaAnlalystics";
import RankTable from "./RankTable";

const venueMap: { [key: string]: string } = {
  "quartera1": "Waterloo",
  "quartera2": "Blackfriars",
  "quarterb1": "King's Cross",
  "quarterb2": "Shadwell",
  "semia1": "West Hampstead",
  "semib1": "Aldwych Disused",
  "final": "Greenwich",
  "playoff": "Green Park"
}

const venueQuoteMap: Record<string, string> = {
  "Waterloo": "BREAKING: A reporter for the Geoff Broadcasting Corporation (GBC), at Waterloo, has informed us that \"a socially distanced crowd wearing face coverings has turned up at the Waterloo ticket hall concourse to see this highly anticipated match\"",
  //"Greenwich": "BREAKING: Joe-Wheatley pollsters, runners of this site, have decided as of 14:30 today to call (project) the winner as the DLR."
  "Greenwich": "BREAKING: At 14:30, Joe-Wheatley polls (who run this site) projected DLR as the winner, with >200 votes between them.  As of 23:00, after a huge spike in Thameslink votes, with 500 votes between them and 6 hrs until polls close, we are now calling this for Thameslink."
}



class App extends Component<any, {
  resultsKnockout: StateInfo[],
  resultsQFinals: StateInfo[],
  resultsSemiFinals: StateInfo[],
  resultsFinals: StateInfo[],
  resultsPlayoff: StateInfo[],
  resultsLoosers: StateInfo[],
  resultsHistories: Record<string, ResultHistories>,
  pairedPastGames: Array<[StateInfo, StateInfo | undefined]>,
  totalVotes: number,
  meanVotes: number,
  pairedPastGamesQFinals: Array<[StateInfo, StateInfo | undefined]>,
}> {

  constructor(props: any) {
    super(props);

    this.state = {
      resultsKnockout: [],
      resultsQFinals: [],
      resultsHistories: {},
      pairedPastGames: [],
      pairedPastGamesQFinals: [],
      resultsSemiFinals: [],
      resultsFinals: [],
      resultsPlayoff: [],
      resultsLoosers: [],
      totalVotes: 0,
      meanVotes: 0,
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
    const filtered = [...this.state.resultsKnockout].filter(result => !result.today && typeof result.link !== "undefined");
    filtered.forEach((result, index) => {
      if ((index % 2) === 0) {
        pairedPastGames.push([
          result,
          filtered[index + 1],
        ])
      }
    });

    let pairedPastGamesQFinals: Array<[StateInfo, StateInfo]> = [];
    const filteredQFinals = [...this.state.resultsQFinals].filter(result => !result.today && typeof result.link !== "undefined");
    filteredQFinals.forEach((result, index) => {
      if ((index % 2) === 0) {
        pairedPastGamesQFinals.push([
          result,
          filteredQFinals[index + 1],
        ])
      }
    });
    //console.log(pairedPastGames);
    this.setState({
      pairedPastGames,
      pairedPastGamesQFinals
    });
  }

  setGaAnalytics() {
    /*if (document.cookie.indexOf(`${GA_DISABLE_COOKIE_STR}=false`) > -1) {
      console.log("Set GA");
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];
      // @ts-ignore
      const gtag = (arg1: any, arg2: any) => { window.dataLayer.push([arg1, arg2]); }
      gtag('js', new Date());
      gtag('config', GA_PROPERTY);
    }*/
  }

  componentWillMount() {
    // Disable GA tracking
    this.setGaAnalytics();
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

    //const newsemiFinals: StateInfo[] = [/*this.getUpdatesOld(semifinals[0]), */this.getUpdatesOld(semifinals[0])];

    //const newFinals: StateInfo[] = [this.getUpdatesOld(finals[0])];

    //const newPlayoff: StateInfo[] = [this.getUpdatesOld(playoff[0])];
    //const newsemiFinals = [];
//const newFinals = [];
//const newPlayoff = [];
    const newState = {
      resultsKnockout: this.getUpdates(resJSON, "knockout"),
      resultsQFinals: this.getUpdates(resJSON, "quarter"),
      resultsSemiFinals: [
        ...this.getUpdates(resJSON, "semi") /*...this.getUpdates(resJSON, "unknown")*/
      ],
      resultsFinals: [
        ...this.getUpdates(resJSON, "final"), /* ...this.getUpdates(resJSON, "unknown"), */ /*...newFinals*/
      ],
      resultsPlayoff: [
        ...this.getUpdates(resJSON, "playoff"), /*...this.getUpdates(resJSON, "unknown"),  ...newPlayoff*/
      ],
      resultsLoosers: [
        ...this.getUpdates(resJSON, "mini"), ...this.getUpdates(resJSON, "unknown"),
      ]
    }

    console.log("Setting state...");

    this.setState(newState);

    console.log("DONE");

    // Calculation!
    // Join by ref to prevent mass memeory copy
    const joined = [
      this.state.resultsKnockout,
      this.state.resultsQFinals,
      this.state.resultsSemiFinals,
      this.state.resultsFinals,
      this.state.resultsPlayoff,
      // this.state.resultsLoosers,
    ];
    const numberPoll = joined.reduce((accumulator, currentResult) => accumulator + currentResult.length, 0);
    const totalVotes = joined.reduce(
      (accumulator, currentResults) => accumulator + currentResults.reduce((acc, currentResult) => currentResult.one.votes + currentResult.two.votes, 0),
      0
    );

    this.setState({
      totalVotes: totalVotes,
      meanVotes: (totalVotes / numberPoll),
    });
  }

  /*getSpaceRatio() {
    return (screen.availWidth - (window.outerWidth - window.innerWidth)) / (screen.availHeight - (window.outerHeight - window.innerHeight));
  }*/

  render() {

    return (
      <div className="App">
        <div className="header">
          <h1><b>Tube Lines World Cup</b></h1>
          <h5>Updated every 60 secs. Please view in landscape.</h5>
          <h6>Note: if no votes are showing, the API this site uses has gone down and should be back up in a few mins.</h6>
        </div>

        <h2><b>2020 Results</b></h2>

        <Container className="quotedReport">
          <h5>A message from @official_gumjoe:</h5>
          <h5 className="text-left">
            Thanks to everyone who helped make this site, from @davwheat_ for the API, @_FlaiFlai for the original API (which sparked me to create this site) and of course to all the members of the community who contributed ideas!
            <br />And thanks to Geoff for putting on the Tube World Cup, and for providing the opportunity for us devs to come together to add to the experience! It's been a great 2 weeks, and I look forward to next year, where the site will return!
          </h5>
        </Container>

        <h2>Final rankings:</h2>
        <RankTable final={this.state.resultsFinals[0] || BLANK_RESULT} playoff={this.state.resultsPlayoff[0] || BLANK_RESULT} />

        <h3>Bonus Losers Mini Tournament!</h3>
        <ResultsTable results={this.state.resultsLoosers} />
        <Container>
          <Row>
            <Graphs results={this.state.resultsLoosers} history={this.state.resultsHistories} isToday={true} />
          </Row>
        </Container>

        {/* NOTE: UNCOMMENT FOR NEXT YEAR
        <h3>Today's games:</h3>
        <h6>Straight lines represent votes in the same match from previous years.</h6>
        <h6>Thin grey lines represent the difference between options.</h6>

        { this.state.resultsFinals.filter(result => result.today).map(result => {
          if (typeof result.venue !== "undefined" && typeof venueQuoteMap[result.venue] !== "undefined") {
            return (
              <Container className="quotedReport">
                <h5>{venueQuoteMap[result.venue]}</h5>
              </Container>
            )
          } else {
            return null;
          }
        })}

        <Container>
          <Row>
            <Graphs results={this.state.resultsLoosers} history={this.state.resultsHistories} />
          </Row>
      </Container>*/}


        <Container>
          <Row>
            <Col>
              <h3>2020 Stats</h3>
              Total Votes Cast: {this.state.totalVotes}<br/>
              Mean votes per poll: {this.state.meanVotes.toFixed(0)}<br />
              Maximum votes cast in one poll (the final): {typeof this.state.resultsFinals[0] !== "undefined" ? this.state.resultsFinals[0].one.votes + this.state.resultsFinals[0].two.votes : 0}<br />
              Total unique users of this site on the days of the final: 676<br />
              Total views on the day of the final for this site: 3.3K<br />
              <a href="https://twitter.com/geofftech/status/1325375626681995265">Click here to view the official Wallchart from Geoff!</a><br /> 
              <br /> 
            </Col>
          </Row>
        </Container>

        <h3><b>The Final</b></h3>
        <ResultsTableCompact close results={this.state.resultsFinals} allowVenues />
        { /*<ResultsTable results={this.state.resultsFinals} allowVenues />*/}
        <Container>
          <h3>How the Final played out</h3>
          <ul className="text-left">
            <li>The final ran over 2 days!</li>
            <li>Even Thameslink and the DLR themselves got involved, telling people through information boards in stations and using the PA system to vote.</li>
            <li>Throughout the first day, it was neck and neck.</li>
            <li>The line with the lead flipped several times throughout the day, with the number of votes for each equal at times!</li>
            <li>The difference between the two lines never exceeded 100 votes on the first day!</li>
            <li>Towards the end of the day, the DLR had the lead, but towards the late hours of the evening Thameslink took a slender lead, which continued into the morning!</li>
            <li>At the beginning of the 2nd day, the DLR took a slim lead</li>
            <li>This grew to 200 votes, and at 14:30 Joe-Wheatley pollsters, runners of this site, decided to call (project) the winner as the DLR.</li>
            <li>Yet, a late afternoon/evening push from Thameslink closed the gap, but Thameslink did not overtake the DLR.</li>
            <li>The DLR was still the projected winner - that was, until an unexpected surge of 600 Thameslink votes came in, putting Thameslink well into the lead.</li>
            <li>At 23:00, with 500 votes between Thameslink and the DLR and 6 hours until polls closed, Joe-Wheatley pollsters called Thameslink as the winner.  This was the eventual, final result</li>
            <li>By 5am in the morning, when the polls closed, Thameslink was the final winner by 572 votes.</li>
            <li>Overall, 19790 votes were cast, the most for any match and ~2.3x that cast in the 2019 final!</li>
            <li><a href="https://twitter.com/official_gumjoe/status/1324999160706330626">You can view @official_gumjoe's Twitter megathread for the 2nd day here</a></li>
          </ul>
        </Container>

        <h4>How the votes changed as the day progressed:</h4>
        <Container>
          <Row>
            <Graphs close results={this.state.resultsFinals} history={this.state.resultsHistories} isToday={false}/>
          </Row>
        </Container>


        <h3>3rd/4th Playoff:</h3>
        <ResultsTableCompact results={this.state.resultsPlayoff} allowVenues />
        <Container>
          <Row>
            <Graphs close results={this.state.resultsPlayoff} history={this.state.resultsHistories} isToday={false} />
          </Row>
        </Container>
        
        <h3>Semifinals Results:</h3>
        <ResultsTable results={this.state.resultsSemiFinals} allowVenues />
        <Container>
          <Row>
            <Graphs close results={this.state.resultsSemiFinals} history={this.state.resultsHistories} isToday={false} />
          </Row>
        </Container>

        <h3>Quarterfinal Results:</h3>
        <ResultsTable results={this.state.resultsQFinals} allowVenues />
        <Container>
          {
            this.state.pairedPastGamesQFinals.map(([game1, game2]) => {
              //console.log(game1);
              return (
                <Row>
                  <Graphs results={typeof game2 !== "undefined" ? [game1, game2] : [game1]} history={this.state.resultsHistories} isToday={false} />
                </Row>)
            })
          }
        </Container>

        <h3>Knockout stage results:</h3>
        <ResultsTable results={this.state.resultsKnockout} />
        <Container>
            {
             this.state.pairedPastGames.map(([game1, game2]) => {
               //console.log(game1);
               return (
               <Row>
                   <Graphs results={typeof game2 !== "undefined" ? [game1, game2] : [game1]} history={this.state.resultsHistories} isToday={false} />
               </Row>)
             })
            }
        </Container>

        {/* Cookie stuff */}
        <Navbar fixed="bottom">
          <CookieConsent
            enableDeclineButton
            declineButtonText="No thanks"
            onAccept={
              () => { gaSetState(false); window.location.reload(); }
            }
            onDecline={
              () => { gaSetState(true); window.location.reload(); }
            }
          >
            This website uses cookies (via Google Analytics) for analytics.
            <a href={process.env.PUBLIC_URL + "/privacy.html"}>View Privacy Policy</a>
          </CookieConsent>
        </Navbar>

        <footer>
          <Container>
            Created by @k_sam_mighty for <a href="https://twitter.com/geofftech">Geoff Marshall's</a> World Cup of Tube Lines.<br/>
            Find me (@k_sam_mighty) here:<br />
            <a href="https://github.com/Gum-Joe"><FontAwesomeIcon icon={faGithub} /> Gum-Joe</a> <br />
            <a href="https://twitter.com/official_gumjoe"><FontAwesomeIcon icon={faTwitter} /> @official_gumjoe</a> <br />
            <a href="https://www.instagram.com/k_sam_mighty"><FontAwesomeIcon icon={faInstagram} /> @k_sam_mighty</a> <br />
            <a href="https://www.youtube.com/channel/UCIwdVs7v-WL7_5erRzNv6sw"><FontAwesomeIcon icon={faYoutube} /> Gum Joe</a>
            <br />Special thanks to <a href="https://github.com/davwheat">@davwheat</a> for the API, and <a href="https://twitter.com/_FlaiFlai">@_FlaiFlai</a> for the original API.
            <br />Thank you to all the memebers of the community who contributed ideas!
            <br /><a href={process.env.PUBLIC_URL + "/privacy.html"}>View Privacy Policy</a>
          </Container>
        </footer>

      </div>
    );
  }
}



export default App;
