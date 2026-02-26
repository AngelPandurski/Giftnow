# Gift Now – Client

Next.js приложение за Giftnow.bg. Базирано на шаблона [ed-roh/real-estate-prod](https://github.com/ed-roh/real-estate-prod).

---

## Структура на папките

```
client/
├── public/                 # Статични файлове
│   └── logo.png           # Лого Giftnow.bg
├── src/
│   ├── app/               # Страници и layouts
│   │   ├── page.tsx       # Root "/" – home
│   │   ├── layout.tsx     # Root layout
│   │   ├── globals.css    # Глобални стилове
│   │   ├── providers.tsx  # Redux, Auth, Toaster
│   │   ├── (auth)/        # Auth route group
│   │   │   ├── authProvider.tsx
│   │   │   ├── layout.tsx
│   │   │   └── signin/page.tsx   # /signin
│   │   ├── (dashboard)/   # Managers, tenants
│   │   │   ├── layout.tsx
│   │   │   ├── managers/
│   │   │   └── tenants/
│   │   ├── (nondashboard)/# Landing, search, dashboard
│   │   │   ├── layout.tsx
│   │   │   ├── landing/
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── HomeHeader.tsx
│   │   │   │   ├── ProductGridSection.tsx
│   │   │   │   └── ...
│   │   │   ├── admin/page.tsx       # /admin
│   │   │   ├── dashboard/page.tsx   # /dashboard
│   │   │   └── search/
│   │   └── dashboards/page.tsx      # /dashboards → redirect
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── ProductCard.tsx
│   │   │   └── ui/           # shadcn компоненти
│   ├── hooks/
│   ├── lib/
│   ├── state/
│   └── types/
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

---

## Маршрути (URL-и)

| URL | Файл | Описание |
|-----|------|----------|
| `/` | `app/page.tsx` | Home – промо, hero, бутон Log in |
| `/signin` | `app/(auth)/signin/page.tsx` | Логин форма |
| `/dashboard` | `app/(nondashboard)/dashboard/page.tsx` | Продуктова мрежа (след логин) |
| `/dashboards` | `app/dashboards/page.tsx` | Redirect към `/dashboard` |
| `/admin` | `app/(nondashboard)/admin/page.tsx` | Админ – регистрация на потребители |
| `/search` | `app/(nondashboard)/search/page.tsx` | Търсене (от шаблона) |
| `/managers/*` | `app/(dashboard)/managers/` | Dashboard мениджъри |
| `/tenants/*` | `app/(dashboard)/tenants/` | Dashboard наематели |

---

## Файлове – кое къде е

### app/ (root)

| Файл | Описание |
|------|----------|
| `page.tsx` | Root страница `/` – импортира и показва `HomePage`. |
| `layout.tsx` | Root layout – шрифтове (Geist), обвива `Providers`. |
| `providers.tsx` | StoreProvider (Redux), Authenticator.Provider, Auth, Toaster. |
| `globals.css` | Tailwind layers, CSS променливи, Amplify overrides. |

### Home страница (преди логин)

| Файл | Описание |
|------|----------|
| `app/(nondashboard)/landing/HomePage.tsx` | Промо: hero (emerald градиент), corporate секция (тъмна). Redirect при логнат потребител. |
| `app/(nondashboard)/landing/HomeHeader.tsx` | Header: лого, нав линкове, Log in, икони (търсене, кошница). |

### Dashboard страница (след логин)

| Файл | Описание |
|------|----------|
| `app/(nondashboard)/dashboard/page.tsx` | Продуктова мрежа. Изисква auth; ако не е логнат → redirect към `/`. |
| `app/(nondashboard)/landing/ProductGridSection.tsx` | Grid с 4 колони, mock продукти. |
| `components/ProductCard.tsx` | Карта: placeholder, заглавие, кратко описание. Зелени нюанси. |

### Sign in

| Файл | Описание |
|------|----------|
| `app/(auth)/signin/page.tsx` | Amplify Authenticator, само логин (без регистрация). След успешен логин → `/dashboard`. |

### Admin

| Файл | Описание |
|------|----------|
| `app/(nondashboard)/admin/page.tsx` | **Само за роля admin.** Регистрация на потребители (email, парола, роля). Линкът Admin се показва само на админи. |

### Layouts

| Файл | Описание |
|------|----------|
| `app/(nondashboard)/layout.tsx` | Layout за landing, search, dashboard – Navbar + padding. |
| `app/(dashboard)/layout.tsx` | Layout за managers/tenants – sidebar + Navbar. |

### Компоненти

| Файл | Описание |
|------|----------|
| `components/Navbar.tsx` | Header – различен за home/dashboard vs managers/tenants. |
| `components/ProductCard.tsx` | Карта за продукт – използва се в dashboard. |
| `components/ui/` | shadcn/ui – button, input, dialog и др. |

### State, API, Types

| Файл | Описание |
|------|----------|
| `state/api.ts` | RTK Query – getAuthUser, getProperties, tenants, managers. |
| `state/redux.tsx` | Redux store + StoreProvider. |
| `state/index.ts` | Redux slices – filters, viewMode. |
| `types/index.d.ts` | ApiResponse, ApiError. |
| `types/prismaTypes.d.ts` | Prisma типове. |

### Lib, Config

| Файл | Описание |
|------|----------|
| `lib/constants.ts` | NAVBAR_HEIGHT, amenities, enums. |
| `lib/utils.ts` | cn() за класове. |
| `lib/schemas.ts` | Zod схеми. |
| `tailwind.config.ts` | Tailwind – primary-200/300/500/700, content. |
| `next.config.ts` | Turbopack, config. |

### Public

| Файл | Описание |
|------|----------|
| `public/logo.png` | Лого Giftnow.bg – в HomeHeader и Navbar. |

---

## Поток на потребителя

1. **Home** (`/`) – промо, бутон Log in. Ако е логнат → redirect `/dashboard`.
2. **Sign in** (`/signin`) – логин. След успех → redirect `/dashboard`.
3. **Dashboard** (`/dashboard`) – продуктова мрежа. Ако не е логнат → redirect `/`.
4. **Admin** (`/admin`) – **само за роля admin.** Регистрация на потребители. Ако не е admin → redirect `/`. Линкът Admin се показва само на админи.

---

## Технологии (от шаблона)

- Next.js 16, React 19, TypeScript
- Tailwind CSS, shadcn/ui
- Redux Toolkit, RTK Query
- AWS Amplify / Cognito
- react-hook-form, Zod, framer-motion, lucide-react

---

## Стартиране

```bash
cd client
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000).

---

## Env променливи

| Променлива | Описание |
|------------|----------|
| `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_ID` | Cognito User Pool ID |
| `NEXT_PUBLIC_AWS_COGNITO_USER_POOL_CLIENT_ID` | Cognito Client ID |
| `NEXT_PUBLIC_API_BASE_URL` | Backend API URL (когато е готов) |

**Без Cognito env** – приложението работи в **mock режим** (без backend):
- `/signin` – форма с email + роля (tenant/manager/admin), запис в localStorage
- Dashboard, Admin – достъпни след „логин“
- Данните не се записват в база – само за разработка
- Когато колегата направи backend, ще се свърже с реалния API
