import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { DirectorDialog } from '../director-dialog/director-dialog';
import { GenreDialog } from '../genre-dialog/genre-dialog';


/**
 * Movie-details component that displays more data/details about one particular movie 
 * (title, image, director, genre, actors, year of release, rating, duration)
 * and two '(Read more)' buttons after director and genre names that after clicking on them will open
 * sub-dialogs to see more details about director or genre.
 */
@Component({
  selector: 'app-movie-details',
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  standalone: true,
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})


export class MovieDetails implements OnInit {
  /** Movie object passed via dialog data - (MAT_DIALOG_DATA) injection */
  movie: any;

  /**
   * Injects service and data into the component.
   * @param data - Data passed to dialog.
   * @param dialogRef - Reference to the Moviedetails dialog to handle when the dialog is opened.
   * @param dialog - Service that provide opening other sub-dialogs.
   */
  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieDetails>,
    public dialog: MatDialog
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   * It assigns movie data passed to the dialog to the local 'movie' property.
   */
  ngOnInit(): void {
    this.movie = this.data.movie;
  }

  /**
   * Function to open director sub-dialog for additional details about certain movie director
   * and to close the dialog.
   */
  openDirectorDialog(): void {
    const dialogRef = this.dialog.open(DirectorDialog, {
      width: '600px',
      data: this.movie.director
    });
    this.dialogRef.close();
  }

   /**
   * Function to open genre sub-dialog for additional details about certain movie genre
   * and to close the dialog.
   */
  openGenreDialog(): void {
    const dialogRef = this.dialog.open(GenreDialog, {
      width: '600px',
      data: this.movie.genre
    });
    this.dialogRef.close();
  }
}