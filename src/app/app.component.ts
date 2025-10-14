import { Component, inject, signal } from '@angular/core';
import { GlobalStore } from './stores/global/global.store';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TodoListComponent } from './features/todo-list/todo-list.component';

@Component({
  selector: 'st-root',
  imports: [DashboardComponent, TodoListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  globalStore = inject(GlobalStore);
}
