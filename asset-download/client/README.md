# Gift Now – Client

Next.js приложение за проекта Gift Now.

## Стартиране

```bash
cd asset-download/client
npm install
npm run dev
```

Отвори [http://localhost:3000](http://localhost:3000) в браузъра.

---

## Инсталирани технологии и пакети

### Framework & Core
- **Next.js 16** – React framework
- **React 19** – UI библиотека
- **TypeScript** – типизация

### Стилизация
- **Tailwind CSS** – utility-first CSS
- **PostCSS** – с autoprefixer
- **shadcn/ui** – компонентна библиотека (базирана на Radix UI)

### shadcn/ui компоненти
- avatar, badge, button, card, checkbox
- command, dialog, dropdown-menu, form
- input, label, navigation-menu, radio-group, select
- separator, sheet, sidebar, skeleton, slider
- sonner, switch, table, tabs, textarea, tooltip

### State Management
- **react-redux** – свързване React ↔ Redux
- **@reduxjs/toolkit** – Redux Toolkit

### Форми и валидация
- **react-hook-form** – управление на форми
- **@hookform/resolvers** – интеграция с Zod
- **zod** – валидация на схеми

### UI & Анимации
- **framer-motion** – анимации
- **lucide-react** – икони
- **next-themes** – dark/light режим

### Файлове и медия
- **filepond** + **react-filepond** – upload на файлове
- **filepond-plugin-image-preview** – преглед на изображения
- **filepond-plugin-image-exif-orientation** – корекция на ориентация

### Карти
- **mapbox-gl** – Mapbox карти

### Утилити
- **dotenv** – зареждане на `.env` променливи
- **date-fns** – работа с дати
- **lodash** – помощни функции

---

## VS Code / Cursor разширения

- **Tailwind CSS IntelliSense** – автодопълване за Tailwind класове
- **Tailwind Documentation** – бърз достъп до документацията (Ctrl+Alt+W)

---

## Конфигурация

- `tailwind.config.ts` – Tailwind + shadcn
- `postcss.config.mjs` – PostCSS
- `components.json` – shadcn/ui настройки
- `lib/utils.ts` – cn() за класове
