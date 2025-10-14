import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoStore } from '../../stores/todo/todo.store';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';
import { TODO_STORE } from '../../stores/todo/todo-store.token';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, JsonPipe, DatePipe],
  providers: [TodoStore],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  // todoStore = inject(TodoStore);
  todoStore = inject(TODO_STORE);

  ngOnInit() {
    this.todoStore.loadTodos();
  }

  addTodo(title: string) {
    if (title.trim()) {
      this.todoStore.addTodo(title.trim());
    }
  }

  onFilterChange(event: Event) {
    const filter = (event.target as HTMLSelectElement).value as any;
    this.todoStore.setFilter(filter);
  }
}
