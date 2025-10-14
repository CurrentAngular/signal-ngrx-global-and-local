import { InjectionToken } from '@angular/core';
import { TodoStore } from './todo.store';

export const TODO_STORE = new InjectionToken('Todo Store', {
  providedIn: 'root',
  factory: () => new TodoStore(),
});
