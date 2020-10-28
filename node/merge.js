const david = require("./other.json");
const me = require("./backup.2.results.json");
const fs = require("fs");

const davidEntries = Object.entries(david);


me.matches.forEach((match) => {
	const one = match.one;
	const two = match.two;
	davidEntries.forEach(([ key, value ]) => {
		if (typeof value.options === "undefined") {
			return;
		}
		// @ts-ignore
		if (value.options.one === one && value.options.two === two) {
				// Add
			david[key].results = [
				...david[key].results,
				...match.results
			]
			david[key].results = david[key].results.sort((a, b) => {
				return a.timestamp - b.timestamp
			});
			console.log(value.options.one);
			console.log(david[key].results[0]);
			console.log(david[key].results[david[key].results.length - 1])
		}
	})
});


// DONE!
fs.writeFileSync("output.json", JSON.stringify(david, null, "\t"));