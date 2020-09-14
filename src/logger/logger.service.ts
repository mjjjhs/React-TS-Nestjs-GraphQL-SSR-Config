import { LoggerService as LS } from "@nestjs/common";
import { Logger } from "winston";
import { logger } from "./winston";

class LoggerService implements LS {
    private logger: Logger;

    constructor() {
        this.logger = logger;
    }

    log(message: string) {
        this.logger.info(message);
    }
    error(message: string, trace: string) {
        this.logger.error(message, trace);
    }
    warn(message: string) {
        this.logger.warning(message);
    }
    debug(message: string) {
        this.logger.error(message, '-');
    }
    verbose(message: string) {
        this.logger.verbose(message);
    }
}

export default new LoggerService();
