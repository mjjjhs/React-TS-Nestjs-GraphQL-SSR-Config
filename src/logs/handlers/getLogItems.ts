import moment, {Moment} from 'moment';
import Sequelize from 'sequelize';
import {Request, Response, NextFunction} from 'express';
import {Log} from "../log.model";
import {GetLogDto} from "../dto/getLog.dto";

export const getLogItems = async (
    req: Request,
    res: Response,
    next: NextFunction,
    model: typeof Log,
    query: GetLogDto
): Promise<void> => {
    try {
        // const schema = Joi.object({
        //     startDate: Joi.date(),
        //     endDate : Joi.date(),
        //     singleDate: Joi.date(),
        //     startTime: Joi.string(),
        //     endTime: Joi.string(),
        //     syncAsyncType : Joi.string(),
        //     hostName: Joi.string(),
        //     pathName: Joi.string(),
        //     eventName: Joi.string(),
        //     osName: Joi.string(),
        //     osVersion: Joi.string(),
        //     min: Joi.string(),
        //     max: Joi.string()
        // });
        // const {error} = await schema.validate(query);
        // if(error) next({status: 400, ...error});

        const {startDate, endDate, singleDate, startTime, endTime, syncAsyncType, hostName, pathName, osName, eventName, osVersion, min, max} = query;

        requestValidation(query);

        let isAsync: boolean = undefined;
        switch (syncAsyncType) {
            case 'ASYNC':
                isAsync = true;
                break;
            case 'SYNC':
                isAsync = false;
                break;
        }

        const Op = Sequelize.Op;
        const filterCondition: any = {};

        if(singleDate && startTime && endTime) {
            const momentStartTime: Moment = moment(`${singleDate} ${startTime}`).startOf('hour');
            const momentEndTime: Moment = moment(`${singleDate} ${endTime}`).subtract(1, 'hour').endOf('hour');
            filterCondition.createdAt = {
                [Op.gte]: momentStartTime,
                [Op.lte]: momentEndTime
            }
        }
        if(min && max) {
            filterCondition[Op.or] = [];
            filterCondition[Op.or][0] = {
                spendTime: {
                    [Op.gt]: Number(min),
                    [Op.lte]: Number(max)
                }
            };
            filterCondition[Op.or][1] = {
                eventSpendTime: {
                    [Op.gt]: Number(min),
                    [Op.lte]: Number(max)
                }
            };
            if(isAsync) filterCondition[Op.or].shift();
            if(isAsync !== undefined && !isAsync) filterCondition[Op.or].pop();
        }

        if(startDate && endDate) {
            const momentStartDate: Moment = moment(startDate).startOf('days');
            const momentEndDate: Moment = moment(endDate).endOf('days');
            filterCondition.createdAt = {
                [Op.gte]: momentStartDate,
                [Op.lte]: momentEndDate
            }
        }
        if(isAsync !== undefined) filterCondition.isAsync = isAsync;
        if(hostName) filterCondition.hostName = {
            [Op.like]: `%${hostName}%`
        };
        if(pathName) filterCondition.pathName = {
            [Op.like]: `%${pathName}%`
        };
        if(eventName) filterCondition.eventName = {
            [Op.like]: `%${eventName}%`
        };
        if(osName) filterCondition.osName = {
            [Op.like]: `%${osName}%`
        };
        if(osVersion) filterCondition.osVersion = {
            [Op.like]: `%${osVersion}%`
        };

        const data: Log[] = await model.findAll({
            where: filterCondition,
            order : [
                ['createdAt', 'ASC']
            ]
        });

        res.status(200).send({
            state: 200,
            message: "성공",
            data: data.length ? convertData(query, data) : []
        });
    } catch (e) {
        const errorObject = {status: 500, ...e};
        if(e.message) errorObject.message = e.message;
        next(errorObject);
    }

};

export default getLogItems;

const requestValidation = (query: GetLogDto): void => {
    const {startDate, endDate, singleDate, startTime, endTime, min, max} = query;
    const errorObj: any = {status: 400};
    if(!startDate && endDate || !endDate && startDate) {
        errorObj.message = 'startDate와 endDate의 값은 둘다 있거나 둘다 없어야 됩니다.';
        throw errorObj;
    }
    if(singleDate) {
        if(!(startTime && endTime)) {
            errorObj.message = 'startTime과 endTime의 값은 둘다 있어야 됩니다.';
            throw errorObj;
        }
    }
    if(!min && max || !max && min) {
        errorObj.message = 'min과 max의 값은 둘다 있거나 둘다 없어야 됩니다.';
        throw errorObj;
    }
};

