---
title: Шаг 0006 — qsql: command not found
date: 2026-03-05
commit: (ещё нет)
tags: [commit, postgresql, psql, troubleshooting]
---

# Шаг 0006: Почему не сработала команда `qsql postgres`

## Команды терминала

```bash
qsql postgres
```

```bash
# проверка после установки клиента
psql --version
```

```bash
# вход в PostgreSQL под системным пользователем postgres
psql -U postgres
```

```sql
CREATE DATABASE ts_postgresql;
\l
\q
```

## Конспект шага

На этом этапе команда из видео не запустилась: `bash: qsql: command not found`.
Это ожидаемо для текущей среды: в системе нет бинарника `qsql`, и даже `psql` пока не установлен в PATH.

Здесь почти наверняка в видео имелась в виду команда `psql postgres` (или просто `psql`), а не `qsql`.
`psql` — это стандартный CLI-клиент PostgreSQL.

## Что нужно доустановить

Для Windows поставь PostgreSQL (сервер + клиент `psql`) через официальный инсталлятор или через `winget`.

```powershell
winget install -e --id PostgreSQL.PostgreSQL
```

После установки:
- перезапусти терминал,
- проверь `psql --version`,
- зайди в консоль `psql -U postgres` и создай БД.

Если пароль для `postgres` не помнишь, это пароль, который задавался в установщике PostgreSQL.

## Что важно запомнить

- `qsql` в стандартной установке PostgreSQL не существует; нужен `psql`.
- Если команда "не найдена", сначала проверяем установку и PATH, а не Prisma-код.
- Для курса можно работать как через локальный PostgreSQL + `psql`, так и через `npx prisma dev` (локальный Prisma Postgres).

## Что делать дальше

```bash
psql --version
psql -U postgres -c "CREATE DATABASE ts_postgresql;"
```

Потом обнови `DATABASE_URL` в `.env` под созданную БД, и можно переходить к первой миграции.

