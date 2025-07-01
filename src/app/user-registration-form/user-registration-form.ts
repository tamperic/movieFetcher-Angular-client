import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Use this to close the dialog on success
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Use this to display notifications back to the user
import { FetchApiData } from '../fetch-api-data'; // Use this to bring in the API call created in app.ts
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


/**
 * UserRegistrationForm component displayed as dialog allowing users to sign up. 
 * It requires from user to enter their credentials in form input fields, submits entered data to the API.
 */
@Component({
  selector: 'app-user-registration-form', 
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-registration-form.html',
  styleUrl: './user-registration-form.scss'
})


export class UserRegistrationForm implements OnInit {
  /**
   * User object containing required keys and their values entered in registration form input fields to allow user to register.
   */
  @Input() userData = { username: '', password: '', email: '', birthDate: '' };


/**
 * Injects dependencies for form submission, navigation, and UI feedback.
 * @param fetchApiData - Service for handling API requests - send signup request to the backend.
 * @param dialogRef - Reference to the UserRegistrationForm dialog to handle when the dialog is opened.
 * @param snackBar - Angular Material's snackbar feeback message for users.
 */
  constructor(
    public fetchApiData: FetchApiData,
    public dialogRef: MatDialogRef<UserRegistrationForm>,
    public snackBar: MatSnackBar
  ) { }

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {
    // console.log('UserRegistrationForm initialized');
  }

  /***
   * Function to create a user account, sending credentials from the form input fields to the backend.
   * On success closes the dialog and sends feedback message to the user.
   * On failure sends feedback (error) message about failure to the user.
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration
      this.dialogRef.close();
      // console.log('Response is: ', response);
      this.snackBar.open('User registered successfully!', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open('Registration failed: ' + response, 'OK', {
        duration: 2000
      });
    });
  }
}

