# 🎨 Product Visualizer AI

<div align="center">
  
  [![Deploy](https://img.shields.io/github/deployments/Jokersochi/Product-Visualizer-AI/production?label=deployment&logo=vercel)](https://product-visualizer-ai.vercel.app)
  [![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](LICENSE)
  
  **AI-powered маркетинговая визуализация продуктов на любых поверхностях**
  
</div>

## ✨ Возможности

- 🎯 **Автоматическая Визуализация** - Размещайте продукты на кружках, футболках, билбордах и 15+ других поверхностях
- 🤖 **AI Редактирование** - Изменяйте созданные изображения с помощью текстовых промптов
- ✂️ **Удаление Фона** - Автоматическое удаление фона с продуктов
- 📝 **Текстовые Оверлеи** - Добавляйте текст на изображения с настройкой размера, цвета и позиции
- 🎨 **Быстрые Стили** - Применяйте предустановленные стили одним кликом
- 🔄 **История Изменений** - Undo/Redo для всех операций
- 📊 **Сравнение** - Просмотр оригинала и результата бок о бок
- 💾 **Скачивание** - Сохранение результатов в высоком качестве

## 🚀 Быстрый Старт

### Локальная Разработка

```bash
git clone https://github.com/Jokersochi/Product-Visualizer-AI.git
cd Product-Visualizer-AI
pnpm install
cp .env.example .env.local
# Добавьте VITE_GEMINI_API_KEY в .env.local
pnpm run dev
```

### Production Деплой

**Vercel (рекомендуется):**
```bash
npx vercel --prod
```

**Docker:**
```bash
docker-compose up -d
```

Приложение будет доступно на `http://localhost:3001`

## 💼 Бизнес-Применение

### B2C (Креативщики, SMM)
- Быстрое создание мокапов для клиентов
- Визуализация дизайнов на мерче
- Презентационные материалы

### B2B (E-commerce, Бренды)
- Автоматизация создания карточек товаров
- A/B тестирование визуалов
- Массовая генерация контента для маркетплейсов
- API интеграция в существующие системы

## 💰 Монетизация

### Модель Freemium

**Free:**
- 10 генераций/день
- Базовые поверхности
- Водяной знак

**Pro ($19.99/мес):**
- Безлимитные генерации
- Все поверхности и стили
- Без водяных знаков
- HD качество
- Приоритетная обработка

**Business ($99/мес):**
- Всё из Pro
- API доступ
- Массовая обработка
- Белая метка
- Техподдержка 24/7

### Финансовый Прогноз

| Период | Пользователи | MRR | ARR |
|--------|-------------|-----|-----|
| Месяц 3 | 500 | $3K | $36K |
| Месяц 6 | 2000 | $15K | $180K |
| Месяц 12 | 5000 | $40K | $480K |

## 🛠 Технологии

- React 19 + TypeScript
- Vite
- Google Gemini AI (Image Generation & Editing)
- Tailwind CSS
- Docker + Vercel

## 📊 Use Cases

1. **Print-on-Demand** - Wildberries, Ozon продавцы
2. **Графические Дизайнеры** - Презентация концептов
3. **SMM Агентства** - Быстрый контент для соцсетей
4. **E-commerce** - Карточки товаров
5. **Стартапы** - MVP визуализация

## 🎯 Roadmap

- [x] Базовая генерация на 15+ поверхностях
- [x] AI редактирование
- [x] Удаление фона
- [x] Текстовые оверлеи
- [x] Production ready
- [ ] Система платежей
- [ ] API для бизнеса
- [ ] Массовая обработка (batch)
- [ ] Плагин для Figma
- [ ] Интеграция с маркетплейсами

## 🚀 Deployment

### Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Jokersochi/Product-Visualizer-AI)

### Manual

1. Создайте проект на Vercel
2. Подключите репозиторий
3. Добавьте environment variable: `VITE_GEMINI_API_KEY`
4. Deploy!

## 📈 Метрики

**Текущая версия:** 1.0.0  
**Статус:** Production Ready ✅  
**Uptime Target:** 99.9%  

## 🤝 Вклад

Приветствуются! См. [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 Лицензия

Apache License 2.0

## 🔗 Ссылки

- **Live Demo:** https://product-visualizer-ai.vercel.app
- **API Docs:** Coming soon
- **Support:** business@primerochnaya.ru

---

<div align="center">
  Made with ❤️ in Sochi | Powered by Gemini AI
</div>