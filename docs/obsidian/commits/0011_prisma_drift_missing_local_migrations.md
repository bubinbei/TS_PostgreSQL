---
title: Шаг 0011 - Prisma drift: миграции в БД есть, локально нет
date: 2026-03-06
commit: 8a1a510
tags: [commit, prisma, migration, drift, troubleshooting]
---

# Шаг 0011: Почему `bun prisma migrate dev` не проходил

## Команды терминала

```bash
bun prisma migrate dev --name add_channel_table
bun prisma migrate reset --force
bun prisma migrate dev --name add_channel_table
```

## Конспект шага

При запуске:

```bash
bun prisma migrate dev --name add_channel_table
```

Prisma вернул `Drift detected`.

Суть проблемы:
- в базе уже была применена миграция `20260306055920_init_user`,
- а локальная папка `prisma/migrations` отсутствовала,
- история миграций на диске и в БД разъехалась.

Поэтому Prisma отказался создавать новую миграцию, пока состояние не будет синхронизировано.

Решение для dev-среды:
- выполнить сброс схемы `bun prisma migrate reset --force`,
- затем повторить `bun prisma migrate dev --name add_channel_table`.

После этого миграции снова строятся в правильной последовательности.

## Что важно запомнить

- `migrate dev` требует согласованную историю: и БД, и `prisma/migrations`.
- Если локальные миграции удалены, но в БД они применены, получишь `drift`.
- В учебной/локальной среде это нормально лечится через `migrate reset`.
- В проде так делать нельзя: там нужны аккуратные миграции без сброса данных.

## Что делать дальше

- После каждого изменения схемы запускать:
  `bun prisma migrate dev --name <имя_изменения>`.
- Не удалять `prisma/migrations` между шагами курса.
- При ошибках сначала проверять `prisma migrate status`.

