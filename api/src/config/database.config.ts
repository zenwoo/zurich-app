import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const getTypeOrmConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT') ?? 5432,
  username: configService.get<string>('DATABASE_USERNAME') ?? 'postgres',
  password: configService.get<string>('DATABASE_PASSWORD'),
  database:
    configService.get<string>('DATABASE_NAME') ?? 'MOTOR_INSURANCE_WEBSITE',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  autoLoadEntities: true,
  synchronize: process.env.NODE_ENV === 'production' ? false : true
});
