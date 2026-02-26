# Giftnow.bg – Client

Frontend приложение за сайта Giftnow.bg – платформа за подаръци.

## Какво е направено

- **Начална страница** (`/`) – hero секция, промо за подаръци, корпоративни подаръци, бутон за вход
- **Вход** (`/signin`) – форма за логин с email и парола (поддръжка на AWS Cognito или mock режим)
- **Продуктов каталог** (`/product-catalog`) – мрежа с продукти, достъпна след логин
- **Админ панел** (`/admin`) – регистрация на потребители (само за роля admin)
- **Навигация** – Navbar с лого, линкове и бутони за вход/изход
- **Авторизация** – mock auth (localStorage) при липса на Cognito; или AWS Amplify при конфигуриран backend

## Технологии

| Категория | Технология |
|-----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **React** | React 19 |
| **Стилизация** | Tailwind CSS |
| **UI компоненти** | Radix UI, shadcn/ui |
| **State** | Redux Toolkit, RTK Query |
| **Auth** | AWS Amplify (Cognito) или mock (localStorage) |
| **Форми** | React Hook Form, Zod |
| **Икони** | Lucide React |
| **Анимации** | Framer Motion |

## Стартиране

```bash
cd client
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000).

## Mock режим

Без `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID` приложението работи с mock auth (localStorage). Влез през `/signin` с произволен email и парола.
