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
  movies: any[] = [];
  user: any = {};
  favMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiData,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private CDR: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getUser();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.CDR.detectChanges(); //  Run change detection and update the view after data changes 
      console.log(this.movies);
      this.getUser();
      return this.movies;
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
      const favMoviesIDs = res.favoriteMovies || [];
      this.favMovies = this.movies.filter(movie => favMoviesIDs.includes(movie._id));
      this.CDR.detectChanges();
      console.log(this.user);
      return this.user;
    });
  }

  isFavorite(movieID: string): boolean {
    return this.favMovies.some(movie => movie._id === movieID);
  }

  addFavorite(movieID: string): void {
    const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');
    if (!username) return;

    this.fetchApiData.addFavMovie(username, movieID).subscribe(() => {
      this.getUser();
      this.snackBar.open('The movie added to favorites!', 'OK', { duration: 2000 });
      this.CDR.detectChanges();
    });
  }

  removeFavorite(movieID: string): void {
    const username = localStorage.getItem('user')?.replace(/^"|"$/g, '');
    if (!username) return;

    this.fetchApiData.deleteFavMovie(username, movieID).subscribe(() => {
      this.getUser();
      this.snackBar.open('The movie removed from favorites!', 'OK', { duration: 2000 });
      this.CDR.detectChanges();
    });
  }

  toggleFavorite(movieID: string): void {
    if (this.isFavorite(movieID)) {
      this.removeFavorite(movieID);
    } else {
      this.addFavorite(movieID);
    }
  }

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
