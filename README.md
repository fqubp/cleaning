# KLG Clean MVP

MVP-реализация сайта клинингового сервиса (Калининград) по ТЗ:
- Лендинг + разделы услуг, прайса, FAQ, бонусов, блога, контактов.
- API-заготовки для заявок, бонусов, блога.
- Простая админ-страница-заглушка.
- SQL-схема для PostgreSQL/Supabase.

## Запуск

```bash
npm install
npm run dev
```

## Доступные API
- `POST /api/request` — создать заявку.
- `GET /api/request` — список заявок.
- `GET|PUT|DELETE /api/request/:id` — операции с заявкой.
- `GET /api/bonuses/:phone` — баланс бонусов.
- `POST /api/bonuses/use` — списание бонусов.
- `GET|POST /api/blog` — блог.

## Важно
Текущая версия хранит данные в памяти процесса (MVP). Для production подключите PostgreSQL/Supabase, S3-хранилище и защищённую авторизацию админки.
