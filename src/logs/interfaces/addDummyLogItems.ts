export interface IEventPath {
    eventName: string;
    pathName: string;
}

export interface IOsInfo {
    osName: string;
    osVersion: string;
}

export interface IDummyLogItem {
    id: number;
    networkTime: number;
    pageLoadTime: number;
    spendTime: number;
    eventSpendTime: number;
    eventName: string;
    isAsync: number,
    hostName: string;
    pathName: string;
    osName: string;
    osVersion: string;
    osArchitecture: string;
    networkType: string;
    location: string;
    createdAt: Date;
}

export interface IReturnData {
    statusCode?: number;
    message?: string;
}