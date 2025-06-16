import { Injectable } from '@angular/core'; // '@Injectable' decorator is a function that augments a piece of code (another function or class).
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs'; // RxJS - reactive programming library for JavaScript


// Declare the API URL that will provide data for the client app
const apiUrl = 'https://movie-fetcher-5a8669cd2c54.herokuapp.com/';

// Tell Angular that this service is available everywhere. This is a way of scoping services.
@Injectable({
  providedIn: 'root'
})

export class FetchApiData {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) { 
    // this.http = http;
  }


  /*   ** PRIVATE HELPER METHODS: **   */

  // GET JWT TOKEN from localStorage & add it to HTTP REQUEST HEADERS as Bearer token for authorization
  private createAuthHeader(): HttpHeaders {
    // Fetch the JWT token from browser localStorage
    const token = localStorage.getItem('token');
    // Create new HttpHeaders object, and set authorization for securing API endpoints
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  // Non-typed RESPONSE EXTRACTION
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  // ERROR HANDLING
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occured: ', error.error.message);
    } else {
      console.error(`Error Status code ${error.status}, ` + 
        `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happend. Please try again later.');
  }



  /*   ** PUBLIC HELPER METHODS: **   */

  // Make the API call for the USER REGISTRATION endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // API call for the USER LOGIN endpoint
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // GET ALL MOVIES
  public getAllMovies(): Observable<any> {
    return this.http.get(apiUrl + 'movies', {headers: this.createAuthHeader()}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }


  // GET ONE MOVIE by title
  public getMovie(movieTitle: string): Observable<any>{
    return this.http.get(apiUrl + `movies/${movieTitle}`, {headers: this.createAuthHeader()}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // GET DIRECTOR by name
  public getDirector(dirName: string): Observable<any>{
    return this.http.get(apiUrl + `movies/director/${dirName}`, {headers: this.createAuthHeader()}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // GET data about GENRE by name
  public getGenre(ganreName: string): Observable<any>{
    return this.http.get(apiUrl + `movies/genre/${ganreName}`, {headers: this.createAuthHeader()}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // GET data about USER by username
  public getUser(username: string): Observable<any>{
    return this.http.get(apiUrl + `users/${username}`, {headers: this.createAuthHeader()}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // GET list of FAVORITE MOVIES
  public getFavMovies(username: string, ): Observable<any>{
    return this.http.get(apiUrl + `users/${username}/favMovies`, {headers: this.createAuthHeader()}
    ).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }

  // ADD MOVIE to the list of FAVORITES
  public addFavMovie(username: string, movieID: string): Observable<any>{
    return this.http.post(apiUrl + `users/${username}/movies/${movieID}`, {headers: this.createAuthHeader()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  // EDIT (UPDATE) USER data
  public editUser(username: string, newUserDetails: any): Observable<any>{
    return this.http.put(apiUrl + `users/${username}`, newUserDetails, {headers: this.createAuthHeader()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  // DELETE USER - deregister
  public deleteUser(username: string): Observable<any>{
    return this.http.delete(apiUrl + `users/${username}`, {headers: this.createAuthHeader()}
    ).pipe(
      catchError(this.handleError)
    )
  }

  // REMOVE MOVIE from the list of FAVORITES
  public deleteFavMovie(username: string, movieID: string): Observable<any>{
    return this.http.delete(apiUrl + `users/${username}/mvoies/${movieID}`, {headers: this.createAuthHeader()}
    ).pipe(
      catchError(this.handleError)
    )
  }

}
