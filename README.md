# 🎬 MovieFetcherAngularClient

**MovieFetcher** is a client-side application built with Angular that allows users to explore a wide selection of movies and interact with a RESTful API backend. It uses Angular’s component-based architecture along with Angular Material for a responsive user experience.

## 🚀 Features

As a user, you will be able to:
- ✅ **Sign Up** – Create an account to start using MovieFetcher.
- 🔐 **Log In** – Securely log in to access all app features.
- 🎞️ **Browse Movies** – View a list of all available movies.
- 📄 **Movie Details** – Click on certain movie card to view:
  - Title, Image, Description
  - Genre & Director info
  - List of Actors
  - Release Year, Duration & Rating
  - ❤️ **Favorites** – Add or remove any movie from your personal list of favorites.
- 👤 **Profile Management**:
  - View your registration details
  - Edit your username, password, email, and date of birth
  - Delete your account
  - View your list of favorite movies
- 🔓 **Log Out** – Securely log out of your account via Navbar or Profile screen.


## 🧱 Angular Components

The app is built using Angular’s reusable standalone components:

- **App** – Root component bootstrapping the application and routing.

- **Navbar** – Displays navigation links and name of the app.

- **WelcomePage** – Enter page for login and signup dialogs.

- **MovieCard** – Displays list of all movies, whereby each movie is displayed in form of card.

- **MovieDetails** – Shows detailed information about a selected movie with dialogs for director and genre.

- **UserLoginForm** – Dialog that handles user login form and authentication.

- **UserRegistrationForm** – Dialog that handles user signup form and registration process.

- **UserProfile** – Displays user info and manages profile updates, favorites, logout, and account deletion.

- **UpdateUserProfile** – Dialog to update user profile information.

- **ConfirmDialog** – Confirmation dialog for user actions like account deletion.


## 🛠️ Tech stack 

- **Angular** - this project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.2.
- **Node.js** - for this project used Node version 20.19.2.
- **Angular Material** - a UI component library for modern and responsive design.
- **Angular Router** - used for routing - smooth navigation accross the app.
- **RxJS** - reactive programming for asynchronous operations and API handling.
- **TypeScript** - a superset of JavaScript for better code quality.
- **TypeDoc** - for converting comments in TypeScript's source code into HTML documentation.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
