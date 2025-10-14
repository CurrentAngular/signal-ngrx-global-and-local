import { Component, inject } from '@angular/core';
import { GlobalStore } from '../../stores/global/global.store';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  globalStore = inject(GlobalStore);

  login(): void {
    this.globalStore.login({ username: 'John', password: '123' });
  }

  updateUser(): void {
    this.globalStore.setUser({
      name: 'John Updated',
      email: 'john.updated@example.com',
    });
    this.globalStore.updateTimestamp();
  }
}
