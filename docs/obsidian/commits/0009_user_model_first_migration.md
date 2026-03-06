---
title: Шаг 0009 - Первая миграция User + исправление drift
date: 2026-03-06
commit: (еще не создан)
tags: [commit, prisma, migration, postgresql, drift]
---

# Шаг 0009: Первая миграция после добавления модели User

## Команды терминала

```bash
npx prisma migrate dev --name init_user
npx prisma migrate reset --force
npx prisma migrate dev --name init_user
npx prisma generate
npx prisma migrate status
```

## Конспект шага

После добавления `User` в `prisma/schema/user.prisma` первая попытка `migrate dev` упала с drift:
в БД уже была таблица `users`, но в `prisma/migrations` не было истории миграций.

Причина: ранее схема уже попадала в базу без миграционной истории (типичный сценарий после `db push`).

Чтобы вернуть правильный учебный flow через миграции:

- выполнили `npx prisma migrate reset --force` (сброс dev-схемы),
- повторно запустили `npx prisma migrate dev --name init_user`,
- получили первую миграцию `prisma/migrations/20260306055920_init_user/migration.sql`.

Дополнительно исправили путь генерации Prisma Client:

- при схеме-папке (`schema: "prisma/schema"`) путь `./src/generated/prisma` считался от `prisma/schema`,
- клиент ошибочно генерировался в `prisma/schema/src/generated/prisma`,
- исправили путь на `../../src/generated/prisma`, затем повторили `npx prisma generate`.

Итог: миграции и БД синхронизированы, клиент генерируется в `src/generated/prisma`.

## Что важно запомнить

- Для проекта и курса основной путь: `prisma migrate dev`, а не `prisma db push`.
- Drift = база и история миграций разъехались; в dev это лечится `migrate reset`.
- При multi-file schema относительные пути в `generator output` считаются от файла `schema.prisma`.
- После изменений схемы желательно проверять `npx prisma migrate status`.

## Что делать дальше

- Подключить Prisma Client в `src/index.ts`.
- Сделать первый CRUD-эндпоинт (например, регистрация пользователя).
- Зафиксировать изменения отдельным git-коммитом.

