import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'BnaC';

  constructor(private dialog: MatDialog) {}

  openConfirmationDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to do this?' } // Adjust the message as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the confirmed action here
        console.log('User confirmed');
      } else {
        // Handle the canceled action here
        console.log('User canceled');
      }
    });
  }
}
