/**
 * The ProfilePageComponent is used to view the user profile.
 * @module ProfilePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from '../fetch-api-data.service';
import { EditUserFormComponent } from '../edit-user-form/edit-user-form.component';
import { DeleteUserFormComponent } from '../delete-user-form/delete-user-form.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  Username: any = localStorage.getItem('user');
  favs: any = null;
  FavMovies: any[] = [];
  displayElement: boolean = false;

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router

  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * calls API endpoint to get user info
   * @function getUser
   * @param user {any}
   * @return user data in JSON format including user's favorite movies array
   */
   getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        this.FavMovies = resp.FavoriteMovies;
        this.displayElement = true;
      });
    }
  }


 /**
   * use API endpoint to let user delete favorite movie
   * @function deleteFavoriteMovies
   * @param movieId {string}
   * @param Title {string}
   * @returns updated users data in json format
   */
  deleteFavMovie(movieId: string, Title: string): void {
      this.fetchApiData.deleteFavMovie(movieId).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(`${Title} has been removed from your favorites`, 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
      return this.favs;
      });
    }

  /**
   * open dialog to display the edit user form
   * @module EditUserFormComponent
   */
  openUserEditDialog(): void {
    this.dialog.open(EditUserFormComponent, {
      panelClass: 'custom-dialog-container',
      width: 'max-content'
    });
  }

  /**
   * open dialog to display the delete user form
   * @module DeleteUserFormComponent
   */
  openUserDeleteDialog(): void {
    this.dialog.open(DeleteUserFormComponent, {
      panelClass: 'custom-dialog-container',
      width: 'max-content'
    });
  }

   /**
   * open dialog to display the genre info
   * @module MovieGenreComponent
   * @param Genre {any}
   */
    openGenreDialog(Genre: any): void {
      this.dialog.open(MovieGenreComponent, {
        width: '400px',
        data: { Genre },
      });
    }
  /**
   * open dialog to display the Director info
   * @module MovieDirectorComponent
   * @param Director {any}
   */
   openDirectorDialog(Director: any): void {
    this.dialog.open(MovieDirectorComponent, {
      width: '400px',
      data: { Director },
    });
  }
  
  /**
   * open dialog to display the movie description info
   * @module MovieDescriptionComponent
   * @param Description {any}
   */
 openDescriptionDialog(Description: any): void {
  this.dialog.open(MovieDescriptionComponent, {
    width: '400px',
    data: { Description },
  });
} 

}
