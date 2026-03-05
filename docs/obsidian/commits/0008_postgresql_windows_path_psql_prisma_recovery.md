---
title: Шаг 0008 - Recovery после перезагрузки Windows (PATH + psql + Prisma)
date: 2026-03-05
commit: (еще не создан)
tags: [commit, windows, postgresql, psql, prisma, troubleshooting]
---

# Шаг 0008: Восстановление рабочего окружения PostgreSQL и Prisma в Windows

## Команды терминала

```bash
# Проверка psql в PowerShell
psql --version

# Проверка psql в Git Bash (если "command not found")
export PATH="$PATH:/c/Program\ Files/PostgreSQL/18/bin"
psql --version

# Закрепить PATH в Git Bash навсегда
echo 'export PATH="$PATH:/c/Program\ Files/PostgreSQL/18/bin"' >> ~/.bashrc
source ~/.bashrc

# Создать учебную БД
psql -U postgres -h localhost -c "CREATE DATABASE ts_postgresql;"

# Вход в PostgreSQL под системной ролью
psql -U postgres -h localhost -d postgres

# Первая миграция Prisma
npx prisma migrate dev --name init
```

## Конспект шага

После перезагрузки Windows контекст работы потерялся, а доступность `psql` оказалась разной в разных терминалах.

- В `PowerShell` команда `psql --version` работала.
- В `Git Bash` команда `psql` не находилась, потому что путь к `psql.exe` не был в bash PATH.
- PostgreSQL был установлен в `C:\Program Files\PostgreSQL\18\bin`, но этот путь нужно отдельно добавить в `~/.bashrc`.

Далее была диагностика Prisma:

- Ошибка `P1001 Can't reach database server at localhost:51214` возникала из-за старого `DATABASE_URL` формата `prisma+postgres://...` в `.env`.
- После замены на обычный URL `postgresql://postgres:...@localhost:5432/ts_postgresql?schema=public` подключение восстановилось.

Также была ошибка авторизации в `psql postgres`:

- Команда без `-U` пытается логиниться под именем пользователя ОС (`bqpd`).
- Для входа как админ роли PostgreSQL нужен явный параметр: `psql -U postgres -h localhost -d postgres`.

## Что важно запомнить

- `psql -v` не показывает версию: флаг `-v` требует аргумент. Используй `psql -V` или `psql --version`.
- `PowerShell` и `Git Bash` могут иметь разные PATH; если в одном терминале работает, в другом может не работать.
- Для Prisma ключевой источник подключения - это `DATABASE_URL` в `.env`.
- Ошибка `P1001` часто означает неверный URL/порт, а не "сломанный Prisma".
- Для PostgreSQL в локальной учебной среде лучше сразу использовать стандартный `postgresql://...` URL.

## Что делать дальше

- Добавить первую модель в `prisma/schema.prisma` (например, `User`).
- Выполнить `npx prisma migrate dev --name init` после добавления модели.
- Зафиксировать изменения отдельным коммитом и добавить следующий разбор в `docs/obsidian/commits`.

