// import geoip from 'geoip-lite';
import {IAddLogItemsBody, IpType} from "../interfaces/addLogItems";
import {Request, Response} from "express";
import {Log} from "../log.model";

export const addLogItems = async (req: Request, res: Response, model: typeof Log, body: IAddLogItemsBody): Promise<void> => {
    const ip: IpType = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    // const geo = geoip.lookup(ip);
    // const location: string = geo && geo.city;

    const {
        networkTime,
        pageLoadTime,
        spendTime,
        eventSpendTime,
        eventName,
        hostName,
        pathName,
        osName,
        osVersion,
        osArchitecture,
        networkType,
    } = body;

    const isAsync: number = (eventSpendTime && eventName)? 1 : 0;

    try {
        validateLogItems(body);
        await model.create({
            networkTime,
            pageLoadTime,
            spendTime,
            eventSpendTime,
            eventName,
            isAsync,
            hostName,
            pathName,
            osName,
            osVersion,
            osArchitecture,
            networkType,
            location
        });
        res.json({ statusCode: 200, message: '로그 저장 완료'});
    } catch(err) {
        if (err.name === 'SequelizeValidationError') {
            res.status(400).json({msg: err.message});
        }
        res.status(400).json(err.message);
    }
};

const validateLogItems = (body: IAddLogItemsBody): void => {
    const {
        networkTime,
        pageLoadTime,
        spendTime,
        eventSpendTime,
        eventName
    } = body;

    const isSync: boolean = !!(networkTime || pageLoadTime || spendTime);
    const isAsync: boolean = !!(eventSpendTime && eventName);
    if(isSync) {
        const isFullSync: boolean = !!(networkTime && pageLoadTime && spendTime);
        if(!isFullSync) throw new Error('sync validation error');
        if(eventSpendTime || eventName) throw new Error('sync validation error');
    } else {
        if(!isAsync) throw new Error('async validation error');
    }
};