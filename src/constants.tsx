export const REALTIME_RESULTS = "https://api.davwheat.dev/fullhistory";
export const classes: { [key: string]: string; } = {
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
};
export const tweetNameMap: { [key: string]: string; } = {
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
};
export const colours: { [key: string]: string; } = {
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
};
export const DEVNULL = "https://devnull-as-a-service.com/dev/null";
const PREFIX = "https://twitter.www.statshelix.com";
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
    DEVNULL,
    "false" // CHANGEME
  ],
  [
    "DLR",
    "Piccadilly",
    DEVNULL,
    "false" // CHANGEME
  ]
];
export const semifinals = [
  /*[
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
    "Overground",
    "DLR",
    DEVNULL,
    "false",
    "Shadwell"
  ],*/
  [
    "Jubilee",
    "Thameslink",
    DEVNULL,
    "false",
    "West Hampstead"
  ],
  [
    "Victoria",
    "DLR",
    DEVNULL,
    "false",
    "???"
  ]
];

export const finals = [
  [
    "???",
    "???",
    DEVNULL,
    "???",
    "???"
  ],
];
export const playoff = [
  [
    "???",
    "???",
    DEVNULL,
    "???",
    "???"
  ],
];

export interface StateInfo {
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
export interface DavidAPI {
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
    }[];
  };
}
export interface ResultHistories {
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
  }[];
}
