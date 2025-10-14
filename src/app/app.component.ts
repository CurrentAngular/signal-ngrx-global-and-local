import { Component, signal } from '@angular/core';

@Component({
  selector: 'st-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly title = signal('angular-stores');
}
