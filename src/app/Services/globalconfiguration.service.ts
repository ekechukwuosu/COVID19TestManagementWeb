import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GlobalconfigurationService {

  readonly API_URL = 'https://localhost:44373/api/';

  //Administration Endpoints
  readonly administration_getall = `${this.API_URL}Administration/GetAll`;  
  readonly administration_postallocations = `${this.API_URL}Administration/AddAllocation`;
  readonly administration_checkAvailability = `${this.API_URL}Administration/CheckAvailability`;
  
  //Location Endpoints
  readonly administration_getlocations = `${this.API_URL}Locations/GetAllLocations`;

  //Booking Endpoints
  readonly booking_getall = `${this.API_URL}CovidTest/GetAll`;
  readonly booking_postnewbooking = `${this.API_URL}CovidTest/BookTest`;
  readonly booking_postcancelbooking = `${this.API_URL}CovidTest/CancelTest/`;
  readonly booking_posttestresult = `${this.API_URL}CovidTest/UploadResult/`;
 
  //Reporting Endpoints
  readonly reporting_getreports = `${this.API_URL}Reporting/GetReports`;

  swalInfo(message: any, header: any){

       
    Swal.fire({
      title: header,
      text: message,
      icon: 'info',
      confirmButtonText: 'Cool'
    })

}

swalSuccess(message: any, header: any){

 
    Swal.fire({
      title: header,
      text: message,
      icon: 'success',
      confirmButtonText: 'Cool',
      
    })

}

swalError(message: any, header: any){

    Swal.fire({
      title: header,
      text: message,
      icon: 'error',
      confirmButtonText: 'Cool',
      
    })

}
}
