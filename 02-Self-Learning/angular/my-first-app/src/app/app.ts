// 1. Imports: We bring in tools from the Angular "library" to help us build the component.
// Component: A tool to create a UI element.
// signal: A way to store data that the page can "react" to when it changes (similar to useState in React).
import { Component, signal } from '@angular/core';

// RouterOutlet: A placeholder that shows different pages based on the URL.
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home';
import { Header } from './components/header/header';

/**
 * 2. The @Component Decorator: 
 * Think of this as a "config" or "instruction manual" for the class below.
 * It tells Angular: "Hey, this isn't just a normal TypeScript class, it's a web component!"
 */
@Component({
  // 'selector' is the HTML tag name you'll use to put this component on a page.
  // In index.html, you'll see <app-root></app-root>.
  selector: 'app-root',

  // 'imports' tells this component which other Angular tools or components it needs.
  // Here, we need RouterOutlet to display our app's navigation views.
  imports: [RouterOutlet, Home, Header],

  // 'templateUrl' points to the HTML file that defines WHAT the component shows.
  templateUrl: './app.html',

  // 'styleUrl' points to the CSS (or SCSS) file that defines HOW the component looks.
  styleUrl: './app.scss'
})
/**
 * 3. The App Class:
 * This is the "brain" of your component. This is where you write your logic.
 */
export class App {
  /**
   * 'signal' is like a variable with "superpowers."
   * When you change the value inside this signal, Angular is smart enough to 
   * automatically update your website wherever this title is shown.
   * 'protected' means it's accessible to the HTML template but not outside the class.
   */
  protected readonly title = signal('my-first-app');
}
