# Angular Notes for This Project

This app is built with Angular `21.2.x`, and it uses Angular's modern standalone style instead of `NgModule`s.

The goal of this note is to explain the project in beginner-friendly language using:

- the current code in this repo
- the official Angular docs at `angular.dev`

Helpful Angular docs:

- Components: https://angular.dev/guide/components
- Inputs: https://angular.dev/guide/components/inputs
- Signals: https://angular.dev/guide/signals
- Routing: https://angular.dev/guide/routing/define-routes
- Router outlet: https://angular.dev/guide/routing/show-routes-with-outlets

## 1. How the app starts

Angular starts this app from `src/main.ts`:

```ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig);
```

Important idea:

- `bootstrapApplication()` starts the whole Angular app.
- `App` is the root component.
- `appConfig` contains app-wide setup, like routing.

This is the modern Angular way. Older Angular projects often start with `AppModule`, but this project does not use that pattern.

## 2. Components are the main building blocks

A component is one piece of your UI.

In this project, examples include:

- `src/app/home/home.ts`
- `src/app/todos/todos.ts`
- `src/app/components/greeting/greeting.ts`
- `src/app/components/counter/counter.ts`
- `src/app/components/header/header.ts`

Each component usually has:

- a `.ts` file for logic
- a `.html` file for the template
- a `.scss` file for styles

Example from `src/app/todos/todos.ts`:

```ts
@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [Greeting, RouterLink],
  templateUrl: './todos.html',
  styleUrl: './todos.scss',
})
```

What this means:

- `selector`: the HTML tag name for the component
- `imports`: other Angular features or components this template needs
- `templateUrl`: where the HTML lives
- `styleUrl`: where the styles live

### Standalone components

According to the Angular docs, components are standalone by default in newer Angular versions.

That matters in this project because:

- some components explicitly say `standalone: true`
- some components do not write it at all
- both are still fine in Angular 21

So when you see `imports: [...]` inside a component, that is the modern standalone style.

## 3. Templates show data on the page

The HTML file of a component is called its template.

Example from `src/app/home/home.html`:

```html
<h2>
  <app-greeting [message]="homeMessage()" />
  {{ title() }}
  <app-counter />
  <button routerLink="/todos">Todos</button>
</h2>
```

This shows several Angular template features:

- `<app-greeting />`: using another component
- `{{ title() }}`: showing data with interpolation
- `[message]="homeMessage()"`: passing data into a child component
- `routerLink="/todos"`: navigating without reloading the page

## 4. Signals are this project's state system

This project uses Angular signals for state.

Example from `src/app/home/home.ts`:

```ts
title = signal("Home page");
homeMessage = signal("Welcome to the:");
```

Example from `src/app/components/counter/counter.ts`:

```ts
count = signal(0);
```

The Angular docs describe a signal as a reactive value. In simple words:

- a signal stores data
- Angular watches where that data is used
- when the signal changes, the UI updates

### How to read a signal

You read a signal by calling it like a function:

```html
{{ title() }}
{{ count() }}
```

That `()` is very important.

### How to update a signal

From `counter.ts`:

```ts
increment() {
  this.count.update((c) => c + 1);
}

reset() {
  this.count.set(0);
}
```

Use:

- `.set(newValue)` when you want to replace the value
- `.update(oldValue => newValue)` when the new value depends on the old one

## 5. `input()` is how this project receives data from a parent

The `Greeting` component uses Angular's signal-based inputs:

```ts
import { Component, input } from '@angular/core';

export class Greeting {
  message = input("Defualt greeting");
}
```

The Angular docs explain that `input()` creates an input signal.

That means:

- the parent component can send a value in
- inside the child, you read it like a signal

In `src/app/components/greeting/greeting.html`:

```html
<h1 class="greeting-text">{{ message() }}</h1>
```

In `src/app/home/home.html`:

```html
<app-greeting [message]="homeMessage()" />
```

So the flow is:

1. `Home` stores data in `homeMessage`
2. `Home` passes it to `Greeting`
3. `Greeting` reads it with `message()`

This is a very common Angular pattern: parent component to child component data flow.

## 6. Routing lets the app switch pages

This app has routing set up in `src/app/app.config.ts`:

```ts
providers: [
  provideBrowserGlobalErrorListeners(),
  provideRouter(routes)
]
```

The Angular docs say `provideRouter(routes)` enables routing for the whole app.

The actual routes are in `src/app/app.routes.ts`:

```ts
export const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadComponent: () => import("./home/home").then((m) => m.Home)
  },
  {
    path: "todos",
    pathMatch: "full",
    loadComponent: () => import("./todos/todos").then((m) => m.Todos)
  }
];
```

What this means:

- `/` shows the `Home` page
- `/todos` shows the `Todos` page
- `loadComponent()` lazy-loads the page component when needed

Lazy loading is useful because Angular can load code only when the user visits that route.

## 7. `router-outlet` is the place where pages appear

In `src/app/app.html`:

```html
<app-header />
<router-outlet />
```

The Angular docs describe `router-outlet` as a placeholder.

In simple words:

- `app-header` stays on the page
- `router-outlet` is the space where Angular renders the current route

So:

- on `/`, Angular shows the `Home` component there
- on `/todos`, Angular shows the `Todos` component there

## 8. `RouterLink` is the Angular way to navigate

This project uses `RouterLink` in templates.

Examples:

```html
<button routerLink="/todos">Todos</button>
```

```html
<a routerLink="/" class="btn-back">
  <span>&larr;</span> Back to Home
</a>
```

Why use `routerLink` instead of plain `href` for app pages?

- Angular handles the navigation
- the page does not fully reload
- it feels like a single-page app

Important: to use `routerLink`, the component must import `RouterLink`.

You can see that in:

- `src/app/home/home.ts`
- `src/app/todos/todos.ts`

## 9. What the current pages do

### Home page

`src/app/home/home.ts`:

- stores `title` as a signal
- stores `homeMessage` as a signal
- imports `Greeting`, `Counter`, and `RouterLink`

`src/app/home/home.html`:

- shows the greeting
- shows the title
- renders the counter component
- includes a button to go to `/todos`

### Todos page

`src/app/todos/todos.ts`:

- stores `title` as a signal
- stores `todosMessage` as a signal
- imports `Greeting` and `RouterLink`

`src/app/todos/todos.html`:

- shows a back link to the home page
- shows the greeting and title
- shows an empty state for the todo list

Right now, the Todos page is mostly UI. It does not yet store a real array of tasks.

## 10. Testing in this project

This project already has a test for the Todos component in `src/app/todos/todos.spec.ts`.

```ts
await TestBed.configureTestingModule({
  imports: [Todos],
}).compileComponents();
```

This is another sign that `Todos` is a standalone component.

Instead of declaring it in a testing module, Angular can import the component directly into the test setup.

## 11. A few beginner takeaways

- Angular is built from components.
- This project uses standalone components, not `NgModule`s.
- Signals hold changing data like titles and counts.
- Signal inputs let a parent pass data to a child.
- `provideRouter(routes)` turns on routing.
- `router-outlet` decides where the current page is rendered.
- `routerLink` lets users move between pages without a full refresh.

## 12. What to learn next in this project

A good next step would be turning the Todos page into a real feature by learning:

- signals with arrays, for example `signal<Todo[]>([])`
- event binding like `(click)`
- form handling with `FormsModule` or reactive forms
- looping in templates to display many todo items

Once you understand the current files, those next topics will feel much easier.
