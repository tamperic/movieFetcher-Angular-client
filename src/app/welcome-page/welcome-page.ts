import { Component, OnInit } from '@angular/core'; // Angular component for handling the welcome page view
import { UserRegistrationForm } from '../user-registration-form/user-registration-form';
import { UserLoginForm } from '../user-login-form/user-login-form';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


/**
 * WelcomePage component allows users to create account or log in, by clicking 'Sign Up' or 'Log In' buttons.
 */
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
  /**
   * Inject MatDialog service:
   * @param dialog - Service that provide opening other dialogs.
   */
  constructor(public dialog: MatDialog) { }

  /** Angular lifecycle hook called after component initialization. */
  ngOnInit(): void {  }
  
  /**
   * Function to open the UserRegistration dialog when the SIGNUP button is clicked.
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationForm, {
      // Assigning the dialog a width
      width: '480px'
    });
  }

  /**
   * Function to open the UserLogin dialog when the LOGIN button is clicked.
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginForm, {
      width: "480px"
    });
  }

}