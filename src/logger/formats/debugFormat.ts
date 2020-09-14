import os from "os";
import useragent from "useragent";
import moment from "moment";
import { stringifyWithReplacer } from "../js/helper";
import {ILoggingDebugFormat, ILoggingErrorFormat} from "../interfaces/ILoggingFormat";
import { loggerFormat, loggerLevel } from "../enums/LoggerEnum";

export default function debugFormat(info: ILoggingDebugFormat) {
    const { exception, message, user } = info;
    const agent = useragent.parse(user?.useragent);
    const osName = agent.os.toJSON().family;
    const osVersion = agent.os.toVersion();
    const browserName = agent.toJSON().family;
    const browserVersion = agent.toVersion();

    const log: ILoggingErrorFormat = {
        "@timestamp": moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss[.]SSSZZ"),
        "@version": "1",
        service: loggerFormat.SERVICE_NAME,
        phase: process.env.API_ENV,
        hostname: os.hostname(),
        level: loggerLevel.DEBUG,
        thread: "-",
        logger: "-",
        message: message || "-",
        exception: exception ? stringifyWithReplacer(exception) : "-",
        traceId: "-",
        user: user ? stringifyWithReplacer(user) : "-",
        browserName,
        browserVersion,
        osName,
        osVersion
    };
    return JSON.stringify(log);
}