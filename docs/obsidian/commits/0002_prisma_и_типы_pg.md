---
title: Шаг 0002 — Prisma runtime/dev зависимости и правка README
date: 2026-03-05
commit: 44f41a4106232d15fee5c91f2ed58c4edaf7a772
tags: [commit, prisma, pg, dependencies, bun]
---

# Шаг 0002: Подготовка зависимостей для Prisma + PostgreSQL

## Команды терминала

```bash
bun add @prisma/client @prisma/adapter-pg dotenv pg
bun add prisma tsx @types/pg --save-dev
```

## Что сделано

- Добавлены runtime-зависимости для работы Prisma c PostgreSQL:
  - `@prisma/client`
  - `@prisma/adapter-pg`
  - `dotenv`
  - `pg`
- Добавлены/обновлены dev-инструменты и типы:
  - `prisma`
  - `tsx`
  - `@types/pg`
- Обновлены `package.json` и `bun.lock`.
- Исправлен `README.md`: команды переведены с `npm` на `bun`.

## Что изменилось в зависимостях

- `@prisma/client`: `^7.4.2`
- `@prisma/adapter-pg`: `^7.4.2`
- `dotenv`: `^17.3.1`
- `pg`: `^8.20.0`
- `prisma`: `^7.4.2`
- `@types/pg`: `^8.18.0`
- `tsx`: обновлен до `^4.21.0`

## Важное наблюдение по результату команды

- Несмотря на флаг `--save-dev`, пакеты `prisma` и `@types/pg` попали в секцию `dependencies`, а не `devDependencies`.
- Для учебного проекта это не блокер, но в production-проектах лучше держать toolchain и типы в `devDependencies`.

## Плюсы шага

- Подготовлена база для следующего этапа `prisma init`.
- Lock-файл обновлен и синхронизирован с `package.json`.
- `README` теперь соответствует реальному package manager (`bun`), меньше риска путаницы.

## Минусы и риски

- Смешение runtime/dev зависимостей ухудшает читаемость и может раздуть прод-окружение.
- В одном коммите объединены несколько команд, что усложняет точечный разбор причин изменений.

## Что улучшить на следующем шаге

- Выполнить `prisma init` и отдельно разобрать `schema.prisma` и `.env`.
- При желании отрефакторить секции `dependencies` / `devDependencies`.

## Комментарий к объяснению из видео

Ютуб-уроки часто не акцентируют различие между runtime и dev-зависимостями.
Для долгоживущих проектов это важная инженерная дисциплина: влияет на CI, размер образов и поддержку.
