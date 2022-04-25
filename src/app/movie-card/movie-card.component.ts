/**
 * The Moviecard component renders the movies collection retreived from the myFlix database.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

//Components 
import { MovieDirectorComponent } from '../movie-director/movie-director.component';
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDescriptionComponent } from '../movie-description/movie-description.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  Directors: any[] = [];

    constructor(
      public fetchApiData: FetchApiDataService,
      public dialog: MatDialog,
      public snackBar: MatSnackBar,
     ) {}
  
    ngOnInit(): void {
      this.getMovies();
      this.getUserInfo();
    }
  /**
   * use Api call to get data of all movies
   * @function getMovies
   * @return movies in json format
   */
  getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
  /**
   * use Api call to get user data
   * @function getUserInfo
   * @return user data in json format
   */
  getUserInfo(): void{
    const username = localStorage.getItem('user');
    this.fetchApiData.getUser(username).subscribe((resp: any) => {
       
      console.log(resp)
       const userInfo=resp.Username
       console.log(userInfo)
       const userFaves=resp.FavoriteMovies
       console.log(userFaves)
 
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
/**
   * use API endpoint to let user add favorite movie
   * @function addFavoriteMovies
   * @param movieId {string}
   * @param Title {string}
   * @returns an array of the movie object in json format
   */
 addFavoriteMovies(movieId: string, Title: string): void {
   console.log(movieId);
   const token = localStorage.getItem('token');
   console.log(token);
   const username = localStorage.getItem('user');
   console.log(username);
  this.fetchApiData.addFavMovie(movieId).subscribe(
    (response: any) => {
      console.log(response);
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 2000
      });
      this.ngOnInit();
    });
        }

}