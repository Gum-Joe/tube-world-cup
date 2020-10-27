const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { createLogger } = require("./logger");
const superagent = require("superagent");
const { promises: fs, watchFile } = require("fs");

const logger = createLogger("server");

const app = express();

const PREFIX = "https://twitter.www.statshelix.com"

const tweets = [
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637628518223872",
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637979858247680",
  PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321001660479639552",
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321002110801108993",
]

app.use(helmet());
app.use(morgan("dev"));

app.use((req, res, next) => {
	// @ts-ignore
	res.jsonMessage = (message, extraJSON) => {
		res.json({ message, ...extraJSON });
	};
	next();
});

const RESULTS = "results.json";

logger.info("Starting server...");
logger.info("Starting updater...");

async function updateTweets() {
	const newResults = await Promise.all(tweets.map(async (url) => {
		const res = await superagent
			.get(url);
		if (res.status !== 200) {
			logger.error(`Got status code ${res.status} requesting ${url}`);
			return;
		}
		// Strip;
		let one;
		let two;
		let winner;

		const resBody = res.text;
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

		return {
			one: {
				name: splitted[0].split(":")[0].trim(),
				votes: one,
			},
			two: {
				name: splitted[1].split(":")[0].trim(),
				votes: two,
			},
			winner,
			link: url.split("url=")[1]
		}
	}));

	// Next, load resulkts
	const results = JSON.parse((await fs.readFile(RESULTS)).toString());
	newResults.forEach((result) => {
		const filtered = results.matches.filter(element => {
			return (element.one === result.one.name) && (element.two === result.two.name)
		});
		if (filtered.length === 0) {
			// Add
			logger.info(`Adding match ${result.one.name} vs ${result.two.name}`)
			results.matches.push({
				one: result.one.name,
				two: result.two.name,
				startTime: Date.now(),
				results: [{
					time: Date.now(),
					votes: {
						one: result.one.votes,
						two: result.two.votes
					}
				}]
			})
		} else {
			results.matches.map((element) => {
				if (element.one === result.one.name && element.two === result.two.name) {
					// Add this result
					element.results.push({
						time: Date.now(),
						votes: {
							one: result.one.votes,
							two: result.two.votes
						}
					})
				} else {
					return element;
				}
			})
		}
	});

	logger.info("Adjustments done.");
	await fs.writeFile(RESULTS, JSON.stringify(results, null, "\t"));
}

logger.info("Watching for updates...");
// Update once a minute
const CHANGE_TIME = 60000;
setInterval(updateTweets, CHANGE_TIME);

let resultsFile;
fs.readFile(RESULTS).then(results => resultsFile = JSON.parse(results.toString()));

watchFile(RESULTS, { persistent: false }, () => {
	fs.readFile(RESULTS).then(results => resultsFile = JSON.parse(results.toString()));
	logger.info("File updated!");
})

app.get("/api/get/tube-results", (req, res) => {
	res.statusCode = 200;
	res.json(resultsFile);
	res.end();
});

const PORT = 6000;

app.listen(PORT, () => {
	logger.info(`Listenning on port ${PORT}`);
})