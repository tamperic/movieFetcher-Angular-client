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
  userData = { username: '', password: ''};

  constructor(
    public fetchApiData: FetchApiData,
    public dialogRef: MatDialogRef<UserLoginForm>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    console.log('UserLoginForm initialized');
  }

  // The function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // Logic for a successful user registration
      localStorage.setItem('user', response.user.username);
      localStorage.setItem('token', response.token);
      // localStorage.setItem('token', JSON.stringify(response.token));
      // localStorage.setItem('user', JSON.stringify(response.user.username));

      this.dialogRef.close(); // Close the modal on success
      console.log(response);
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
