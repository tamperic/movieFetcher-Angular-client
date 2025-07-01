import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


/**
 * Confirmation dialog component.
 * Contains a message and two buttons: 'Confirm' to confirm to delete user account and 'Cancel' to cancel deletion user account.
 * Returns 'true' if confirmed, and 'false' if canceled.
 */
@Component({
  selector: 'app-confirm-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  standalone: true,
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.scss'
})

export class ConfirmDialog {
  /**
   * Create an instance of ConfirmDialog.
   * 
   * @param dialogRef - Reference to the dialog opened.
   * @param message - Message displayed in confirmation dialog.
   */
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public message: string
  ) {}

  /**
   * Angular lifecycle hook called after component initialization.
   */
  ngOnInit(): void {  }

  /**
   * Function to confirm, called when user clicks 'Confirm' button.
   * It returns 'true' and closes the dialog.
   */
  onConfirm(): void {
    this.dialogRef.close(true);
  }

   /**
   * Function to cancel confirm, called when user clicks 'Cancel' button.
   * It returns 'false' and closes the dialog.
   */
  onCancel(): void {
    this.dialogRef.close(false);
  }
}
