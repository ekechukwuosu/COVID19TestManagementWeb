import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GlobalconfigurationService } from '../globalconfiguration.service';
@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private globalConfigurationService : GlobalconfigurationService,
    private http: HttpClient) { }

    getAllTestBookings():  Observable<any[]> {
      return this.http.get<any[]>(this.globalConfigurationService.booking_getall ).pipe(catchError(this.errorHandler));
   
  }

  submitBooking(booking: any) {
    const httpHeaders = new HttpHeaders();
    // Note: Add headers if needed (tokens/bearer)
    httpHeaders.set('Content-Type', 'application/json');
          return this.http.post(this.globalConfigurationService.booking_postnewbooking, booking, { headers: httpHeaders})
          .pipe(catchError(this.errorHandler));
  }

  cancelBooking(booking: any) {
    const httpHeaders = new HttpHeaders();
    // Note: Add headers if needed (tokens/bearer)
    httpHeaders.set('Content-Type', 'application/json');
          return this.http.patch(`${this.globalConfigurationService.booking_postcancelbooking}${booking.id}`, {headers: httpHeaders})
          .pipe(catchError(this.errorHandler));
  }

  updateTestResult(id: any, result: any) {
    const httpHeaders = new HttpHeaders();
    // Note: Add headers if needed (tokens/bearer)
    httpHeaders.set('Content-Type', 'application/json');
          return this.http.patch(`${this.globalConfigurationService.booking_posttestresult}${id}/${result}`, {headers: httpHeaders})
          .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: HttpErrorResponse) {
    debugger;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
  
}
