import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-genre-dialog',
  imports: [
    CommonModule, 
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './genre-dialog.html',
  styleUrl: './genre-dialog.scss'
})

export class GenreDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
