import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FetchApiData } from '../fetch-api-data';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { UpdateUserProfile } from '../update-user-profile/update-user-profile';

@Component({
  selector: 'app-user-profile',
  imports: [
    CommonModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  standalone: true,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.scss'
})
export class UserProfile implements OnInit {
  user: any = {};
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiData,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private CDR: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      const favMoviesIDs = this.user.favoriteMovies || [];
      this.favMovies = res.filter((movie: any) => favMoviesIDs.includes(movie._id));
      this.CDR.detectChanges();
    }, (error) => {
      this.snackBar.open('Fetching favorite movies failed: ' + error, 'OK', { duration: 2000 });
    });
  }

  getUser(): void {
    const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');

    if (!username) {
      this.snackBar.open('User not found in local storage', 'OK', { duration: 2000 });
      return;
    }

    this.fetchApiData.getUser(username).subscribe((res) => {
      this.user = res;
      this.getFavMovies();
      this.CDR.detectChanges(); //  Run change detection and update the view after data changes 
      console.log(this.user);
      return this.user;
    });
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserProfile, {
      width: '480px',
      data: { ...this.user }
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) this.getUser();
    });
  }


  deleteUserAccount(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    const dialogRef = this.dialog.open(ConfirmDialog, { 
      width: '480px',
      data: { message: 'Are you sure you want to delete your accournt? This action cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchApiData.deleteUser(username).subscribe(() => {
          this.snackBar.open('Account deleted successfully', 'OK', { duration: 2000 });
          localStorage.clear();
          this.router.navigate(['welcome']);
        }, (error) => {
          this.snackBar.open('Deleting account failed: ' + error, 'OK', { duration: 2000 });
        });
      }
    });
  }

  logoutUser(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.snackBar.open('User logged out successfully!', 'OK', { duration: 2000 });
    this.router.navigate(['welcome']);
  }
}
