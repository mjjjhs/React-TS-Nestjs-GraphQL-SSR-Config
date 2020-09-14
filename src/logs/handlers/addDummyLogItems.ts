import {Request, Response} from "express";
import {Log} from "../log.model";
import {IDummyLogItem, IEventPath, IOsInfo, IReturnData} from "../interfaces/addDummyLogItems";

const getRandomNumber = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

const getRandomDate = (start: Date, end: Date): Date => {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
};

const eventPathArr: IEventPath[] = [
    { eventName: "getProductListForYAP", pathName: "/product/list" },
    { eventName: "getProductDetailForYAP", pathName: "/product/detail" },
    { eventName: "getOrderListForYAP", pathName: "/order/list" },
    { eventName: "getOrderDetailForYAP", pathName: "/order/detail" }
];

const generateOsNameVersion = (index: number): IOsInfo => {
    const osNames: string[] = ["Windows", "OS X"];
    const osVersions: string[][] = [
        ["XP", "7", "8", "10"],
        ["10.12", "10.13", "10.14", "10.15"]
    ];
    return {
        osName: osNames[index],
        osVersion: osVersions[index][Math.floor(getRandomNumber(0, 4))]
    };
};


const generateData = (i: number): IDummyLogItem => {
    const eventPathRandNum: number = Math.floor(getRandomNumber(0, 4));
    const osNameVersionRandNum: number = Math.floor(getRandomNumber(0, 2));
    const isAsync: number = Math.floor(getRandomNumber(0, 2));

    return {
        id: i,
        networkTime: !isAsync ? Math.floor(getRandomNumber(100, 5000)) : null,
        pageLoadTime: !isAsync ? Math.floor(getRandomNumber(100, 5000)) : null,
        spendTime: !isAsync ? Math.floor(getRandomNumber(100, 5000)) : null,
        eventSpendTime: isAsync ? Math.floor(getRandomNumber(100, 5000)) : null,
        eventName: isAsync ? eventPathArr[eventPathRandNum].eventName : null,
        isAsync,
        hostName: ["yap-partner.dev.yanolja.in", "yap-cs-admin.dev.yanolja.in"][Math.floor(getRandomNumber(0, 2))],
        pathName: eventPathArr[eventPathRandNum].pathName,
        osName: generateOsNameVersion(osNameVersionRandNum).osName,
        osVersion: generateOsNameVersion(osNameVersionRandNum).osVersion,
        osArchitecture: "64",
        networkType: ["3G", "LTE", "Desktop"][Math.floor(getRandomNumber(0, 3))],
        location: "Seoul, Korea",
        createdAt: getRandomDate(new Date(2020, 0, 1), new Date())
    };
};

const generateDummyLogPromises = (quantity: number, model: typeof Log): Promise<IDummyLogItem>[] => {
    const promises = [];
    for(let i=1; i <= quantity; i++) {
        promises.push(model.create(generateData(i)));
    }

    return promises;
};

export const addDummyLogItems = (req: Request, res: Response, model: typeof Log): Promise<void|Response> => {
    return Promise.all(generateDummyLogPromises(1000, model))
        .then(() => {
            const returnData: IReturnData = {
                statusCode: 200,
                message: '더미 로그 저장 완료'
            };
            res.json(returnData);
        }).catch(err => {
            if (err.name === 'SequelizeValidationError') {
                return res.status(400).json({msg: err.message});
            }
            res.status(400).json(err.message);
        });
};