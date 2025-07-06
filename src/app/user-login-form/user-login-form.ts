import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FetchApiData } from '../fetch-api-data';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 


/**
 * UserLoginForm component displayed as dialog allowing users to log in after their registration. 
 * It requires from user to enter their username and password, submits entered data to the API,
 * navigates to the main app screen - MovieCard.
 */
@Component({
  selector: 'app-user-login-form',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-login-form.html',
  styleUrl: './user-login-form.scss'
})
export class UserLoginForm {
  /** User data object containing required keys and their values to allow user to log in. */
  userData = { username: '', password: ''};

  /**
   * Injects dependencies for form submission, navigation, and UI feedback.
   * @param fetchApiData - Service for handling API requests - send login request to the backend.
   * @param dialogRef - Reference to the UserLoginForm dialog to handle when the dialog is opened.
   * @param snackBar - Angular Material's snackbar feeback message for users.
   * @param router - Angular Router for navigation.
   */
  constructor(
    public fetchApiData: FetchApiData,
    public dialogRef: MatDialogRef<UserLoginForm>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // console.log('UserLoginForm initialized');
  }

  /**
   * Function to log in user, sending credentials from the form input fields to the backend.
   * On success stores token and user data in local storage, closes the 'Login' dialog,
   * sends feedback message to the user, and navigate to the main app screen (/movies) - MovieCard page.
   * On failure sends feedback message about failure to the user and navigate to the welcome screen.
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // Logic for a successful user registration
      // localStorage.setItem('user', response.user.username);
      // localStorage.setItem('token', response.token);
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', response.user.username);
        localStorage.setItem('token', response.token);
      }

      this.dialogRef.close();
      // console.log(response);
      this.snackBar.open('User logged in successfully!', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']); // Once login is successful navigate to 'movies'
    }, (response) => {
      this.snackBar.open('Login failed: ' + response, 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome']); // Once login failed navigate to 'welcome'
    });
  }
}
