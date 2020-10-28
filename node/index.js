const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const { createLogger } = require("./logger");
const superagent = require("superagent");
const { promises: fs, watchFile } = require("fs");
const cors = require("cors");

const logger = createLogger("server");

const app = express();

const PREFIX = "https://twitter.www.statshelix.com"
const FULL_PREFIX = PREFIX + "/api/Tweet/GetTweet?url=";

const tweets = [
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637628518223872",
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1320637979858247680",
  PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321001660479639552",
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321002110801108993",
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321364991803621376",
	PREFIX + "/api/Tweet/GetTweet?url=https://twitter.com/geofftech/status/1321365302811217923",
	// FULL_PREFIX + "..."
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
	logger.info("BEING UPDATE");
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
		
		let oneName = splitted[0].split(":")[0].trim();
		let twoName = splitted[1].split(":")[0].trim();

		if (oneName === "Hammersmith & City Line") {
			oneName = "H&C Line";
		}

		if (twoName === "Hammersmith & City Line") {
			twoName = "H&C Line";
		}

		return {
			one: {
				name: oneName,
				votes: one,
			},
			two: {
				name: twoName,
				votes: two,
			},
			winner,
			link: url.split("url=")[1]
		}
	}));

	//console.log(newResults);

	// Next, load resulkts
	const results = JSON.parse((await fs.readFile(RESULTS)).toString());
	newResults.forEach((result) => {
		const filtered = results.matches.filter(element => {
			return (element.one === result.one.name) && (element.two === result.two.name)
		});
		//console.log(filtered);
		//console.log(results.matches);
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
				if ((Date.now() - element.startTime) > 24 * 60 * 60 * 1000) {
					// If more than 24 hrs have passed, don't update
					logger.debug(`More than 24 hrs have passed for ${element.one} vs ${element.two}`);
					return element;
				}
				logger.debug(element.one);
				logger.debug(element.two);
				if (element.one === result.one.name && element.two === result.two.name) {
					// Add this result
					logger.info(`Updated the ${result.one.name} vs ${result.two.name}`)
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
			});
		}
	});

	logger.info("Adjustments done.");
	const fd = await fs.writeFile(RESULTS, JSON.stringify(results, null, "\t"));
	logger.debug("File written.");
}

logger.info("Watching for updates...");
updateTweets();
// Update once a minute
const CHANGE_TIME = 30000;
setInterval(updateTweets, CHANGE_TIME);

let resultsFile;
fs.readFile(RESULTS).then(results => resultsFile = JSON.parse(results.toString()));

watchFile(RESULTS, { persistent: false }, () => {
	fs.readFile(RESULTS).then(results => resultsFile = JSON.parse(results.toString()));
	logger.info("File updated!");
})

app.get("/api/get/tube-results", cors(), (req, res) => {
	res.statusCode = 200;
	res.json(resultsFile);
	res.end();
});

const PORT = process.env.TUBE_PORT || 25409;

app.listen(PORT, () => {
	logger.info(`Listenning on port ${PORT}`);
})
