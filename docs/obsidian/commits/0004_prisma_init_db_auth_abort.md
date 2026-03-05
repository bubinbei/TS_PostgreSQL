---
title: Шаг 0004 — prisma init --db: отказ от авторизации
date: 2026-03-05
commit: (ещё нет)
tags: [commit, prisma, init, db, auth]
---

# Шаг 0004: `prisma init --db` остановился из-за отсутствия авторизации

## Команды терминала

```bash
npx prisma init --db --output ./src/generated/prisma
```

```bash
# рекомендуемый вариант для локального PostgreSQL без Prisma Console
npx prisma init --datasource-provider postgresql --output ./src/generated/prisma
```

## Что произошло

- CLI сообщил, что `--db` требует аутентификацию в `console.prisma.io`.
- На вопрос `Would you like to authenticate?` выбран ответ `No`.
- Проект creation aborted, поэтому папка `./src/generated/prisma` не была создана.

## Это нормально?

- Да, полностью нормально.
- При прерывании auth-потока с `--db` генерация файлов не выполняется.

## Плюсы/минусы подхода `--db`

- Плюс: быстрый старт с Prisma Postgres (managed).
- Минус: обязательная авторизация и зависимость от Prisma Data Platform.

## Что делать дальше

- Если ты хочешь локальный PostgreSQL и учебный автономный сценарий:
  - используй `--datasource-provider postgresql` без `--db`.

