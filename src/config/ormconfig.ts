import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();
// Determine the base directory for compiled files.
// In a typical NestJS setup, compiled files are in the 'dist' folder at the project root.
const isTsNode = process.argv.some(arg => arg.includes('ts-node'));
const srcPath = path.join(process.cwd(), 'src');
const distPath = path.join(process.cwd(), 'dist');
export const datasource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true, // It is recommended to enable logging for better debugging.
  // Paths should point to the compiled JavaScript files (.js)
  // relative to the 'dist' directory.
  // Assuming 'src/migrations' compiles to 'dist/src/migrations'
  migrations: [
    isTsNode
      ? path.join(srcPath, 'migrations', '*.{ts,js}') // dev: ts
      : path.join(distPath, 'src', 'migrations', '*.js') // prod: js
  ],

  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  migrationsTableName: 'migrations',
  ssl: process.env.NODE_ENV === 'production',
});