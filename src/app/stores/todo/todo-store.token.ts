import {
  EnvironmentProviders,
  InjectionToken,
  makeEnvironmentProviders,
} from '@angular/core';
import { TodoState, TodoStore } from './todo.store';

// export const TODO_STORE = new InjectionToken('Todo Store', {
//   providedIn: 'root',
//   factory: () => new TodoStore(),
// });

export const TODO_STORE = new InjectionToken('Todo Store');

// Базовая фабрика
export function createTodoStore() {
  return new TodoStore();
}

// Простой провайдер
export const TODO_STORE_PROVIDER = {
  provide: TODO_STORE,
  useFactory: createTodoStore,
};

// Environment провайдер для роутинга
export function provideTodoStore(): EnvironmentProviders {
  return makeEnvironmentProviders([TODO_STORE_PROVIDER]);
}

// Кастомный провайдер с конфигурацией
export function provideTodoStoreWithConfig(config?: { featureName?: string }) {
  return {
    provide: TODO_STORE,
    useFactory: () => {
      const store = new TodoStore();
      if (config?.featureName) {
        // Можно настроить store под конкретную фичу
        console.log(`TodoStore for: ${config.featureName}`);
      }
      return store;
    },
  };
}
