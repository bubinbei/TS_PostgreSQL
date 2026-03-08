---
title: Шаг 0016 - Ошибка db not found из-за незагруженного .env в runtime
date: 2026-03-07
commit: (без отдельного коммита кода)
tags: [commit, prisma, dotenv, runtime, troubleshooting]
---

# Шаг 0016: `db not found` при запуске сервера

## Команды терминала

```bash
bun run dev
bunx prisma db pull --schema prisma/schema/schema.prisma
bunx prisma db execute --stdin
bun run build
```

## Конспект шага

- При запуске приложения появлялась ошибка, похожая на "db not found".
- Проверка через Prisma CLI показала, что база `ts_postgresql` реально существует и доступна.
- Причина оказалась не в PostgreSQL, а в runtime: переменная `DATABASE_URL` из `.env` не загружалась в серверный процесс.
- Решение: добавить `import 'dotenv/config'` в `src/index.ts` до создания Prisma-клиента.

## Что важно запомнить

- Успешный `prisma db pull` означает, что база доступна по текущему `DATABASE_URL`.
- Ошибка подключения в runtime часто связана с тем, что `.env` не подхватился приложением.
- Prisma CLI и runtime-приложение могут вести себя по-разному в вопросе загрузки env.
- Для Node/Bun-сервера надежно явно подключать `dotenv/config` в entrypoint.

## Что делать дальше

- Добавить тестовый endpoint с `c.get('prisma')` и простым `findMany()`.
- Проверить обработку ошибок подключения к БД на старте приложения.

