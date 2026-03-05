---
title: Шаг 0005 — prisma init успешно (без --db)
date: 2026-03-05
commit: 497910000ab60ace95e806ad04b46f2f47967b51
tags: [commit, prisma, init, schema, env]
---

# Шаг 0005: Успешный `prisma init` без авторизации Prisma Console

## Команды терминала

```bash
npx prisma init --output ./src/generated/prisma
```

## Что произошло

- Инициализация прошла успешно.
- Созданы:
  - `prisma/schema.prisma`
  - `prisma.config.ts`
  - `.env`
- Prisma вывел предупреждение про `.env` в `.gitignore`.

## Почему не появилась папка `./src/generated/prisma`

- Это нормально.
- В `prisma init` флаг `--output` задает output для генератора клиента в конфиге/схеме, но сам `init` создает базовую структуру в `prisma/`.
- Клиент в `src/generated/prisma` появится после корректной настройки `generator` и запуска `prisma generate` (или `migrate dev`, который тоже триггерит генерацию).

## Плюсы шага

- Prisma успешно подключен к проекту на уровне структуры файлов.
- Есть `prisma.config.ts` с загрузкой env через `dotenv/config`.
- Есть стартовый `schema.prisma` для дальнейшего моделирования.

## Минусы и риски

- По умолчанию в `.env` может быть `prisma+postgres://...` URL, который не совпадает с локальным Docker/своим PostgreSQL.
- Если не проверить `DATABASE_URL` перед миграциями, можно получить неожиданные ошибки подключения.

## Что делать дальше

```bash
# проверить/обновить DATABASE_URL под твой PostgreSQL
# затем описать первую модель в prisma/schema.prisma
npx prisma migrate dev --name init
```

## Комментарий к объяснению из видео

В роликах часто складывается впечатление, что `--output` сразу создает папку клиента.
На практике после `init` это не так: сначала структура Prisma (`prisma/`), потом генерация клиента отдельной командой.

