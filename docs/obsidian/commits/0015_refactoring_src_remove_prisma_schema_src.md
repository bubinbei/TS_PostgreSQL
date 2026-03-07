---
title: Шаг 0015 - Рефакторинг структуры src и удаление prisma/schema/src
date: 2026-03-07
commit: 418db24
tags: [commit, refactor, prisma, typescript, structure]
---

# Шаг 0015: Рефакторинг структуры `src`

## Команды терминала

```bash
bun run build
git status --short
git log --oneline -n 5
git show --name-status --oneline -n 1
```

## Конспект шага

- Удален дублирующий runtime-код из `prisma/schema/src`.
- Prisma middleware перенесен в корневой `src/lib/prisma.ts`.
- `src/index.ts` обновлен: подключен `withPrisma` и типизация `AppBindings`.
- Устранена причина падения `tsc`: лишняя папка `prisma/schema/src` больше не участвует в сборке.

## Что важно запомнить

- В `prisma/schema` должны жить только файлы схемы `.prisma`.
- Весь исполняемый TypeScript-код сервера лучше держать в одном корневом `src`.
- При `module: NodeNext` относительные ESM-импорты должны иметь расширение `.js`.
- Если в проекте остаются старые дубли папок, TypeScript может собирать «мертвый» код и падать.

## Что делать дальше

- Прогнать `bun run dev` и проверить, что сервер поднимается с `DATABASE_URL`.
- Добавить первый маршрут с реальным запросом к БД через `c.get('prisma')`.

