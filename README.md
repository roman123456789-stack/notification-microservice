# 🔔 Notification Microservice

Микросервис для отправки уведомлений с поддержкой различных провайдеров.

## Что умеет

- **📧 Отправка email** через Gmail и SMTP
- **🏭 Фабрика провайдеров** - легко добавлять новые способы отправки
- **📝 Структурированное логирование** с Pino
- **🔍 Трассировка запросов** - каждый запрос имеет уникальный ID
- **⚡ Быстрая настройка** - работает из коробки

## Быстрый старт

```bash
# Установка
npm install

# Настройка
cp .env.example .env.development
# Добавь свои данные в .env.development

# Запуск
npm run start:dev
```

## Настройка

Создай `.env.development`:

```env
NODE_ENV=development
PORT=3000

# Для Gmail
GMAIL_EMAIL_ADDRESS=your-email@gmail.com
GMAIL_EMAIL_PASSWORD=your-app-password
```

## Использование

```typescript
// Отправка через Gmail
await notificationService.send({
  type: 'GMAIL',
  to: 'user@example.com',
  subject: 'Привет!',
  message: '<h1>Hello World</h1>'
});
```

## Чем хорош

### 🎯 **Простая архитектура**
- Паттерн Strategy для выбора провайдера
- Чистое разделение логики по провайдерам
- Легко тестировать и поддерживать

### 🔧 **Легко расширять**
- Добавил новый провайдер? Просто создай класс и зарегистрируй в модуле
- Все провайдеры работают через единый интерфейс
- Не нужно менять существующий код

### 📊 **Хорошее логирование**
- Все запросы логируются с уникальным ID
- Видно время выполнения и статус
- Ошибки записываются с контекстом

### 🛡️ **Надёжность**
- Централизованная обработка ошибок
- Валидация конфигурации при старте
- Graceful degradation при проблемах с провайдером

### ⚡ **Производительность**
- Асинхронная отправка
- Лёгкий и быстрый
- Минимальное потребление ресурсов

## Добавление нового провайдера

1. Добавь в enum:
```typescript
export enum NotificationsProviderEnum {
  GMAIL = 'GMAIL',
  TELEGRAM = 'TELEGRAM', // ← новый
}
```

2. Создай провайдер:
```typescript
@Injectable()
export class TelegramProvider implements NotificationsProvider {
  async send(options: ProviderSendNotificationParameters): Promise<boolean> {
    // твоя логика отправки в Telegram
    return true;
  }
}
```

3. Зарегистрируй в модуле и стратегии - готово!

## Скрипты

```bash
npm run start:dev    # разработка
npm run build        # сборка
npm run start:prod   # продакшн
npm test            # тесты
npm run lint        # проверка кода
```

## Структура проекта

```
src/
├── notifications/        # Основная логика
│   ├── providers/       # Gmail, SMTP и т.д.
│   ├── interfaces/      # Типы для провайдеров
│   └── enums/          # Типы провайдеров
├── common/             # Общие утилиты
│   ├── filters/        # Обработка ошибок
│   ├── interceptors/   # Трансформация ответов
│   └── middlewares/    # Логирование запросов
└── logger/            # Настройка логирования
```

## Технологии

- **NestJS** - фреймворк
- **TypeScript** - типизация
- **Nodemailer** - отправка email
- **Pino** - быстрое логирование
- **Joi** - валидация конфигурации

---

Простой, надёжный и легко расширяемый микросервис для уведомлений.


## Оставайтесь на связи

- Telegram - [Roman](https://t.me/nee_copirui)