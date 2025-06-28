import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    Navbar
  ],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})


export class App {
  protected title = 'movieFetcher-Angular-client';
}
