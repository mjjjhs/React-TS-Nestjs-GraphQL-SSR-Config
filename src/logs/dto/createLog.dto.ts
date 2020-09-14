import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLogDto {
    @ApiPropertyOptional()
    networkTime: number;

    @ApiPropertyOptional()
    pageLoadTime: number;

    @ApiPropertyOptional()
    spendTime: number;

    @ApiPropertyOptional()
    eventSpendTime: number;

    @ApiPropertyOptional()
    eventName: string;

    @ApiProperty()
    isAsync: number;

    @ApiProperty()
    hostName: string;

    @ApiPropertyOptional()
    pathName: string;

    @ApiPropertyOptional()
    osName: string;

    @ApiPropertyOptional()
    osVersion: string;

    @ApiPropertyOptional()
    osArchitecture: string;

    @ApiPropertyOptional()
    networkType: string;

    @ApiPropertyOptional()
    location: string;
}