import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

const endpoint = 'http://192.168.56.139:8080/api/';
//const endpoint = 'http://localhost:8080/api/';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
    })
};

@Injectable({
  providedIn: 'root'
})
export class CinemaRestService {

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }


  getMovies(): Observable<any> {
    return this.http.get(endpoint + 'movies/', httpOptions).pipe(
      map(this.extractData));
  }

  getMoviesById(id): Observable<any>  {
    return this.http.get(endpoint + 'movies/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  getShowtimeById(id): Observable<any>  {
    return this.http.get(endpoint + 'showtime/' + id, httpOptions).pipe(
      map(this.extractData));
  }

  getShowtimesByMovieIdAndDate(id, date): Observable<any>  {
    date = date.toISOString();
    return this.http.post(endpoint + 'showtime/search?movieId=' + id + '&date=' + date, httpOptions).pipe(
        map(this.extractData));
  }

  addBookings(booking, noOfTickets): Observable<any> {
    return this.http.post<any>(endpoint + 'booking?noOfTickets=' + noOfTickets, JSON.stringify(booking), httpOptions).pipe(
      tap((booking) => console.log(`added product w/ id=${booking.id}`)),
      catchError(this.handleError('addBooking'))
    );
  }

  getReservations(username): Observable<any>  {
    console.log("username:: "+username);
    return this.http.post<any>(endpoint + 'booking/search?username=' + username, httpOptions).pipe(
      map(this.extractData));
  }

  SearchShowtimesByMoviesByIdAndDate(id, date): Observable<any>  {
    return this.http.post(endpoint + 'showtime/search?movieId=' + id + '&date=' + date, httpOptions).pipe(
      map(this.extractData));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
