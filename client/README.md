# Giftnow.bg – Client

Frontend приложение за сайта Giftnow.bg – платформа за подаръци.

## Какво е направено

- **Начална страница** (`/`) – hero с замъглена снимка, промо, корпоративни подаръци, долна секция с blur
- **Вход** (`/signin`) – форма за логин (email + парола); Cognito или mock
- **Продуктов каталог** (`/product-catalog`) – мрежа с артикули (снимки, заглавия, описания)
- **Админ панел** (`/admin`) – регистрация на потребители, статистика прегледи, CRUD на артикули с качване/премахване на снимки
- **Navbar** – на всички страници; бутон Изход; потребителят остава логнат до изричен logout, след което се пренасочва към `/`

---

## Описание на файловете

### `src/app/` – маршрути и layout

| Файл | Описание |
|------|----------|
| `layout.tsx` | Коренов layout – шрифтове (Geist, Geist Mono), метаданни, обвивка с Providers |
| `page.tsx` | Начална страница (/) – фиксирана фонова снимка + overlay, `HomePage` |
| `signin/page.tsx` | Страница за вход – Cognito Authenticator или mock форма (email + парола) |
| `product-catalog/page.tsx` | Продуктов каталог – защитена страница; пренасочва нелогнати към `/` |
| `admin/page.tsx` | Админ панел – защитена; само за роля `admin`. Регистрация, прегледи, CRUD на артикули (добавяне, редактиране, изтриване, снимки) |
| `providers.tsx` | Провайдъри – Redux, MockAuth, Amplify Authenticator, `Navbar`, `ViewTracker`, Toaster |
| `authProvider.tsx` | Auth провайдър – Cognito Authenticator или mock; пренасочване за dashboard страници |
| `globals.css` | Глобални стилове |

### `src/components/` – UI компоненти

| Файл | Описание |
|------|----------|
| `Navbar.tsx` | Навигационна лента – лого, линк Admin (само за admin), бутон Изход / Log in |
| `HomePage.tsx` | Съдържание на началната страница – hero, промо, корпоративни подаръци, долна секция с blur |
| `HomeHeader.tsx` | Header за home секция |
| `ProductCard.tsx` | Карта за продукт – замъглена снимка като фон, остра снимка отгоре, заглавие, кратко описание |
| `ProductGridSection.tsx` | Секция с мрежа от продуктови карти; зарежда продукти от `productsStore` |
| `ViewTracker.tsx` | Записва преглед при всяко посещение (за статистика в админ) |
| `ui/*` | shadcn/ui компоненти (button, input, select, label, dialog, etc.) |

### `src/lib/` – бизнес логика и helpers

| Файл | Описание |
|------|----------|
| `productsStore.ts` | Mock store за продукти (localStorage). CRUD – `loadProducts`, `addProduct`, `updateProduct`, `deleteProduct`. Тип `Product` (id, title, shortDescription, imageUrl). |
| `viewCount.ts` | Mock брой прегледи (localStorage). `recordView()`, `getViewCount(period)` – daily, weekly, monthly, yearly, all |
| `mockAuth.tsx` | Mock auth провайдър – `login`, `logout`, потребител в localStorage |
| `mockAccounts.ts` | Тестови акаунти – angel@test.com / admin123 (admin), ramona@test.com / user123 (tenant) |
| `utils.ts` | Utility функции (cn за classnames) |
| `constants.ts` | Константи |
| `schemas.ts` | Zod схеми |

### `src/hooks/` – React hooks

| Файл | Описание |
|------|----------|
| `useAuth.ts` | Хук за auth – връща `user`, `isLoading`, `logout`. При Cognito – използва RTK Query; при mock – `useMockAuth`. Logout пренасочва към `/` |
| `use-mobile.tsx` | Хук за mobile breakpoint |

### `src/state/` – Redux и API

| Файл | Описание |
|------|----------|
| `redux.tsx` | Redux StoreProvider |
| `api.ts` | RTK Query API (за Cognito auth user) |
| `index.ts` | API slice |

### `src/types/` – TypeScript типове

| Файл | Описание |
|------|----------|
| `index.d.ts` | Глобални типове |
| `prismaTypes.d.ts` | Prisma типове (за бъдещ backend) |

### `public/` – статични assets

| Файл | Описание |
|------|----------|
| `logo.png` | Лого на Giftnow.bg |
| `login-bg.png` | Фонова снимка за login, hero, admin, долна секция |

---

## Технологии

| Категория | Технология |
|-----------|------------|
| **Framework** | Next.js 15 (App Router) |
| **React** | React 19 |
| **Стилизация** | Tailwind CSS |
| **UI компоненти** | Radix UI, shadcn/ui |
| **State** | Redux Toolkit, RTK Query |
| **Auth** | AWS Amplify (Cognito) или mock (localStorage) |
| **Икони** | Lucide React |

## Стартиране

```bash
cd client
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000).

## Mock режим

Без `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID` приложението работи с mock auth (localStorage). Влез през `/signin` с тестовите акаунти.
