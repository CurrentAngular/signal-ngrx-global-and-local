import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withComputed,
} from '@ngrx/signals';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap, pipe, switchMap, debounceTime } from 'rxjs';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  searchQuery: string;
  loading: boolean;
}

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  searchQuery: '',
  loading: false,
};

export const TodoStore = signalStore(
  withState(initialState),
  withComputed(({ todos, filter, searchQuery }) => ({
    filteredTodos: computed(() => {
      let filtered = todos();

      // Фильтрация по статусу
      if (filter() === 'active') {
        filtered = filtered.filter((todo) => !todo.completed);
      } else if (filter() === 'completed') {
        filtered = filtered.filter((todo) => todo.completed);
      }

      // Поиск
      const query = searchQuery().toLowerCase();
      if (query) {
        filtered = filtered.filter((todo) =>
          todo.title.toLowerCase().includes(query),
        );
      }

      return filtered;
    }),

    stats: computed(() => {
      const allTodos = todos();
      return {
        total: allTodos.length,
        completed: allTodos.filter((todo) => todo.completed).length,
        active: allTodos.filter((todo) => !todo.completed).length,
      };
    }),
  })),
  withMethods((store) => ({
    // Синхронные методы
    addTodo(title: string) {
      const newTodo: Todo = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        completed: false,
        createdAt: new Date(),
      };

      patchState(store, (state) => ({
        todos: [...state.todos, newTodo],
      }));
    },

    toggleTodo(id: string) {
      patchState(store, (state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo,
        ),
      }));
    },

    removeTodo(id: string) {
      patchState(store, (state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    },

    setFilter(filter: TodoState['filter']) {
      patchState(store, { filter });
    },

    setSearchQuery(query: string) {
      patchState(store, { searchQuery: query });
    },

    // Асинхронный метод
    loadTodos: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(async () => {
          // Имитация загрузки данных
          await new Promise((resolve) => setTimeout(resolve, 1500));

          return [
            {
              id: '1',
              title: 'Learn Angular',
              completed: true,
              createdAt: new Date(),
            },
            {
              id: '2',
              title: 'Master NgRx Signals',
              completed: false,
              createdAt: new Date(),
            },
            {
              id: '3',
              title: 'Build amazing app',
              completed: false,
              createdAt: new Date(),
            },
          ];
        }),
        tap((todos) => {
          patchState(store, {
            todos,
            loading: false,
          });
        }),
      ),
    ),
  })),
);
