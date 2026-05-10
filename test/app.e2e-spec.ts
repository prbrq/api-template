import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth flow (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
        AppModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('logs in and returns current user without passwordHash', async () => {
    const loginResponse = await request(app.getHttpServer())
      .post('/api/v1/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'admin',
      })
      .expect(201);

    expect(loginResponse.body).toHaveProperty('accessToken');
    expect(typeof loginResponse.body.accessToken).toBe('string');

    const meResponse = await request(app.getHttpServer())
      .get('/api/v1/auth/me')
      .set('Authorization', `Bearer ${loginResponse.body.accessToken}`)
      .expect(200);

    expect(meResponse.body).toMatchObject({
      email: 'admin@example.com',
      role: 'ADMIN',
    });
    expect(meResponse.body).toHaveProperty('id');
    expect(meResponse.body).not.toHaveProperty('passwordHash');
  });

  it('returns unauthorized for /auth/me without token', async () => {
    await request(app.getHttpServer()).get('/api/v1/auth/me').expect(401);
  });
});
