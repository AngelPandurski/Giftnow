# Gift Now

Frontend приложение за **Giftnow.bg** – сайт за подаръци за всеки повод.

## Обзор

- **Начална страница** – hero с замъглена снимка, промо, корпоративни подаръци, долна секция с blur
- **Вход** – email + парола (AWS Cognito или mock localStorage)
- **Продуктов каталог** – мрежа с артикули (снимки, заглавия, описания)
- **Админ панел** – регистрация на потребители, статистика прегледи, CRUD на артикули (добавяне, редактиране, изтриване, качване/премахване на снимки)
- **Навигация** – Navbar на всички страници с бутон Изход; потребителят остава логнат до изричен logout, след което се пренасочва към home

## Технологии

- **Next.js 15** (App Router)
- **React 19**
- **Tailwind CSS**
- **Radix UI / shadcn/ui**
- **Redux Toolkit**
- **AWS Amplify** (Cognito) или mock auth

## Стартиране

```bash
cd client
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000).

## Mock акаунти

| Email           | Парола   | Роля   |
|-----------------|----------|--------|
| angel@test.com  | admin123 | Admin  |
| ramona@test.com | user123  | Tenant |

---

Подробно описание на файловете в `client/README.md`.
