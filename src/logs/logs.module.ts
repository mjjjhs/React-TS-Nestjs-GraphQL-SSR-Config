import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Log } from './log.model';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';

@Module({
    imports: [SequelizeModule.forFeature([Log])],
    providers: [LogsService],
    controllers: [LogsController],
})
export class LogsModule {}