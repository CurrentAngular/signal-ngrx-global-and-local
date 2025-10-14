import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoStore } from '../../stores/todo/todo.store';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, JsonPipe],
  providers: [TodoStore], // Локальный провайдер - store живет только в этом компоненте
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  todoStore = inject(TodoStore);

  ngOnInit() {
    // Автоматическая загрузка при инициализации
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
