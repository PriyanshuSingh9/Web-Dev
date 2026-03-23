import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todos',
  imports: [Greeting, RouterLink],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
export class Todos {
  title = signal("Todos page")
  todosMessage = signal("Lets start working:")
}
