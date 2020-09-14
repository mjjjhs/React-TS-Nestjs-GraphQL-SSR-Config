import {SequelizeModuleOptions} from "@nestjs/sequelize";
import {Log} from "./logs/log.model";
require('dotenv').config()

const dbConfig = (env: string): SequelizeModuleOptions => {
    switch(env) {
        case 'development':
            return {};
        case 'production':
            return {};
        // default -> dev db
        default:
            return {
                dialect: 'mysql',
                host: 'yap-mysql-writer.dev.yanolja.in',
                port: 3306,
                username: 'yap_user',
                password: 'dpfzbxl123!@#',
                database: 'latency_log',
                models: [Log],
                timezone: '+09:00',
                define: {
                    timestamps: false
                },
            };
    }
};

export default dbConfig;