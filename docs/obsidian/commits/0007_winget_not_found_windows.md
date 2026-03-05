---
title: Шаг 0007 — winget не найден в PowerShell
date: 2026-03-05
commit: (ещё нет)
tags: [commit, windows, winget, postgresql, troubleshooting]
---

# Шаг 0007: `winget` не распознан в Windows

## Команды терминала

```powershell
winget install -e --id PostgreSQL.PostgreSQL
```

```powershell
# проверка наличия winget
Get-Command winget
```

## Конспект шага

Команда установки PostgreSQL через `winget` не сработала, потому что в текущей Windows-среде сам `winget` не установлен (или недоступен в PATH).  
Это проблема окружения ОС, а не проекта Prisma/TypeScript.

## Рабочие варианты установки PostgreSQL без winget

1) Официальный инсталлятор PostgreSQL для Windows  
Скачать с сайта PostgreSQL и установить `server + command line tools (psql)`.

2) Установить через Chocolatey (если он уже есть)

```powershell
choco install postgresql
```

3) Если нужен именно `winget`  
Установить/обновить **App Installer** из Microsoft Store, затем открыть новый PowerShell.

## Что важно запомнить

- Ошибка `command not found` на `winget` означает отсутствие пакетного менеджера Windows.
- Для курса достаточно любого способа, который дает рабочий `psql`.

## Что делать дальше

После установки PostgreSQL:

```powershell
psql --version
psql -U postgres -c "CREATE DATABASE ts_postgresql;"
```

Затем обновить `DATABASE_URL` в `.env` под созданную БД.

