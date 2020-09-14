import Logger from "./logger.service";
import requestFormat from "./formats/requestFormat";

export function logger(req, res, next) {
    if (req.url === '/health') {
        next();
        return;
    }
    const msg = requestFormat(req, res);
    Logger.log(msg);
    next();
}