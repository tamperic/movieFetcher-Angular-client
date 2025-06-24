import { Component, OnInit } from '@angular/core';
import { FetchApiData } from '../fetch-api-data';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss'
})
export class MovieCard {
  movies: any[] = [];
  constructor(public fetchApiData: FetchApiData) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      console.log(this.movies);
      return this.movies;
    });
  }
}
