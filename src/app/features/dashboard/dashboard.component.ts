import { Component, inject, signal } from '@angular/core';
import { GlobalStore } from '../../stores/global/global.store';
import { JsonPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe, DatePipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  globalStore = inject(GlobalStore);

  login() {
    this.globalStore.login({ username: 'John', password: '123' });
  }

  updateUser() {
    this.globalStore.setUser({
      name: 'John Updated',
      email: 'john.updated@example.com',
    });
    this.globalStore.updateTimestamp();
  }
}
