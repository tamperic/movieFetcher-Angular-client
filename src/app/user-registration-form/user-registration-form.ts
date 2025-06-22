import { Component, OnInit, Input } from '@angular/core';

// Use this to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// Use this to display notifications back to the user
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

// Use this to bring in the API call created in app.ts
import { FetchApiData } from '../fetch-api-data';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-registration-form',  //Custom HTML element into which this component will render 
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
  @Input() userData = { username: '', password: '', email: '', birthDate: '' };

  constructor(
    public fetchApiData: FetchApiData,
    public dialogRef: MatDialogRef<UserRegistrationForm>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log('UserRegistrationForm initialized');
  }

  // The function responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration
      this.dialogRef.close(); // Close the modal on success
      console.log('Response is: ', response);
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

