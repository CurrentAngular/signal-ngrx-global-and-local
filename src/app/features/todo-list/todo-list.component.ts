import { Component, inject, OnInit, signal } from '@angular/core';
import { TodoStore } from '../../stores/todo/todo.store';
import { FormsModule } from '@angular/forms';
import { DatePipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [FormsModule, JsonPipe, DatePipe],
  // Локальный провайдер - store живет только в этом компоненте
  // Провайдер регистрируется в конкретном компоненте
  providers: [TodoStore],
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  // Живёт только в рамках этого компонента и его детей
  // Уничтожается при уничтожении компонента
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
