import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';
import path, { join } from 'path';

dotenv.config();

export function getConfig(): DataSourceOptions {
    console.log("path.resolve(process.cwd()", join(process.cwd(), 'src/migrations'))
    return {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: process.env.DB_SYNCHRONIZATION === 'true',

        migrations: [path.join(process.cwd(), 'src/migrations', '*.{ts,js}')],

        entities: [
            path.join(process.cwd(), 'src/**/*.entity.{ts,js}')
        ],


        migrationsTableName: 'migrations',

        ssl: process.env.NODE_ENV === 'production',
    };
}