const makeDateTimeKey = (dateTime, singleDateParams?): string => {
    if(singleDateParams) {
        return `sing-${moment(dateTime).format('HH')}:00`;
    }
    else {
        return `date-${moment(dateTime).format('YYYY-MM-DD')}`;
    }
};

const makeLatencySectionKey = (spendTime, eventSpendTime): string => {
    let portion: number = Math.floor((spendTime || eventSpendTime) / 500);
    switch(portion) {
        case 0:
            return `sect-0-499`;
        case 1:
            return `sect-500-999`;
        case 2:
            return `sect-1000-1499`;
        case 3:
            return `sect-1500-1999`;
        case 4:
            return `sect-2000-2499`;
        case 5:
            return `sect-2500-2999`;
        case 6:
            return `sect-3000-3499`;
        case 7:
            return `sect-3500-3999`;
        case 8:
            return `sect-4000-4499`;
        case 9:
            return `sect-4500-4999`;
        case 10:
            return `sect-5000-5499`;
        case 11:
            return `sect-5500-5999`;
        case 12:
            return `sect-6000-6499`;
        case 13:
            return `sect-6500-6999`;
        case 14:
            return `sect-7000-7499`;
        case 15:
            return `sect-7500-7999`;
        case 16:
            return `sect-8000-8499`;
        case 17:
            return `sect-8500-8999`;
        case 18:
            return `sect-9000-9499`;
        case 19:
            return `sect-9500-9999`;
        case 20:
            return `sect-10000-10499`;
        case 21:
            return `sect-10500-10999`;
    }
};

const isExistKey = (data, key): boolean => {
    return data.hasOwnProperty(key);
};

const makeArrangedRangeDateTimeKey = (startDate, endDate) => {
    const sortedData = {};
    let currentDate = startDate;
    while(true) {
        const key = `date-${moment(currentDate).format('YYYY-MM-DD')}`;
        sortedData[key] = [];
        if(key === `date-${moment(endDate).format('YYYY-MM-DD')}`) break;
        currentDate = moment(currentDate).add(1, 'days');
    }
    return sortedData;
};

const makeArrangedSingleDateTimeKey = (singleDate, startTime, endTime) => {
    const sortedData = {};
    const validStartTime = `${singleDate} ${startTime}`;
    const validEndTime = `${singleDate} ${endTime}`;
    let currentTime: Moment | string = validStartTime;
    while(true) {
        const key = `sing-${moment(currentTime).format('HH')}:00`;
        sortedData[key] = [];
        if(key === `sing-${moment(validEndTime).format('HH')}:00`) break;
        currentTime = moment(currentTime).add(1, 'hours');
    }
    return sortedData;
};

const makeArrangedLatencySectionKey = (min, max) => {
    const sortedData = {};
    const minNum = Number(min);
    const maxNum = Number(max);
    for(let i = minNum; i < maxNum; i += 500) {
        sortedData[`sect-${i}-${i+499}`] = [];
    }
    return sortedData;
};

const sortingDataByKey = (query: GetLogDto, data: Log[], flag: string) => {
    let sortedData = {};
    const {min, max, startDate, endDate, singleDate, startTime, endTime} = query;
    const isExistRangeDate: boolean = !!(startDate && endDate);
    const isExistSingleDate: boolean = !!(singleDate && startTime && endTime);
    const isExistLatencySection: boolean = !!(min && max) && flag === 'latency';

    // range date
    if(isExistRangeDate && !isExistSingleDate) sortedData = makeArrangedRangeDateTimeKey(startDate, endDate);
    // single date
    if(!isExistRangeDate && isExistSingleDate) sortedData = makeArrangedSingleDateTimeKey(singleDate, startTime, endTime);
    // latency section
    if(isExistLatencySection) sortedData = makeArrangedLatencySectionKey(min, max);

    for(const record of data) {
        let key = null;

        if(isExistRangeDate) key = makeDateTimeKey(record.createdAt);
        else if(isExistSingleDate) key = makeDateTimeKey(record.createdAt, isExistSingleDate);

        if(isExistLatencySection) key = makeLatencySectionKey(record.spendTime, record.eventSpendTime);

        if(!isExistKey(sortedData, key)) sortedData[key] = [record];
        else sortedData[key] = [...sortedData[key], record];
    }
    return sortedData;
};

