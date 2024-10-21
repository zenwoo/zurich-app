import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT) ?? 5432,
  username: process.env.DATABASE_USERNAME ?? 'postgres',
  password: String(process.env.DATABASE_PASSWORD),
  database: process.env.DATABASE_NAME ?? 'MOTOR_INSURANCE_WEBSITE',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/**/migrations/*{.ts,.js}'],
  synchronize: false
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
