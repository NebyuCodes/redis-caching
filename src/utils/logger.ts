import path from "path";
import winston, { createLogger } from "winston";
import { configs } from "../config";
import { FileTransportInstance } from "winston/lib/winston/transports";

const prodTransport = new winston.transports.File({
  filename: path.join(process.cwd(), "logs/error.log"),
  level: "error",
});

const devTransport = new winston.transports.File({
  filename: path.join(process.cwd(), "logs/combine.log"),
});

let fileTransport: FileTransportInstance = devTransport;

if (configs.env === "production") {
  fileTransport = prodTransport;
}

export const logger = createLogger({
  level: "info",
  format: winston.format.simple(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple(),
        winston.format.timestamp()
        // winston.format.json()
      ),
      level: configs.env === "production" ? "error" : "info",
    }),
    fileTransport,
  ],
});
