import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'test', 'production')
          .default('development'),
        PORT: Joi.number().port().default(5000),
        DATABASE_URL: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().default('15m'),
      }),
    }),
    HealthModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
