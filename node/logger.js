/**
 * Contains the logger we use
 */
const chalk = require("chalk");
const stringify = require("fast-safe-stringify");
const winston = require("winston");

const { combine, colorize, printf, timestamp } = winston.format;

module.exports.createLogger = function (moduleName) {
	const options = {
		transports: [
			new winston.transports.Console({
				format: combine(
					colorize(),
					timestamp(),
					printf((info) => {
						return `${chalk.grey(info.timestamp)} ${chalk.magenta(moduleName)} ${info.level} ${info.message}`;
					}),
				),
				level: "debug",
			}),
			new winston.transports.File({
				filename: "log.log",
				format: combine(
					timestamp(),
					printf((info) => {
						info.moduleName = moduleName;
						return stringify(info);
					}),
				),
				level: "info",
			}),
		],
	};

	const newLogger = winston.createLogger(options);
	newLogger.transports[0].silent = false;
	return newLogger;
}