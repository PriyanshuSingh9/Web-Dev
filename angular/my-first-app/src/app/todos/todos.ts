import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todos',
  standalone: true,
  // 1. Imports: To use other components or directives (like RouterLink), 
  // we must list them here in a standalone component.
  imports: [Greeting, RouterLink],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  /**
   * 2. Component State:
   * Even simple strings are better as signals if they might change later.
   */
  title = signal("Todos page");
  todosMessage = signal("Lets start working:");
}
