/**
 * The DeleteUserFormComponent is used to delete the user data after user confirmation.
 * @module DeleteUserFormComponent
 */


import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user-form',
  templateUrl: './delete-user-form.component.html',
  styleUrls: ['./delete-user-form.component.scss']
})
export class DeleteUserFormComponent implements OnInit {
  username: any = localStorage.getItem('user');
  user: any = JSON.parse(this.username);
  
  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteUserFormComponent>,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * function to delete a user
   * @function deleteUser
   * @returns delete status and reroutes to welcome page 
   */
  deleteUser(): void {
    if (confirm('Are you sure? This cannot be undone.')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open(`${this.user.Username} has been removed!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
