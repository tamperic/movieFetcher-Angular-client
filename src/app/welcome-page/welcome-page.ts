import { Component, OnInit } from '@angular/core';
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { UserLoginForm } from '../user-login-form/user-login-form';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-welcome-page',
  imports: [
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss'
})


export class WelcomePage implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {  }
  
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

}