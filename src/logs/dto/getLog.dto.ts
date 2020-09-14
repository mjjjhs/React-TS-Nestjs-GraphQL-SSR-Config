import {ApiModelPropertyOptional} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {SyncAsyncType} from "../enums/getLogQuery";

export class GetLogDto {
    @ApiModelPropertyOptional({
        description: 'Select in [ALL, SYNC, ASYNC]',
        example: 'ALL'
    })
    syncAsyncType: SyncAsyncType;

    @ApiModelPropertyOptional({
        description: 'valid with endDate',
        example: '2020-01-01'
    })
    startDate: string;

    @ApiModelPropertyOptional({
        description: 'valid with startDate',
        example: '2020-12-31'
    })
    endDate: string;

    @ApiModelPropertyOptional({
        description: 'valid with startTime & endTime',
        example: '2020-01-01'
    })
    singleDate: string;

    @ApiModelPropertyOptional({
        description: 'valid with endTime',
        example: '00:00'
    })
    startTime: string;

    @ApiModelPropertyOptional({
        description: 'valid with startTime',
        example: '24:00'
    })
    endTime: string;

    @ApiModelPropertyOptional({
        description: 'valid with max',
        example: 0
    })
    min: number;

    @ApiModelPropertyOptional({
        description: 'valid with min',
        example: 5000
    })
    max: number;

    @ApiModelPropertyOptional({
        example: 'lqt-admin'
    })
    hostName: string;

    @ApiModelPropertyOptional({
        example: '/product/list'
    })
    pathName: string;

    @ApiModelPropertyOptional({
        example: 'detail'
    })
    eventName: string;

    @ApiModelPropertyOptional({
        example: 'OS X'
    })
    osName: string;

    @ApiModelPropertyOptional({
        example: '10.14'
    })
    osVersion: string;
}