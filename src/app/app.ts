import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { MovieCard } from "./movie-card/movie-card";
import { UserRegistrationForm } from './user-registration-form/user-registration-form';
import { UserLoginForm } from './user-login-form/user-login-form';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [
    // RouterOutlet,
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {
  protected title = 'movieFetcher-Angular-client';

  constructor(public dialog: MatDialog) { }
  
  // This is the function that will open the dialog when the SIGNUP button is clicked.
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      // Assigning the dialog a width
      width: '480px'
    });
  }

  // This is the function that will open the dialog when the LOGIN button is clicked.
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: "480px"
    });
  }

  // This is the function that will open the dialog when the ALL MOVIES button is clicked.
  openMoviesDialog(): void {
    this.dialog.open(MovieCard, {
      width: '500px'
    });
  }
}
