import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { UserLoginForm } from '../user-login-form/user-login-form';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


/**
 * Navbar component that displays name of the app and links:
 * when user is logged out displays links 'Signup' and 'Login', 
 * when useris logged in displays links 'Home', 'Profile' and 'Logout'.
 */
@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
    RouterModule
  ],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})


export class Navbar {
  /**
   * Create an instance of navbar.
   * @param router - Angular Router for navigation.
   * @param snackBar - Angular MAterial's snackbar feeback message for users.
   * @param dialog - Service that provide opening other sub-dialogs.
   */
  constructor ( 
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /**
   * Function to check whether user is logged in.
   * @returns 'true' if user is logged in or 'false' if not.
   */
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  /**
   * Function to check whether user is logged out.
   * @returns 'true' if user is logged out and navigate to the '/welcome' or root '/' route or 'false' if not. 
   */
  isLoggedOut(): boolean {
    return this.router.url === '/welcome' || this.router.url === '/';
  }


  /**
   * Function to open the dialog to register user.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      // Assigning the dialog a width
      width: '480px'
    });
  }

  /**
   * Function to open the dialog to log in user.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: "480px"
    });
  } 

  /**
   * Function to log out user, clear localStorage, show feedback message to the user
   * and navigate to 'welcome' screen.
   */
  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.snackBar.open('User logged out successfully!', 'OK', { duration: 2000 });
    this.router.navigate(['welcome']);
  }
}