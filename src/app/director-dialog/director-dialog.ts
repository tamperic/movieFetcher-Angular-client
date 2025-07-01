import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


/**
 * Director dialog component that gets director object via Angular Material's 'MAT_DIALOG_DATA' injection token.
 * Displays more details about certain movie director (his name, bio, date of birth and/or death) 
 * and 'Close' button to close the dialog.
 */
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
  /**
   * The injected data object that contains director details (his name, bio, date of birth and/or death).
   * 
   * @param data - Director data passed to the dialog.
   */
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
