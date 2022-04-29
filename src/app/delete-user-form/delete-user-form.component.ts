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
  Username = localStorage.getItem('user');
  user: any = {};
  
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
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your account was deleted', 'OK', {duration: 6000});
      });
      this.dialogRef.close();
      this.router.navigate(['welcome'])
      this.fetchApiData.deleteUser().subscribe(() => {
        localStorage.clear();
      });
    }
  
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
