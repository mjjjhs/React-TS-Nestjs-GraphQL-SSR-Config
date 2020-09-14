export interface IAddLogItemsBody {
    networkTime?: number,
    pageLoadTime?: number,
    spendTime?: number,
    eventSpendTime?: number,
    eventName?: string,
    hostName?: string,
    pathName?: string,
    osName?: string,
    osVersion?: string,
    osArchitecture?: string,
    networkType?: string,
}

export type IpType = string | Array<string>;