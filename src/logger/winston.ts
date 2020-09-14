import fs from "fs";
import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import appRoot from "app-root-path";
import { loggerLevel } from "./enums/LoggerEnum";
const logDir = `${appRoot}/log`;

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

let logger;
if (process.env.API_ENV !== "production") {
    logger = createLogger({
        format: format.printf(info => info.message),
        transports: [
            new transports.Console(),
            new transports.File({ filename: "app.log", level: loggerLevel.ERROR, dirname: logDir }),
            new transports.File({ filename: "req.log", level: loggerLevel.INFO, dirname: logDir }),
            new transports.DailyRotateFile({
                level: loggerLevel.ERROR,
                filename: "app.log",
                datePattern: "YYYY-MM-DD",
                dirname: logDir
            }),
            new transports.DailyRotateFile({
                level: loggerLevel.INFO,
                filename: "req.log",
                datePattern: "YYYY-MM-DD",
                dirname: logDir
            })
        ]
    });
} else {
    logger = createLogger({
        format: format.printf(info => info.message),
        transports: [
            new transports.File({ filename: "app.log", level: loggerLevel.ERROR, dirname: logDir }),
            new transports.File({ filename: "req.log", level: loggerLevel.INFO, dirname: logDir }),
            new transports.DailyRotateFile({
                level: loggerLevel.ERROR,
                filename: "app.log",
                datePattern: "YYYY-MM-DD",
                dirname: logDir
            }),
            new transports.DailyRotateFile({
                level: loggerLevel.INFO,
                filename: "req.log",
                datePattern: "YYYY-MM-DD",
                dirname: logDir
            })
        ]
    });
}

const stream = {
    write: message => {
        logger.info(message);
    }
};

export { logger, stream };
