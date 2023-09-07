const fs = require("fs");
const path = require("path");

function loggingMiddleware(err, req, res, next) {
  const successStatus =
    res.statusCode >= 200 && res.statusCode < 300 ? "Success" : "Failure";

  const logEntry =
    `[${new Date().toISOString()}]\n` +
    `IP Address: ${req.ip}\n` +
    `User Agent: ${req.get("User-Agent")}\n` +
    `Referrer: ${req.get("Referrer")}\n` +
    `Query Parameters: ${JSON.stringify(req.query)}\n` +
    `Request Headers: ${JSON.stringify(req.headers)}\n` +
    `Request Body: ${JSON.stringify(req.body, null, 2)}\n` +
    `Method: ${req.method}\n` +
    `URL: ${req.url}\n` +
    `Full URL: ${req.protocol}://${req.get("host")}${req.originalUrl}\n` +
    `Status: ${successStatus}\n`;

  if (successStatus === "Failure") {
    // If the response has a failure status, include the error information in the log.
    logEntry += `Error: ${err.message || "Unknown error"}\n`;
  }

  logEntry += `-----------------------------------------------\n`;

  fs.appendFileSync(path.join(__dirname, "../logs", "logfile.log"), logEntry);
  next();
}

module.exports = loggingMiddleware;
