# 🚀 Angular v20 + NgRx Signals Store Demo

Проект-демонстрация использования **NgRx Signal Store** в современном Angular приложении с сигналами и standalone компонентами.

## 📋 О проекте

Этот проект показывает разницу между **глобальным** и **локальным** состоянием с использованием нового **NgRx Signal Store** в Angular v20+.

## 🛠 Технологии

- **Angular v20+** - последняя версия фреймворка
- **NgRx Signal Store** - управление состоянием на основе сигналов
- **Standalone Components** - современный подход без модулей
- **Signals** - реактивная система Angular
- **TypeScript** - строгая типизация

## 🏗 Архитектура состояния

### 🌍 **Глобальный Store (GlobalStore)**

- Singleton на всё приложение
- Содержит общеприложениевые данные
- Доступен из любого компонента
- Регистрируется через `{ providedIn: 'root' }`

```typescript
// Пример использования
globalStore = inject(GlobalStore);
userName = this.globalStore.user().name;
```

### 🏠 **Локальный Store (TodoStore)**

- Живёт только в рамках конкретного компонента
- Уничтожается при разрушении компонента
- Изолированное состояние для фичи
- Регистрируется в провайдерах компонента

```typescript
// Пример использования
@Component({
  providers: [TodoStore] // Локальная регистрация
})
```

## 📁 Структура проекта

```
src/
├── app/
│   ├── stores/
│   │   ├── global/
│   │   │   └── global.store.ts          # Глобальный store
│   │   └── todo/
│   │       └── todo.store.ts            # Локальный store
│   ├── features/
│   │   ├── dashboard/
│   │   │   └── dashboard.component.ts    # Использует глобальный store
│   │   └── todo-list/
│   │       └── todo-list.component.ts   # Использует локальный store
│   ├── app.component.ts                  # Корневой компонент
│   └── app.config.ts                     # Конфигурация приложения
```

## 🎯 Ключевые особенности

### ✅ **Глобальное состояние (GlobalStore)**

- Информация о пользователе
- Настройки приложения
- Загрузочные состояния
- Timestamp последнего обновления

### ✅ **Локальное состояние (TodoStore)**

- Список задач
- Фильтрация и поиск
- Статистика по задачам
- Локальные загрузочные состояния

### ✅ **Signal-based преимущества**

- 🚀 **Автоматическая реактивность** - нет необходимости в ручной подписке
- 🎯 **Type-safe** - полная типобезопасность
- ⚡ **Производительность** - оптимизированные обновления
- 🔄 **Интеграция с RxJS** - через `rxMethod` (опционально)

## 🚀 Быстрый старт

### Установка зависимостей

```bash
npm install
```

### Запуск development сервера

```bash
npm start
# или
ng serve
```

### Сборка проекта

```bash
npm run build
```

## 💡 Примеры использования

### Чтение состояния

```typescript
// Сигналы автоматически обновляются
userName = this.globalStore.user().name;
isLoading = this.globalStore.isLoading();
```

### Изменение состояния

```typescript
// Синхронное обновление
this.todoStore.addTodo('New task');
this.todoStore.toggleTodo(taskId);

// Асинхронные операции
this.globalStore.login(credentials);
```

### Computed значения

```typescript
// Автоматически пересчитываются при изменении зависимостей
filteredTodos = this.todoStore.filteredTodos();
stats = this.todoStore.stats();
```

## 🔧 Конфигурация

### app.config.ts

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(), // NgRx Global Store
  ],
};
```

## 🎨 Компоненты

### DashboardComponent

- Демонстрирует работу с **глобальным** store
- Показывает информацию пользователя
- Управление авторизацией

### TodoListComponent

- Демонстрирует работу с **локальным** store
- CRUD операции с задачами
- Фильтрация и поиск

## 📚 Learn More

- [Angular Signals Guide](https://angular.io/guide/signals)
- [NgRx Signal Store Documentation](https://ngrx.io/guide/signals/signal-store)
- [Standalone Components](https://angular.io/guide/standalone-components)

## 🤝 Разработка

### Code Style

- Standalone компоненты
- Signal-based подход
- Strict TypeScript
- Reactive programming

### Best Practices

- Разделение глобального и локального состояния
- Использование computed для производных данных
- Инкапсуляция бизнес-логики в stores

---

**⭐ Если проект был полезен, поставьте звезду!**
