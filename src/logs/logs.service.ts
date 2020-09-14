import {Injectable, Next, Body, Query, Req, Res} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from './log.model';
import {getLogItems} from "./handlers/getLogItems";
import {getSpendTimes} from "./handlers/getSpendTimes";
import {addLogItems} from "./handlers/addLogItems";
import {addDummyLogItems} from "./handlers/addDummyLogItems";
import {CreateLogDto} from "./dto/createLog.dto";
import {Request, Response, NextFunction} from 'express';
import {GetLogDto} from "./dto/getLog.dto";

@Injectable()
export class LogsService {
    constructor(
        @InjectModel(Log)
        private logModel: typeof Log,
    ) {}

    async getLogItems(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Query() query: GetLogDto): Promise<void> {
        return await getLogItems(req, res, next, this.logModel, query);
    }

    async getSpendTimes(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
        return await getSpendTimes(req, res, next, this.logModel);
    }

    async addLogItems(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() createLogDto: CreateLogDto): Promise<void> {
        return await addLogItems(req, res, this.logModel, createLogDto);
    }

    async addDummyLogItems(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<void|Response> {
        return await addDummyLogItems(req, res, this.logModel);
    }
}