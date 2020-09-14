// https://confluence.yanolja.in/pages/viewpage.action?pageId=67178996

import { loggerLevel } from "../enums/LoggerEnum";

export interface ILoggingErrorFormat {
  "@timestamp": string;
  "@version": string;
  service: string;
  phase: string;
  hostname: string;
  level: loggerLevel;
  thread: string;
  logger: string;
  message: string;
  exception: string;
  traceId: string;
  user: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
}

export interface ILoggingDebugFormat {
  service?: string;
  message?: string;
  exception?: string;
  user?: any;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
}

export interface ILoggingInfoFormat {
  "@timestamp": string;
  "@version": string;
  service: string;
  phase: string;
  hostname: string;
  level: loggerLevel;
  thread: string;
  traceId: string;
  clientIp: string;
  path: string;
  method: string;
  reqHeaders: string;
  reqBody: string;
  status: number;
  resHeaders: string;
  resBody: string;
  browserName?: string;
  browserVersion?: string;
  osName?: string;
  osVersion?: string;
  elapsedTime: string;
}
