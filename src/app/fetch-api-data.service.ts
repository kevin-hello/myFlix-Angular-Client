import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


const apiUrl = 'https://bestmoviecentral.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {

  constructor(private http: HttpClient, private router: Router) {
  }

  //POST user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  //POST user login endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }
  //GET all movies endpoint
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //GET one movie by title endpoint 
  public getMovies(movieTitle: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //GET director endpoint 
  public getDirector(directorName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'Director' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //GET genre endpoint
  public getGenre(genreName: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //GET user endpoint
  public getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //GET fav movie for a user
  public getFavMovie(userDetails: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users' + userDetails + 'movies' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }
  //POST add movie to favorites
  public addFavMovie(userDetails: any, movieId: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users',userDetails + 'movies', movieId)
      .pipe(catchError(this.handleError));
  }
  //PUT edit user endpoint
  public editUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .put(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
   //DELETE user endpoint
   public deleteUser(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .delete(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }
  //DELETE fav movie
  public deleteFavMovie(userDetails: any, movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users' + userDetails + 'movies' + movieId)
      .pipe(catchError(this.handleError));
  }

  // Non-typed response extraction
  private extractResponseData(data: any | Object): any {
    return data || {};
  }

  //handle error function 
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error status code ${error.status},` + `Error body is: ${error.error}`
      );
    }
    return throwError('something bad happened; please try again later.');
  }
}