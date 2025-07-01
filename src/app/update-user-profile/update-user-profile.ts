import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiData } from '../fetch-api-data';

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


/**
 * UpdateUserProfile component displayed as dialog allowing users to update/edit their profile. 
 */
@Component({
  selector: 'app-update-user-profile',
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  templateUrl: './update-user-profile.html',
  styleUrl: './update-user-profile.scss'
})
export class UpdateUserProfile {
  newUserData: any;

  /**
   * Injects service and data into the component.
   * @param data -  User data passed to dialog.
   * @param dialogRef - Reference to the UpdateUserProfile dialog to handle when the dialog is opened.
   * @param fetchApiData - Service for handling API requests.
   * @param snackBar - Angular Material's snackbar feeback message for users.
   */
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateUserProfile>,
    private fetchApiData: FetchApiData,
    private snackBar: MatSnackBar
  ) { this.newUserData = { ...data }; }

/**
 * Function to save changes after user has updated its profile.
 * It sends user data to the API, and renders feedback message to the user,
 * and closes the dialog.
 */
  saveChanges(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.editUser(username!, this.newUserData).subscribe(() => {
      this.snackBar.open('Profile updated successfully!', 'OK', { duration: 2000 });
      this.dialogRef.close(true);
    }, (error: any) => {
      this.snackBar.open('Profile update failed: ' + error, 'OK', { duration: 2000 });
    });
  }

  /**
   * Function to close the dialog after user clicks 'Cancel' button without saving edited user data.
   */
  cancelChanges(): void {
    this.dialogRef.close();
  }
}
