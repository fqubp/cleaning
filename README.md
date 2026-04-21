# KLG Clean — near-final MVP

Практический MVP под ТЗ клинингового сервиса (Калининград):
- адаптивный контентный сайт с улучшенным UI,
- полноценная форма заявки с валидацией,
- админка для просмотра и смены статусов заявок,
- API-слой для заявок и бонусов,
- готовность к работе с Supabase/PostgreSQL.

## Что реализовано
- Публичные страницы: главная, услуги, коммерческий блок, прайс, FAQ, отзывы, до/после, блог, контакты.
- Админ-панель (`/admin`) с просмотром заявок и обновлением статусов/цены.
- API:
  - `GET/POST /api/request`
  - `GET/PUT/DELETE /api/request/:id`
  - `GET /api/bonuses/:phone`
  - `POST /api/bonuses/use`
  - `POST /api/upload-url` (заготовка под прямую загрузку в S3/Supabase)
- Репозиторий данных:
  - fallback in-memory для локальной разработки,
  - Supabase REST-режим при наличии env (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`).

## Переменные окружения
Создайте `.env.local`:

```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
MOCK_UPLOAD_URL=https://your-upload-endpoint
ADMIN_PASSWORD=strong_password_here
```

Если `SUPABASE_*` не заданы, проект автоматически работает в режиме in-memory.


## Админ-доступ
- `GET /admin` защищён cookie-сессией.
- Вход: `/admin/login` и `POST /api/admin/login`.
- Выход: `POST /api/admin/logout`.
- Пароль задаётся через `ADMIN_PASSWORD`.

## Запуск

```bash
npm install
npm run dev
```

## Важно
В текущем окружении установка npm-зависимостей может быть ограничена политиками сети. В таком случае используйте локальную машину или CI с доступом к registry.npmjs.org.
