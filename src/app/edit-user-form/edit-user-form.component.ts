/**
 * The EditUserFormComponent is used to render information about the user and edit it.
 * @module EditUserFormComponent
 */

import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-user-form',
  templateUrl: './edit-user-form.component.html',
  styleUrls: ['./edit-user-form.component.scss']
})
export class EditUserFormComponent implements OnInit {
  Username = localStorage.getItem('user');
  user: any = {};

  /**
   *  Binding input values to the userProfile object
   */
  @Input() userDetails = { 
    Username: this.user.Username,
    Password: this.user.Password,
    Email: this.user.Email,
    Birthday: this.user.Birthday
  }
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserFormComponent>,
    public snackBar: MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * function to get user info
   * @function getUser
   * @param user {any}
   * @returns user info
   */
   getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user
    });
  }

  /**
   * function to edit user info
   * @function editUser
   * @param userDetails {any}
   * @param Username
   * @returns updated user info in JSON format + storage in localStorage
   */
  editUser(): void {
    this.fetchApiData.editUser(this.userDetails).subscribe((resp) => {
      this.dialogRef.close();
      localStorage.setItem('user', resp.Username);
      this.snackBar.open('Your profile info was updated successfully.', 'OK', {
        duration: 2000
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
