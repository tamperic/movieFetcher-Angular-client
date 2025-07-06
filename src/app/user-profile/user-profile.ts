import { Component, OnInit, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { FetchApiData } from '../fetch-api-data';
import { ConfirmDialog } from '../confirm-dialog/confirm-dialog';
import { UpdateUserProfile } from '../update-user-profile/update-user-profile';


/**
 * UserProfile component displays user's details, favorite movies, allows users to:
 * edit their profile, log out, delete their account.
 */
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

@Injectable({ providedIn: 'root'})

export class UserProfile implements OnInit {
  /** Currently logged-in user object */
  user: any = {};

  /** Array of the user's favorite movie IDs */
  favMovies: any[] = [];

  /**
   * Injects next services:
   * @param fetchApiData - Service for handling API requests.
   * @param snackBar - Angular Material's snackbar feeback message for users.
   * @param dialog - Service that provide opening other dialogs.
   * @param router - Angular Router for navigation.
   * @param CDR - ChangeDetectorRef used to manually run the change detection and update the view (UI) after data changes.
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public fetchApiData: FetchApiData,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
    private CDR: ChangeDetectorRef,
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   * Initializes the component by fetching the user data.
   */
  ngOnInit(): void {
    // this.getUser();
    if (isPlatformBrowser(this.platformId)) {
      this.getUser(); // Runs only in browser
    }
  }

  /**
   * Function to fetch and render user's favorite movies, 
   * by firrst fetching all movies from backend and 
   * then comparing IDs from the user object with the full list of movies from the API.
   * On failure it throws an error message to the user.
   */
  getFavMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      const favMoviesIDs = this.user.favoriteMovies || [];              // Extract user's list of favorite movie IDs drom the user object. If 'favoriteMovies' doesn't exist (null/undefined) returns empty array. 
      this.favMovies = res.filter((movie: any) => favMoviesIDs.includes(movie._id));               // Filter list of all movies ('res') that include just movies with ID that are located in user's list of favorites.
      this.CDR.detectChanges();
    }, (error) => {
      this.snackBar.open('Fetching favorite movies failed: ' + error, 'OK', { duration: 2000 });
    });
  }

  getLocalStorageUser(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('user')?.replace(/^"|"$/g, '') || null;
    }
    return null;
  }

  /**
   * Function to fetch and render all data about current user using his username from localStorage,
   * and update the view with that data.
   */
  getUser(): void {
    // Prevent any execution if not in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');      // .replace(/^"|"$/g, '') removes quotes from string in localStorage.
    const username = this.getLocalStorageUser();
    if (!username) {
      this.snackBar.open('User not found in local storage', 'OK', { duration: 2000 });
      return;
    }

    this.fetchApiData.getUser(username).subscribe((res) => {
      this.user = res;          // 'res' user data returned from the server
      this.getFavMovies();       // Load user's favorite movies 
      this.CDR.detectChanges(); 
      // console.log(this.user);
      return this.user;
    });
  }

/**
 * Function to open EditDialog to allow user to update/edit his data,
 * and update user data if dialog returns updated data.
 */
  openEditDialog(): void {
    const dialogRef = this.dialog.open(UpdateUserProfile, {
      width: '480px',
      data: { ...this.user }
    });

    dialogRef.afterClosed().subscribe((updated) => {
      // if (updated) this.getUser();
      if (updated && isPlatformBrowser(this.platformId)) {
        this.getUser();
      }
    });
  }

/**
 * Function to delete user account, by opening confirmation dialog.
 * If from user confirmed, account will be deleted, feedback message sent to the user,
 * localStorage cleared and user navigated to the 'welcome' screen.
 * On failure user gets error message.
 */
  deleteUserAccount(): void {
    // const username = localStorage.getItem('user');
    // Prevent any execution if not in browser
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');      // .replace(/^"|"$/g, '') removes quotes from string in localStorage.
    const username = this.getLocalStorageUser();
    if (!username) return;

    const dialogRef = this.dialog.open(ConfirmDialog, { 
      width: '480px',
      data: { message: 'Are you sure you want to delete your accournt? This action cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.fetchApiData.deleteUser(username).subscribe(() => {
          this.snackBar.open('Account deleted successfully', 'OK', { duration: 2000 });
          // localStorage.clear();
          if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
          }
          this.router.navigate(['welcome']);
        }, (error) => {
          this.snackBar.open('Deleting account failed: ' + error, 'OK', { duration: 2000 });
        });
      }
    });
  }

  /**
   * Function to log out user, clear localStorage, show feedback message to the user
   * and navigate to the 'welcome' screen.
   */
  logoutUser(): void {
    // localStorage.removeItem('user');
    // localStorage.removeItem('token');
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
    this.snackBar.open('User logged out successfully!', 'OK', { duration: 2000 });
    this.router.navigate(['welcome']);
  }
}
