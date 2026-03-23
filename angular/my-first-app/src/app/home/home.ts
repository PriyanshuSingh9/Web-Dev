import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting, Counter, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  title = signal("Home page")
  homeMessage = signal("Welcome to the:")
}
