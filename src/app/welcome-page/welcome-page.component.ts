/**
 * The WelcomePageComponent is the first page you see. Here you have the option to register or login.
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  /**
   * open dialog to display the registration form
   * @module UserRegistrationFormComponent
   */
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: '500px'
    });
  }
  /**
   * open dialog to display the login form
   * @module UserLoginFormComponent
   */
  openUserLoginDialog(): void {
      this.dialog.open(UserLoginFormComponent, {
        width: '500px'
      });
    }
  }