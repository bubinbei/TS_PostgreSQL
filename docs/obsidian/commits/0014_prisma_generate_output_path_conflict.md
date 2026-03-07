---
title: Шаг 0014 - Ошибка prisma generate из-за конфликтной output-папки
date: 2026-03-06
commit: (без нового коммита кода)
tags: [commit, prisma, generate, output, troubleshooting]
---

# Шаг 0014: `prisma generate` упал после успешной миграции

## Команды терминала

```bash
bun prisma migrate dev --name add_video_table && bun prisma generate
```

## Конспект шага

`migrate dev` прошел успешно и применил миграцию `add_video_table`, но `generate` упал с ошибкой:

`prisma/schema/src/generated/prisma exists and is not empty but doesn't look like a generated Prisma Client`.

Смысл ошибки:
- Prisma пытался генерировать клиент в `prisma/schema/src/generated/prisma`.
- В этой папке уже были файлы, которые Prisma не распознал как валидный сгенерированный клиент.
- Чаще всего это следствие неправильного `output` пути в `generator client` при multi-file schema.

## Причина

При `schema: "prisma/schema"` относительный `output` считается от `prisma/schema/schema.prisma`.
Если указать `./src/generated/prisma`, генерация пойдет внутрь `prisma/schema/src/...`, а не в корневой `src`.

## Рабочее решение

- В `prisma/schema/schema.prisma` для multi-file схемы использовать путь:
  `output = "../../src/generated/prisma"` (если нужен клиент в корневом `src`).
- Удалить конфликтный старый каталог генерации:
  `prisma/schema/src/generated/prisma`
- Повторить:
  `bun prisma generate`

## Что важно запомнить

- Успешная миграция не гарантирует успешную генерацию клиента.
- `output` в Prisma всегда относительный к файлу, где объявлен `generator`.
- Директорию `src/generated` лучше не смешивать с папкой схемы `prisma/schema`.

