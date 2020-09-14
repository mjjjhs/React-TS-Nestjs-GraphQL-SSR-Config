import {Body, Controller, Get, Next, Post, Query, Req, Res} from '@nestjs/common';
import {LogsService} from "./logs.service";
import {CreateLogDto} from "./dto/createLog.dto";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {GetLogDto} from "./dto/getLog.dto";
import {Request, Response, NextFunction} from 'express';

@ApiTags('logs')
@Controller('api')
export class LogsController {
    constructor(private logsService: LogsService) {}

    @Get('v1/logs')
    @ApiOkResponse({ description: 'OK'})
    async getLogItems(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Query() query: GetLogDto): Promise<void> {
        return this.logsService.getLogItems(req, res, next, query);
    }

    @Get('v1/logs/spendTime')
    @ApiOkResponse({ description: 'OK'})
    async getSpendTimes(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<void> {
        return this.logsService.getSpendTimes(req, res, next);
    }

    @Post('v1/logs')
    @ApiCreatedResponse({ description: 'OK'})
    async addLogItems(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction, @Body() createLogDto: CreateLogDto): Promise<void> {
        return this.logsService.addLogItems(req, res, next, createLogDto);
    }

    @Post('v1/logs/dummy')
    @ApiCreatedResponse({ description: 'OK'})
    async addDummyLogItems(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction): Promise<void|Response> {
        return this.logsService.addDummyLogItems(req, res, next);
    }
}