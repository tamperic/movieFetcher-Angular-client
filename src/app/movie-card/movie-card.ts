import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ChangeDetectorRef } from '@angular/core';
import { MovieDetails } from '../movie-details/movie-details';

/**
 * Movie-card component that displays data about one particular movie (title, image, director)
 * and two buttons: 'heart-icon' to add movies to or remove it from the favorties
 * and 'Open' button to open a dialog that provides more details about that particular movie.
 */
@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  standalone: true,
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})


export class MovieCard implements OnInit {
  /** Array of all movies fetched from the API */
  movies: any[] = [];

  /** Currently logged-in user object */
  user: any = {};

  /** Array of the user's favorite movie IDs */
  favMovies: any[] = [];

  /**
   * Create instance of MovieCard component and inject required services.
   * @param fetchApiData - Service for handling API requests.
   * @param snackBar - Angular Material's snackbar feeback message for users.
   * @param dialog - Service that provide opening other sub-dialogs.
   * @param CDR - ChangeDetectorRef used to manually run the change detection and update the view (UI) after data changes.
   */
  constructor(
    public fetchApiData: FetchApiData,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private CDR: ChangeDetectorRef,
  ) {}


  /**
   * Angular lifecycle hook called after component initialization.
   * Initializes the component by fetching the list of movies and user data.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  /**
   * Function to fetch all movies and update local movie list.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.CDR.detectChanges(); //  Run change detection and update the view (UI) after data changes.
      console.log(this.movies);
      this.getUser(); // Update user data 
      return this.movies;
    });
  }

  /**
   * Function to fetch user data by username from localStorage
   * and to filter the movie list and update the user's list of favorites.
   * @returns user object
   */
  getUser(): void {
    const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');      // .replace(/^"|"$/g, '') removes quotes from string in localStorage.

    if (!username) {
      this.snackBar.open('User not found in local storage', 'OK', { duration: 2000 });
      return;
    }

    this.fetchApiData.getUser(username).subscribe((res) => {
      this.user = res;
      const favMoviesIDs = res.favoriteMovies || [];
      this.favMovies = this.movies.filter(movie => favMoviesIDs.includes(movie._id));
      this.CDR.detectChanges();
      // console.log(this.user);
      return this.user;
    });
  }

  /**
   * Function to check whether a certain movie (movieID) is added to the list of user's favorites or not. 
   * @param movieID - The unique ID of certain movie.
   * @returns 'true' if movie is already in list of favorite or 'false' if it's not.
   */
  isFavorite(movieID: string): boolean {
    return this.favMovies.some(movie => movie._id === movieID);
  }

  /**
   * Function to add a certain movie to the user's list of favorites and update the user object.
   * @param movieID - The unique ID of certain movie to add.
   */
  addFavorite(movieID: string): void {
    const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');
    if (!username) return;

    this.fetchApiData.addFavMovie(username, movieID).subscribe(() => {
      this.getUser();
      this.snackBar.open('The movie added to favorites!', 'OK', { duration: 2000 });
      this.CDR.detectChanges();
    });
  }

  /**
   * Function to remove a certain movie from the user's list of favorites and update the user object.
   * @param movieID - The unique ID of certain movie to remove.
   */
  removeFavorite(movieID: string): void {
    const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');  
    if (!username) return;

    this.fetchApiData.deleteFavMovie(username, movieID).subscribe(() => {
      this.getUser();
      this.snackBar.open('The movie removed from favorites!', 'OK', { duration: 2000 });
      this.CDR.detectChanges();
    });
  }

  /**
   * Function to add a movie to the favorite list if it's not added,
   * otherwise removes it from the list if it's already added.
   * @param movieID - The unique ID of certain movie.
   */
  toggleFavorite(movieID: string): void {
    if (this.isFavorite(movieID)) {
      this.removeFavorite(movieID);
    } else {
      this.addFavorite(movieID);
    }
  }

  /**
   * Function to open MovieDetails dialog to show more information about a certain movie
   * and update user data after closing dialog.
   * @param movie - Movie object to display inside dialog.
   */
  openMovieDetailsDialog(movie: any): void {
    const dialogRef = this.dialog.open(MovieDetails, {
      width: '600px',
      data: { movie }
    });

    dialogRef.afterClosed().subscribe((updated) => {
      if (updated) this.getUser();
    });
  }
}
