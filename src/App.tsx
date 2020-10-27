import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import { Col, Container, Row, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheckCircle, faTicketAlt } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

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

const DEVNULL = "https://devnull-as-a-service.com/dev/null";
const PREFIX = "https://gentle-wildflower-0e5e.kishansambhi.workers.dev/?https://twitter.www.statshelix.com"

const pairs = [
  [
    "Bakerloo",
    "Northern",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637628518223872"
  ],
  [
    "Jubilee",
    "TfL Rail",
    PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637979858247680"
  ],
  [
    "Central",
    "District",
    DEVNULL
  ],
  [
    "Circle",
    "Thames Link",
    DEVNULL
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
}

class App extends Component<any, { results: StateInfo[] }> {

  constructor(props: any) {
    super(props);

    this.state = {
      results: []
    }
  }

  componentDidMount() {
    const newPairs: Promise<StateInfo>[] = pairs.map(async (tuple): Promise<StateInfo> => {
      let one: number = 0;
      let two: number = 0;
      let winner: number = 0;
      try {
        if (tuple[2] !== DEVNULL) {
          // Can get it
          const res = await fetch(tuple[2], { mode: "no-cors" });

          const resBody = await res.text();
          console.log(resBody);
          console.log(res.status);
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
            winner = 1;
          }

        }
      } catch (err) {
        console.log(err.stack);
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
        <h1>Tube Lines World Cup:</h1>
        <Table striped bordered variant="dark" responsive>
          <thead>
            <tr>
              <th>Line 1</th>
              <th>Votes</th>
              <th>%</th>
              <th>Line 2</th>
              <th>Votes</th>
              <th>%</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.results.map((result) => {
                return (
                  <tr>
                    <td className={result.one.className}>{result.one.name} { result.winner === 1 ? <FontAwesomeIcon icon={faCheckCircle}/> : "" }</td>
                    <td>{result.one.votes}</td>
                    <td>{((result.one.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
                    <td className={result.two.className}>{result.two.name} {result.winner === 2 ? <FontAwesomeIcon icon={faCheckCircle} /> : ""}</td>
                    <td>{result.two.votes}</td>
                    <td>{((result.two.votes / (result.one.votes + result.two.votes) * 100) || 0).toFixed(1)}%</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        {/*<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
  </header>*/}
      </div>
    );
  }
}



export default App;
