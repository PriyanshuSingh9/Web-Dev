import { Component, input } from '@angular/core';

@Component({
  selector: 'app-greeting',
  standalone: true,
  imports: [],
  templateUrl: './greeting.html',
  styleUrl: './greeting.scss',
})
export class Greeting {
  /**
   * 1. Inputs: How we pass data from a parent component to a child.
   * 'input("Default")' creates a signal-based input.
   * If the parent doesn't provide a value, it uses "Default greeting".
   * Usage in parent: <app-greeting [message]="'Hello World'"/>
   */
  message = input("Defualt greeting")
}
