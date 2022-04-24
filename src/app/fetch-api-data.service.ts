import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

const apiUrl = 'https://my-flix-movies-app.herokuapp.com/';

const token = localStorage.getItem('token');
const username = localStorage.getItem('user');
@Injectable({
  providedIn: 'root',
})

export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
  This will provide HttpClient to the entire class, making it available via this.http
   * @param http 
   */
  constructor(private http: HttpClient) {}

/**
 * call API endpoint to register a new user
 * @function userRegistration
 * @param userDetails 
 * @returns a new user object in JSON format
 */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post<any>(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint for user login
 * @function userLogin
 * @param userDetails 
 * @returns a users' data in JSON format
 */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }
/**
 * calls API endpoint to get all movies
 * @function getAllMovies
 * @returns an array of the movies object in JSON format
 */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint for getting a single movie 
 * @function getOneMovie
 * @param Title 
 * @returns a movie object in JSON format
 */
  public getOneMovie(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies'+ Title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls the API endpoint to get director info by his*her name
 * @function getDirector
 * @param Name 
 * @returns directors' data in JSON format
 */
  public getDirector(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'directors' + Name, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint to get Genre data by its name
 * @function getGenre
 * @param Name 
 * @returns genre data in JSON format
 */
  public getGenre(Name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'genres' + Name , {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
 * calls API endpoint to add a movie to a users' favorite movie list
 * @function addFavMovie
 * @param movieId 
 * @returns the updated users' favorite list in JSON format
 */
  public addFavMovie(movieId: any): Observable<any> {
     const token = localStorage.getItem('token');
     const username = localStorage.getItem('user');
    return this.http
      .post(apiUrl + `users/${username}/movies/${movieId}`, {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          })}).pipe(
            map(this.extractResponseData), 
            catchError(this.handleError));
  }

/**
 * calls API endpoint to delete a movie from the users' favorite list
 * @function deleteFavMovie
 * @param movieId 
 * @returns updated user info after removal of a fav movie
 */
  public deleteFavMovie(movieId: any): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http.delete(apiUrl + `users/${username}/movies/${movieId}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * calls API endpoint to get a users' data 
 * @function getUser
 * @param Username 
 * @returns user data in JSON format
 */
 public getUser(Username: any): Observable<any> {
  const token = localStorage.getItem('token');
  return this.http
    .get(apiUrl + `users/${Username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(map(this.extractResponseData), catchError(this.handleError));
}


/**
 * call API endpoint to edit user info
 * @param userDetails 
 * @returns updated user information in JSON format
 */
 public editUser(userDetails: any): Observable<any> {
  console.log(userDetails);
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
    .put(apiUrl + `users/${username}`, userDetails, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

/**
 * call API endpoint to delete a user
 * @function deleteUser
 * @param userDetails 
 * @returns delete status
 */
 public deleteUser(): Observable<any> {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('user');
  return this.http
    .delete(apiUrl + `users/${username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


// non-typed response extraction
private extractResponseData(data: any | Object): any {
  return data || {};
}

/**
 * Error function
 * @function handleError
 * @param error 
 * @returns error call 
 */
private handleError(error: HttpErrorResponse): any {
  if (error.error instanceof ErrorEvent) {
    console.error('Some error occured:', error.error.message);
  } else {
    console.error(
      `Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(() =>
      'Something went wrong; please try again later.');
  }
}