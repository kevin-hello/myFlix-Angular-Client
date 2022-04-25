/**
 * The UserLoginFormComponent is used to login users.
 * @module UserLoginFormComponent
 */

// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  /**
   * get input info and store it in userData
   */
  @Input() userData = { Username: '', Password: '' };

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router) { }

ngOnInit(): void {
}

/**
   * Login user via input field by using API endpoint
   * And store the users data in localstorage
   * @function userLogin
   * @param userData {object}
   * @return users data in json format
   */
loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
    console.log(result);   
    localStorage.setItem('user', result.user.Username);
    localStorage.setItem('token', result.token);
    this.dialogRef.close(); // This will close the modal on success!
    this.snackBar.open('user login successful', 'OK', {
      duration: 2000
     });
     this.router.navigate([ 'movies' ]);
    }, (result) => {
      console.log(result);
      this.snackBar.open('user login failed', 'OK', {
        duration: 2000
      });
    });
  }

  }
