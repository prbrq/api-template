# API Template

Минимальный шаблон backend API на NestJS.

Проект предназначен не как готовый продукт, а как стартовая точка для будущих backend-систем. Его можно копировать, форкать или использовать как базу для нового сервиса, где уже нужны PostgreSQL, Prisma, JWT-аутентификация, Swagger и простая модульная архитектура.

## Что Входит В Шаблон

- NestJS;
- модульный монолит;
- практичная Clean Architecture внутри бизнес-модулей;
- PostgreSQL;
- Prisma 7;
- JWT access token authentication;
- seed-пользователь для локальной разработки;
- Swagger UI на `/docs`;
- API prefix `/api/v1`;
- простой health endpoint;
- минимальные e2e-тесты auth flow;
- Docker Compose только для PostgreSQL.

## Что Не Входит В v1

Шаблон намеренно оставлен минимальным. В нём нет:

- refresh token;
- logout;
- регистрации пользователей;
- sessions;
- token rotation;
- RolesGuard;
- permissions;
- audit log;
- Redis;
- очередей;
- работы с файлами;
- events;
- микросервисов;
- сложного healthcheck;
- единого response wrapper;
- мультитенантности.

Эти возможности стоит добавлять только тогда, когда они действительно нужны конкретному проекту.

## Endpoint'ы

```text
GET  /api/v1/health
POST /api/v1/auth/login
GET  /api/v1/auth/me
```

Swagger доступен по адресу:

```text
http://localhost:5000/docs
```

## Требования

- Node.js 22.x или новее;
- pnpm;
- Docker и Docker Compose.

## Быстрый Старт

Установить зависимости:

```bash
pnpm install
```

Создать локальный `.env`:

```bash
cp .env.example .env
```

Запустить PostgreSQL:

```bash
docker compose up -d
```

Сгенерировать Prisma Client:

```bash
pnpm prisma generate
```

Применить миграции:

```bash
pnpm prisma migrate dev
```

Создать seed-пользователя:

```bash
pnpm prisma db seed
```

Запустить приложение:

```bash
pnpm start:dev
```

## Seed-Пользователь

Seed создаёт или обновляет локального администратора:

```text
email: admin@example.com
password: admin
role: ADMIN
```

Пароль хранится в базе только в виде bcrypt hash.

## Проверка API

Login:

```bash
curl -X POST http://localhost:5000/api/v1/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@example.com","password":"admin"}'
```

Ответ содержит `accessToken`.

Получить текущего пользователя:

```bash
curl http://localhost:5000/api/v1/auth/me \
  -H "Authorization: Bearer <accessToken>"
```

Healthcheck:

```bash
curl http://localhost:5000/api/v1/health
```

## Swagger

Swagger UI доступен на:

```text
http://localhost:5000/docs
```

Через Swagger можно:

- выполнить login;
- получить access token;
- вставить token через кнопку `Authorize`;
- вызвать защищённый endpoint `/auth/me`.

## Тесты

Запустить e2e-тесты:

```bash
pnpm test:e2e
```

Тесты проверяют:

- login возвращает access token;
- `/auth/me` с JWT возвращает текущего пользователя;
- `/auth/me` без JWT возвращает `401 Unauthorized`;
- `passwordHash` не отдаётся наружу.

Примечание: e2e-тесты используют `NODE_OPTIONS=--experimental-vm-modules`, потому что Jest требует этот флаг для dynamic import внутри Prisma 7 generated client.

## Сборка

Проверить сборку:

```bash
pnpm build
```

Запустить production build:

```bash
pnpm start:prod
```

## Как Использовать Как Шаблон

Рекомендуемый сценарий:

1. Скопировать или форкнуть репозиторий.
2. Переименовать проект в `package.json`.
3. При необходимости изменить имя базы и контейнера в `docker-compose.yml`.
4. Обновить `.env.example`.
5. Оставить `health`, `auth`, `users` и `prisma` как базовую инфраструктуру.
6. Добавлять новые бизнес-модули в `src/<module-name>`.

Рекомендуемая структура нового бизнес-модуля:

```text
src/example/
  domain/
  application/
  infrastructure/
  presentation/
  example.module.ts
```

Правила архитектуры в этом шаблоне:

- `domain` не зависит от NestJS, Prisma и HTTP;
- `application` содержит use cases, ports и interfaces;
- `infrastructure` содержит Prisma repositories и технические реализации;
- `presentation` содержит controllers, decorators и HTTP DTO;
- controllers не содержат бизнес-логику;
- Prisma используется только в infrastructure-слое;
- `AuthModule` не обращается к Prisma напрямую, а работает с пользователями через `UsersModule`.

## Переменные Окружения

Минимальный `.env`:

```env
NODE_ENV=development
PORT=5000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/api_template?schema=public
JWT_SECRET=change-me
JWT_EXPIRES_IN=15m
```

Для реальных проектов нужно заменить `JWT_SECRET` на длинную случайную строку.

## Prisma

Проект использует Prisma 7 и сгенерированный клиент в папке:

```text
generated/prisma
```

Эта папка не хранится в git. После установки зависимостей нужно выполнить:

```bash
pnpm prisma generate
```

В `schema.prisma` используется CommonJS-формат клиента:

```prisma
generator client {
  provider     = "prisma-client"
  output       = "../generated/prisma"
  moduleFormat = "cjs"
}
```

## Полезные Команды

```bash
pnpm build
pnpm start:dev
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma db seed
pnpm test:e2e
pnpm lint
```
