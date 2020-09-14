import {Log} from "../log.model";
import {NextFunction, Request, Response} from "express";

interface IGetSpendTimesData {
    spendTime: number;
    eventSpendTime: number;
}

interface IBiggestTime {
    maxLatencyTime: number;
}

const findBiggestOne = (data: IGetSpendTimesData[]): IBiggestTime => {
    const convertedData: number[] = data.reduce((acc: number[], {spendTime, eventSpendTime}: IGetSpendTimesData): number[] => {
        if(spendTime) acc.push(spendTime)
        if(eventSpendTime) acc.push(eventSpendTime)
        return acc;
    }, [])

    const time: number = convertedData.sort((a, b) => b - a)[0];
    const restOfTime: number = time % 500;
    const maxLatencyTime: number = time + (500 - restOfTime);

    return { maxLatencyTime };
}

export const getSpendTimes = async (
    req: Request,
    res: Response,
    next: NextFunction,
    model: typeof Log,
): Promise<void> => {
    const data = await model.findAll({
        attributes: ['spendTime', 'eventSpendTime'],
        order : [
            ['spendTime', 'DESC'],
            ['eventSpendTime', 'DESC']
        ]
    });

    res.status(200).send({
        state: 200,
        message: "성공",
        data: findBiggestOne(data)
    });
};