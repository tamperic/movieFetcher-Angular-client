import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { FetchApiData } from '../fetch-api-data';
import { DirectorDialog } from '../director-dialog/director-dialog';
import { GenreDialog } from '../genre-dialog/genre-dialog';

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
  movie: any;

  constructor (
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MovieDetails>,
    public dialog: MatDialog,
    private fetchApiData: FetchApiData,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.movie = this.data.movie;
  }

  openDirectorDialog(): void {
    const dialogRef = this.dialog.open(DirectorDialog, {
      width: '600px',
      data: this.movie.director
    });
    this.dialogRef.close();
  }

  openGenreDialog(): void {
    const dialogRef = this.dialog.open(GenreDialog, {
      width: '600px',
      data: this.movie.genre
    });
    this.dialogRef.close();
  }
}