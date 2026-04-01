import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true, // This component is self-contained and manages its own imports
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss',
})
export class Counter {
  /**
   * 1. Signals: The modern way to manage state in Angular.
   * 'signal(0)' creates a reactive variable starting at 0.
   * To read the value in the template, we call it like a function: {{ count() }}
   */
  count = signal(0);

  /**
   * 2. Updating Signals:
   * .update() is used when the new value depends on the old one.
   * .set() is used to replace the value entirely.
   */
  increment() { 
    this.count.update(c => c + 1); 
  }

  decrement() { 
    this.count.update(c => c - 1); 
  }

  reset() { 
    this.count.set(0); 
  }
}
