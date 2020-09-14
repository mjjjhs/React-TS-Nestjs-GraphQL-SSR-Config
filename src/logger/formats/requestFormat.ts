import os from "os";
import useragent from "useragent";
import moment from "moment";
import { stringifyWithReplacer } from "../js/helper";
import { ILoggingInfoFormat } from "../interfaces/ILoggingFormat";
import {loggerFormat, loggerLevel} from "../enums/LoggerEnum";

function exec(morgan) {
    morgan.token("phase", function getPhase() {
        return process.env.API_ENV;
    });

    morgan.token("hostname", function getHostname() {
        return os.hostname();
    });

    morgan.token("remote-addr", function(req) {
        return (
            req.headers["x-real-ip"] ||
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress
        );
    });

    morgan.token("url", function(req) {
        return req.protocol + "://" + req.get("host") + req.originalUrl;
    });

    morgan.token("method", function(req) {
        return req.method;
    });

    morgan.token("request-headers", function(req) {
        return stringifyWithReplacer(req.headers) || "";
    });

    morgan.token("request-body", function(req) {
        return stringifyWithReplacer(req.body) || "";
    });

    morgan.token("response-headers", function(res) {
        return stringifyWithReplacer(res.headers) || "";
    });

    morgan.token("response-body", function(res) {
        return stringifyWithReplacer(res.body) || "";
    });

    morgan.token("status", function(req, res) {
        return res.statusCode;
    });

    morgan.token("os-name", function(req) {
        const agent = useragent.parse(req.headers["user-agent"]);
        return agent.os.toJSON().family;
    });

    morgan.token("os-version", function(req) {
        const agent = useragent.parse(req.headers["user-agent"]);
        return agent.os.toVersion();
    });

    morgan.token("browser-name", function(req) {
        const agent = useragent.parse(req.headers["user-agent"]);
        return agent.toJSON().family;
    });

    morgan.token("browser-version", function(req) {
        const agent = useragent.parse(req.headers["user-agent"]);
        return agent.toVersion();
    });

    morgan.token("response-time", function(req, res) {
        return 0;
    });
}

export default function requestFormat(req, res) {
    const morgan = {
        token: function(type, callback) {
            this[type] = callback;
        }
    };
    exec(morgan);
    const log: ILoggingInfoFormat = {
        "@timestamp": moment(new Date()).format("YYYY-MM-DD[T]HH:mm:ss[.]SSSZZ"),
        "@version": "1",
        service: loggerFormat.SERVICE_NAME,
        phase: morgan["phase"](req, res),
        hostname: morgan["hostname"](),
        level: loggerLevel.INFO,
        thread: "",
        traceId: "",
        clientIp: morgan["remote-addr"](req, res),
        path: morgan["url"](req),
        method: morgan["method"](req),
        reqHeaders: morgan["request-headers"](req),
        reqBody: morgan["request-body"](req),
        status: morgan["status"](req, res),
        resHeaders: morgan["response-headers"](res),
        resBody: morgan["response-body"](res),
        browserName: morgan["browser-name"](req),
        browserVersion: morgan["browser-version"](req),
        osName: morgan["os-name"](req),
        osVersion: morgan["os-version"](req),
        elapsedTime: morgan["response-time"](req, res) + "ms"
    };
    return JSON.stringify(log);
}
