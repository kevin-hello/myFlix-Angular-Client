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
   * @function getAllMovies
   * @return movies in json format
   */
  getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

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
   * Open the director component to view info
   * @param Director
    */
  openDirectorDialog(Director: any): void {
    this.dialog.open(MovieDirectorComponent, {
      width: '400px',
      data: { Director },
    });
  }

  /**
   * Open the genre component to view info
   * @param Genre  
    */
  openGenreDialog(Genre: any): void {
    this.dialog.open(MovieGenreComponent, {
      width: '400px',
      data: { Genre },
    });
  }

  openDescriptionDialog(Description: any): void {
    this.dialog.open(MovieDescriptionComponent, {
      width: '400px',
      data: { Description },
    });
  }
/**
   * use API endpoint to let user add favorite movie
   * @function addFavoriteMovies
   * @param movieId 
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
/**
   * use API endpoint to let user delete favorite movie
   * @function deleteFavoriteMovies
   * @param movieId 
   * 
   */
  deleteFavoriteMovie(movieId: string, Title: string): void {
    console.log(movieId);
      this.fetchApiData.deleteFavMovie(movieId).subscribe((response: any) => {
      console.log(response);
      this.snackBar.open(`${Title} has been added to your favorites`, 'OK', {
        duration: 2000
      });
      });
    }

}