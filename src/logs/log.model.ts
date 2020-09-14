import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table
export class Log extends Model<Log> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true,
    })
    public id: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    networkTime: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    pageLoadTime: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    spendTime: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    eventSpendTime: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    eventName: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    isAsync: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    hostName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    pathName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    osName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    osVersion: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    osArchitecture: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    networkType: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    location: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: DataType.NOW
    })
    createdAt: Date;
}