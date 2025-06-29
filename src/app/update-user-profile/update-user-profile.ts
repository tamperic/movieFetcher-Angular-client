import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FetchApiData } from '../fetch-api-data';

import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

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

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<UpdateUserProfile>,
    private fetchApiData: FetchApiData,
    private snackBar: MatSnackBar
  ) { this.newUserData = { ...data }; }


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

  cancelChanges(): void {
    this.dialogRef.close();
  }
}
