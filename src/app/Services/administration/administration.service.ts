import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { BookingMaster } from '../../Models/bookingmaster.model';
import { GlobalconfigurationService } from '../globalconfiguration.service';
import { map, catchError, mergeMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private globalConfigurationService : GlobalconfigurationService,
    private http: HttpClient) { }

getAllAllocations():  Observable<any[]> {
    return this.http.get<any[]>(this.globalConfigurationService.administration_getall ).pipe(catchError(this.errorHandler));
 
}

submitNewAllocation(bookingMaster: any) {
  const httpHeaders = new HttpHeaders();
  // Note: Add headers if needed (tokens/bearer)
  httpHeaders.set('Content-Type', 'application/json');
        return this.http.post(this.globalConfigurationService.administration_postallocations, bookingMaster, { headers: httpHeaders})
        .pipe(catchError(this.errorHandler));
}

checkAvailability(bookingMaster: any) {
  const httpHeaders = new HttpHeaders();
  // Note: Add headers if needed (tokens/bearer)
  httpHeaders.set('Content-Type', 'application/json');
        return this.http.post(this.globalConfigurationService.administration_checkAvailability, bookingMaster, { headers: httpHeaders})
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



