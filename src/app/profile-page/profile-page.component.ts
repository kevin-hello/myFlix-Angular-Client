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
  FavMovies: any[] = [];
  displayElement: boolean = false

  constructor(
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavMovie();
  }

  /**
   * calls API endpoint to get user info
   * @function getUser
   * @param Username
   * @return user data in JSON format
   */
  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser(user).subscribe((resp: any) => {
        this.user = resp;
        console.log(this.user);
      });
    }
  }

/**
 * function to let the user display their favorite movies 
 * @function getAllMovies
 */  
  getFavMovie(): void {
    let movies: any[] = [];
    const user = localStorage.getItem('user');
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      movies = resp;
      movies.forEach((movie: any) => {
        if (this.user.FavoriteMovies.includes(movie._id)) {
          this.FavMovies.push(movie);
          this.displayElement = true;
        }
      });
    });
    console.log(this.FavMovies);
  }
  

  /**
   * function to let the user remove a movie from their favorited movies
   * @function deleteFavMovie
   * @param movieId 
   * @param Title 
   * @returns updated user data in JSON format
   */
  deleteFavMovie(movieId: string, Title: string): void {
    this.fetchApiData.deleteFavMovie(movieId).subscribe((resp) => {
      console.log(resp);
      this.snackBar.open(
        `${Title} has been removed from your favorites`,
        'OK',
        {
          duration: 1000,
        }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  /**
   * dialog to edit user information
   */
  openUserEditDialog(): void {
    this.dialog.open(EditUserFormComponent, {
      panelClass: 'custom-dialog-container',
      width: 'max-content'
    });
  }

  /**
   * dialog to delete user
   */
  openUserDeleteDialog(): void {
    this.dialog.open(DeleteUserFormComponent, {
      panelClass: 'custom-dialog-container',
      width: 'max-content'
    });
  }

  /**
   * open Genre dialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(MovieGenreComponent, {
      panelClass: 'custom-dialog-container',
      data: { name, description },
      width: '500px',
    });
  }
  
  /**
   * open Director dialog
   * @param name 
   * @param bio 
   */
  openDirectorDialog(name: string, bio: string): void {
    this.dialog.open(MovieDirectorComponent, {
      panelClass: 'custom-dialog-container',
      data: {name, bio},
      width: '500px',
    });
  }
  
  /**
   * open description dialog
   * @param title 
   * @param description 
   */
  openDescriptionDialog(title: string, description: string): void {
    this.dialog.open(MovieDescriptionComponent, {
      panelClass: 'custom-dialog-container',
      data: { title, description}
    })
  }  

}
