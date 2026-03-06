---
title: Шаг 0010 - Построчный разбор Prisma schema (User + Channel)
date: 2026-03-06
commit: (еще не создан)
tags: [commit, prisma, schema, relations, learning]
---

# Шаг 0010: Разбор каждой строки в `prisma/schema/user.prisma`

## Команды терминала

```bash
# посмотреть файл с номерами строк
cat -n prisma/schema/user.prisma
```

## Конспект шага

Ниже разбор текущей версии схемы, строка за строкой.

### model User

- `1: model User {`  
  Объявление модели Prisma. В БД это будет таблица `users` (из-за `@@map` ниже).

- `2: id String @id @default(uuid())`  
  Первичный ключ типа `String`. `@id` = PK, `@default(uuid())` = автогенерация UUID.

- `4: mail String @unique`  
  Обязательная строка + уникальный индекс (два пользователя с одинаковым mail невозможны).

- `5: password String`  
  Обязательное поле для хеша пароля.

- `7: username String @unique`  
  Обязательная строка + уникальный индекс для логина/никнейма.

- `8: avatar String?`  
  `?` делает поле nullable (аватар может отсутствовать).

- `10: createdAt DateTime @default(now()) @map("created_at")`  
  Метка создания. По умолчанию текущее время. В SQL-таблице имя колонки `created_at`.

- `11: updatedAt DateTime @updatedAt @map("updated_at")`  
  Prisma автоматически обновляет это поле при каждом update. В SQL-таблице `updated_at`.

- `13: channels Channel[]`  
  Обратная сторона связи `1 -> N`: один `User` владеет многими `Channel`.
  Это поле убрало ошибку relation на стороне `Channel.owner`.

- `15: @@map("users")`  
  Имя SQL-таблицы принудительно задается как `users`.

- `16: }`  
  Конец модели `User`.

### model Channel

- `18: model Channel {`  
  Вторая модель Prisma.

- `19: id String @id @default(cuid())`  
  PK-строка с генерацией `cuid()` (альтернатива UUID).

- `21: name String @unique`  
  Название канала обязательно и уникально.

- `22: description String?`  
  Описание опционально.

- `23: avatar String?`  
  Опциональный URL/путь аватара канала.

- `24: banner String?`  
  Опциональный URL/путь баннера канала.

- `26: ownerId String @map("owner_id")`  
  FK-колонка в таблице `channels`, физическое имя `owner_id`.

- `27: owner User @relation(fields: [ownerId], references: [id])`  
  Связь с `User`:
  `fields: [ownerId]` = локальное FK-поле,
  `references: [id]` = ссылка на `User.id`.

- `29: createdAt DateTime @default(now()) @map("created_at")`  
  Время создания канала.

- `30: updatedAt DateTime @updatedAt @map("updated_at")`  
  Время последнего обновления канала.

- `32: @@map("channels")`  
  Имя SQL-таблицы `channels`.

- `33: }`  
  Конец модели `Channel`.

## Что важно запомнить

- Для связи `1 -> N` нужны обе стороны:  
  на стороне `N` - поле FK + `@relation`,  
  на стороне `1` - массив связанных сущностей (`Channel[]`).
- `@map` меняет имя колонки/таблицы в БД, но не имя поля в Prisma-коде.
- `@unique` создает уникальные индексы.
- `@updatedAt` обновляется Prisma автоматически.

## Что делать дальше

- После каждого изменения схемы сначала запускать проверку:
  `npx prisma validate`
- Затем выбирать режим:
  `npx prisma migrate dev --name <name>` (основной путь обучения),
  `npx prisma db push` (только для черновых экспериментов).
- По твоему запросу продолжать такие же построчные разборы для следующих моделей.