const getConvertedDataByDateTime = (sortedData) => {
    const data = [];
    const dataKey = [];

    for(const key in sortedData) {
        const obj: any = {};
        const convertedRecord = sortedData[key].reduce((acc, record) => {
            if(!record) return acc;
            if(!record.isAsync) {
                if(!dataKey.includes('sync')) dataKey.push('sync');
                if(!obj.hasOwnProperty('syncCount')) {
                    obj.syncSum = record.spendTime;
                    obj.syncCount = 1;
                    acc.sync = Math.round(obj.syncSum / obj.syncCount);
                }
                else {
                    obj.syncSum += record.spendTime;
                    obj.syncCount += 1;
                    acc.sync = Math.round(obj.syncSum / obj.syncCount);
                }
            }
            if(record.isAsync) {
                if(!dataKey.includes(record.eventName)) dataKey.push(record.eventName);
                if(!obj.hasOwnProperty(`${record.eventName}Count`)) {
                    obj[`${record.eventName}Sum`] = record.eventSpendTime;
                    obj[`${record.eventName}Count`] = 1;
                    acc[`${record.eventName}`] = Math.round(obj[`${record.eventName}Sum`] / obj[`${record.eventName}Count`]);
                }
                else {
                    obj[`${record.eventName}Sum`] += record.eventSpendTime;
                    obj[`${record.eventName}Count`] += 1;
                    acc[`${record.eventName}`] = Math.round(obj[`${record.eventName}Sum`] / obj[`${record.eventName}Count`]);
                }
            }
            return acc;
        }, {});
        convertedRecord.name = key.slice(5);
        data.push(convertedRecord);
    }

    return {dataKey, data};
};

const getConvertedDataByLatency = (sortedData) => {
    const data = [];

    for(const key in sortedData) {
        const convertedRecord = sortedData[key].reduce((acc, record) => {
            if(!acc.total) acc.total = 1;
            else acc.total += 1;

            if(!record.isAsync) {
                if(!acc.hasOwnProperty('sync')) acc.sync = 1;
                else acc.sync += 1;
            }

            if(record.isAsync) {
                if(!acc.hasOwnProperty(`${record.eventName}`)) acc[`${record.eventName}`] = 1;
                else acc[`${record.eventName}`] += 1;
            }
            return acc;
        }, {});
        convertedRecord.name = key.slice(5);
        data.push(convertedRecord);
    }

    return data;
};

const compareDateTimeKey = (prev, next, query: GetLogDto) => {
    const {singleDate} = query;
    if(singleDate) {
        const convertedPrev = moment(`${singleDate} ${prev.name}`).valueOf();
        const convertedNext = moment(`${singleDate} ${next.name}`).valueOf();

        return convertedPrev - convertedNext;
    }
};

const compareSectionKey = (prev, next): number => {
    const prevSum = prev.name.split('-').reduce((acc, item) => acc += Number(item), 0);
    const nextSum = next.name.split('-').reduce((acc, item) => acc += Number(item), 0);

return prevSum - nextSum;
};

const getSortedDataByOsInfo = (data: Log[]) => {
    const sortedData: any[] = [];
    const sortedObject = {};
    const osNameList: string[] = [];

    for(const record of data) {
        let parentIndex: number;
        const combinedWord: string = `${record.osName ?? ''} ${record.osVersion ?? ''} ${record.osArchitecture ?? ''}bit`;

        if(!osNameList.includes(record.osName)) osNameList.push(record.osName);
        parentIndex = osNameList.findIndex(osName => osName === record.osName);

        if(sortedObject.hasOwnProperty(combinedWord)) sortedObject[combinedWord]['value'] += 1 ;
        else sortedObject[combinedWord] = { name: combinedWord, value: 1, parent: record.osName, parentIndex};
    }

    for(const key in sortedObject) {
        const {name, value, parent, parentIndex} = sortedObject[key];
        const convertedData = { name, value, parent, parentIndex};
        sortedData.push(convertedData);
    }

    return sortedData.sort();
};

const convertData = (query: GetLogDto, data: Log[]) => {
    const returnData: any = {};
    const {min, max} = query;
    const isExistLatencySection: boolean = !!(min && max);
    const sortedDataByDateTime = sortingDataByKey(query, data, 'dateTime');
    const convertedDataByDateTime = getConvertedDataByDateTime(sortedDataByDateTime);

    returnData.dataKey = convertedDataByDateTime.dataKey;
    returnData.dateTimeData = convertedDataByDateTime.data.sort((a, b) => compareDateTimeKey(a, b, query));
    returnData.osData = getSortedDataByOsInfo(data);

    if(isExistLatencySection) {
        const sortedDataByLatency = sortingDataByKey(query, data, 'latency');
        const convertedDataByLatency = getConvertedDataByLatency(sortedDataByLatency);
        returnData.latencyData = convertedDataByLatency.sort(compareSectionKey);
    }

    return returnData;
};