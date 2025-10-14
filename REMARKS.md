### **Сценарий 1: Один и тот же провайдер в разных компонентах на одном уровне**

```typescript
// Компонент A
@Component({
  standalone: true,
  providers: [TodoStore], // 👈 РЕГИСТРАЦИЯ в компоненте A
  template: `...`,
})
export class ComponentA {
  todoStore = inject(TodoStore); // 🎯 Экземпляр 1
}

// Компонент B
@Component({
  standalone: true,
  providers: [TodoStore], // 👈 РЕГИСТРАЦИЯ в компоненте B
  template: `...`,
})
export class ComponentB {
  todoStore = inject(TodoStore); // 🎯 Экземпляр 2 (ДРУГОЙ!)
}

// Компонент C
@Component({
  standalone: true,
  providers: [TodoStore], // 👈 РЕГИСТРАЦИЯ в компоненте C
  template: `...`,
})
export class ComponentC {
  todoStore = inject(TodoStore); // 🎯 Экземпляр 3 (ТРЕТИЙ!)
}
```

**Результат: ❌ РАЗНЫЕ экземпляры** - у каждого компонента свой собственный TodoStore!

---

### **Сценарий 2: Родительский компонент с дочерними**

```typescript
// Родительский компонент
@Component({
  standalone: true,
  providers: [TodoStore], // 👈 РЕГИСТРАЦИЯ в родителе
  imports: [ComponentA, ComponentB, ComponentC],
  template: `
    <app-component-a></app-component-a>
    <app-component-b></app-component-b>
    <app-component-c></app-component-c>
  `,
})
export class ParentComponent {
  todoStore = inject(TodoStore); // 🎯 Экземпляр
}

// Дочерние компоненты (БЕЗ providers!)
@Component({
  standalone: true,
  // НЕТ providers: [TodoStore]! 👈
  template: `...`,
})
export class ComponentA {
  todoStore = inject(TodoStore); // 🎯 Тот ЖЕ экземпляр что и у родителя!
}

@Component({
  standalone: true,
  // НЕТ providers: [TodoStore]! 👈
  template: `...`,
})
export class ComponentB {
  todoStore = inject(TodoStore); // 🎯 Тот ЖЕ экземпляр!
}

@Component({
  standalone: true,
  // НЕТ providers: [TodoStore]! 👈
  template: `...`,
})
export class ComponentC {
  todoStore = inject(TodoStore); // 🎯 Тот ЖЕ экземпляр!
}
```

**Результат: ✅ ОДИН экземпляр** на всех компонентов в иерархии!

---

## 🎯 **Правила DI в Angular:**

### **Когда создаются РАЗНЫЕ экземпляры:**

```typescript
// Каждый компонент регистрирует свой собственный провайдер
@Component({ providers: [TodoStore] }) // 👈 Создает новый инстанс
export class ComponentA {}

@Component({ providers: [TodoStore] }) // 👈 Создает новый инстанс
export class ComponentB {}
```

### **Когда используется ОДИН экземпляр:**

```typescript
// Родитель регистрирует, дети используют
@Component({ providers: [TodoStore] }) // 👈 Создает инстанс
export class ParentComponent {}

@Component({
  /* нет providers */
}) // 👈 Использует родительский
export class ChildComponent {}

// Или глобальная регистрация
@Injectable({ providedIn: 'root' }) // 👈 Singleton на все приложение
export class GlobalStore {}
```

---

## 🔧 **Практический пример для нашего TodoStore:**

### **Если хотите ОБЩУЮ стора для нескольких компонентов:**

```typescript
// todo-container.component.ts
@Component({
  standalone: true,
  providers: [TodoStore], // 👈 Один провайдер на всех детей
  imports: [TodoListComponent, TodoStatsComponent, TodoFiltersComponent],
  template: `
    <app-todo-stats></app-todo-stats>
    <app-todo-filters></app-todo-filters>
    <app-todo-list></app-todo-list>
  `,
})
export class TodoContainerComponent {}

// Дочерние компоненты БЕЗ providers
@Component({ standalone: true })
export class TodoListComponent {
  todoStore = inject(TodoStore); // 🎯 Общая стора
}

@Component({ standalone: true })
export class TodoStatsComponent {
  todoStore = inject(TodoStore); // 🎯 Общая стора
}

@Component({ standalone: true })
export class TodoFiltersComponent {
  todoStore = inject(TodoStore); // 🎯 Общая стора
}
```

### **Если хотите ОТДЕЛЬНЫЕ сторы для каждого компонента:**

```typescript
// Каждый компонент регистрирует свой TodoStore
@Component({
  standalone: true,
  providers: [TodoStore], // 👈 Своя стора
})
export class StandaloneTodoComponent {
  todoStore = inject(TodoStore); // 🎯 Уникальная стора
}
```

---

## ✅ **Вывод:**

- **`providers: [TodoStore]` в каждом компоненте** = ❌ РАЗНЫЕ экземпляры
- **`providers: [TodoStore]` в родителе** = ✅ ОДИН экземпляр для всей иерархии
- **`{ providedIn: 'root' }`** = ✅ Singleton на всё приложение

**Для настоящего "локального" состояния** - регистрируйте в каждом компоненте отдельно!
