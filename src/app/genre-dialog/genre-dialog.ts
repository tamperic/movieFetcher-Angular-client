import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


/**
 * Genre dialog component that gets genre object via Angular MAterial's 'MAT_DIALOG_DATA' injection token.
 * Displays more details about certain movie genre (name and description) 
 * and 'Close' button to close the dialog.
 */
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
  /**
   * The injected data object that contains Genre details (name and description).
   * 
   * @param data - Genre data passed to the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
