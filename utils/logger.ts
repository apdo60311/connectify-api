import { createLogger, format, info, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

/**
 * Configures a Winston logger with a custom log format and transports.
 * 
 * The logger is configured with the following:
 * - A custom log format that includes the timestamp, log level, and error stack trace (if present)
 * - Colorization of log levels (warning = yellow, info = green, error = red)
 * - Transports:
 *   - Console transport
 *   - Error log file transport (logs only errors)
 *   - Combined log file transport (logs all levels)
 */
const customFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logger = createLogger({
  format: combine(
    colorize({ colors: { warning: "yellow", info: "green", error: "red" } }),
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    customFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
});

export default logger;