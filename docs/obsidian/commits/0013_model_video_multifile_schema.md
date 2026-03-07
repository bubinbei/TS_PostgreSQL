---
title: Шаг 0013 - Model Video в отдельном файле схемы
date: 2026-03-06
commit: 0881b43
tags: [commit, prisma, schema, multifile, video]
---

# Шаг 0013: Вынесение `Video` в отдельный `.prisma` файл

## Команды терминала

```bash
npx prisma validate
```

## Конспект шага

На этом шаге модель `Video` вынесена в отдельный файл:

- `prisma/schema/video.prisma`

Это соответствует multi-file подходу Prisma при конфиге:

- `schema: "prisma/schema"` в `prisma.config.ts`.

Отдельные пути между моделями вручную прописывать не нужно: Prisma читает все `*.prisma` в директории схемы и собирает их в одну общую схему.

Проверка `npx prisma validate` прошла успешно:

- `The schemas at prisma\schema are valid`

## Что важно запомнить

- `generator` и `datasource` держим в одном месте (обычно `schema.prisma`).
- Доменные модели удобно разносить по файлам (`user.prisma`, `channel.prisma`, `video.prisma`).
- Успешная `prisma validate` = Prisma правильно увидел все модели и связи.

## Что делать дальше

- После изменения модели `Video` создать миграцию:
  `bun prisma migrate dev --name add_video_table`
- Проверить SQL миграции и только потом коммитить.

