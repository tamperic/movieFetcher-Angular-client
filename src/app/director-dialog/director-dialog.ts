import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-director-dialog',
  standalone: true,
  imports: [
    CommonModule, 
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './director-dialog.html',
  styleUrl: './director-dialog.scss'
})


export class DirectorDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
