import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { UserLoginForm } from '../user-login-form/user-login-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    CommonModule
  ],
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  constructor ( 
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedOut(): boolean {
    return this.router.url === '/welcome' || this.router.url === '/';
  }

  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      // Assigning the dialog a width
      width: '480px'
    });
  }


  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: "480px"
    });
  } 

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.snackBar.open('User logged out successfully!', 'OK', { duration: 2000 });
    this.router.navigate(['welcome']);
  }
}