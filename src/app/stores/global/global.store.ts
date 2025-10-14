import { computed } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

export interface Login {
  username: string;
  password: string;
}

export interface User {
  id: number | null;
  name: string;
  email: string;
}

export interface GlobalState {
  user: User;
  isLoading: boolean;
  lastUpdated: string | null;
}

const DEFAULT_USER_STATE = {
  user: {
    id: null,
    name: '',
    email: '',
  },
  isLoading: false,
  lastUpdated: null,
};

const initialState: GlobalState = DEFAULT_USER_STATE;

export const GlobalStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user, lastUpdated }) => ({
    isLoggedIn: computed(() => !!user()),
    userInfo: computed(() => `${user().name} (${user().email})`),
    lastUpdatedFormatted: computed(() =>
      lastUpdated() ? new Date().toLocaleString() : 'Never',
    ),
  })),
  withMethods((store) => ({
    setUser(user: Partial<User>): void {
      patchState(store, (state: GlobalState) => ({
        user: { ...state.user, ...user },
      }));
    },
    setLoading(isLoading: boolean): void {
      patchState(store, { isLoading });
    },
    updateTimestamp() {
      patchState(store, {
        lastUpdated: new Date().toISOString(),
      });
    },
    login: rxMethod<Login>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(async (creds) => {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          return {
            id: 123,
            name: creds.username,
            email: `${creds.username}@example.com`,
          };
        }),
        tap((user) => {
          patchState(store, {
            user: { ...user },
            isLoading: false,
            lastUpdated: new Date().toISOString(),
          });
        }),
      ),
    ),
    logout() {
      patchState(store, DEFAULT_USER_STATE);
    },
  })),
);
