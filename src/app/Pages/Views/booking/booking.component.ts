import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingInformation } from '../../../Models/bookingInformation.model';
import { BookingMaster } from '../../../Models/bookingmaster.model';
import { AdministrationService } from '../../../Services/administration/administration.service';
import { BookingService } from '../../../Services/booking/booking.service';
import { GlobalconfigurationService } from '../../../Services/globalconfiguration.service';
import { LocationService } from '../../../Services/location/location.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  newTestBookingForm: FormGroup;
  searchForm: FormGroup;
  alllocations: any[];
  hasFormErrors = false;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'testType', 'location', 'bookingDate', 'cancelledStatus','result', 'createDate', 'allocateResult'];
  displayedColumns1: string[] = ['id', 'firstName', 'lastName', 'location', 'bookingDate', 'cancel'];
  allTests: BookingInformation[]=[];
  test: BookingInformation[]=[];

  constructor(private bookingService: BookingService,
    private adminService: AdministrationService,
    private locationService : LocationService,
    private globalconfigurationService : GlobalconfigurationService,
    public datepipe: DatePipe,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.getLocations();
    this.initForm();
    this.getAllTests();
  }
  initForm() {
		// demo message to show
		this.newTestBookingForm = this.fb.group({		
	
      firstName:['', Validators.compose([
				Validators.required,	
			])
			],
      lastName: ['', Validators.compose([
				Validators.required,	
			])
			],
      testType: ['', Validators.compose([
				Validators.required,	
			])
			],
      location: ['', Validators.compose([
				Validators.required,	
			])
			],
      bookingDate: ['', Validators.compose([
				Validators.required,	
			])
			],
		});

    this.searchForm = this.fb.group({		
	
      firstName:['', Validators.compose([
				Validators.required,	
			])
			],
      lastName: ['', Validators.compose([
				Validators.required,	
			])
			],
		});

    
  }
  getLocations(){
    this.locationService.getAlllocations().subscribe(data =>{
      this.alllocations = data;
    });
  }
  getAllTests(){
    this.bookingService.getAllTestBookings().subscribe(data =>{
      this.allTests = data;
    });
  }
  checkAvailability(){
    debugger;
    const controls = this.newTestBookingForm.controls;
    const bookingDate = controls.bookingDate.value;
    const location = controls.location.value;

    if(bookingDate == null || bookingDate == ""){
      this.globalconfigurationService.swalInfo("Date has not been selected. Please select a Date", "Test Booking");
      return;
    }
    const _booking = new BookingInformation();
    _booking.location = location;
    _booking.bookingDate = this.datepipe.transform(bookingDate, 'yyyy-MM-dd'); 

    this.adminService.checkAvailability(_booking).subscribe(
      data => {
        debugger;
                if(data !== true){
                  this.globalconfigurationService.swalInfo(`The date selected '${this.datepipe.transform(bookingDate, 'yyyy-MM-dd')}' is not available for this location '${location}'`, "Test Booking");
                }               
                
            },
              error => {
                console.log("error ="+ error);
                  this.globalconfigurationService.swalError("Something went wrong booking your test. Try again", "Test Booking");
              });

  }
  submitTestBooking(){
    this.hasFormErrors = false;
		const controls = this.newTestBookingForm.controls;
		/** check form */
		if (this.newTestBookingForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
      this.globalconfigurationService.swalInfo("Invalid or Empty input details. Try again", "Test Booking");
			this.hasFormErrors = true;
			return;
		}
    const _booking = new BookingInformation();
    _booking.firstName = controls.firstName.value;
    _booking.lastName = controls.lastName.value;
    _booking.testType = controls.testType.value;
    _booking.location = controls.location.value;
    _booking.bookingDate = this.datepipe.transform(controls.bookingDate.value, 'yyyy-MM-dd') ;
    

    this.bookingService.submitBooking(_booking).subscribe(
      data => {
        debugger;
            if(data['message'] == "True" || data['message'] == "true")
            {
              this.globalconfigurationService.swalSuccess("You have booked your test successfully", "Test Booking");
              this.newTestBookingForm.reset();
            }else{
              this.globalconfigurationService.swalInfo(data, "Test Booking");
            }
                
                this.getAllTests();
            },
              error => {
                console.log("error ="+ error);
                this.globalconfigurationService.swalError("Something went wrong booking your test. Try again", "Test Booking");
              });
  }
  Search(){
    debugger;
    this.hasFormErrors = false;
		const controls = this.searchForm.controls;
		/** check form */
		if (this.searchForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
      this.globalconfigurationService.swalInfo("Invalid or Empty input details. Try again", "Test Booking");
			this.hasFormErrors = true;
			return;
		}
    this.test = this.allTests.filter((e) => { return e.firstName === controls.firstName.value && e.lastName == controls.lastName.value })

    if(this.test.length == 0 ){
      this.globalconfigurationService.swalInfo(`There is no booking for the name '${controls.firstName.value} ${controls.lastName.value}' Search again`, "Cancel Booking");
    }


  }
  CancelBooking(){
    this.bookingService.cancelBooking(this.test[0]).subscribe(
      data => {
        debugger;
            if(data['message'] == "True" || data['message'] == "true")
            {
              this.globalconfigurationService.swalSuccess("You have canceled your test successfully", "Cancel Booking");
              this.newTestBookingForm.reset();
              this.test = [];
            }else{
              this.globalconfigurationService.swalInfo(data, "Cancel Booking");
            }
                
                this.getAllTests();
            },
              error => {
                console.log("error ="+ error);
                this.globalconfigurationService.swalError("Something went wrong cancelling your test. Try again", "Cancel Booking");
              });
  
  }
  positiveResult(id: any){
    debugger;
    const result = 'Positive'

    this.bookingService.updateTestResult(id, result).subscribe(
      data => {
        debugger;
            if(data['message'] == "True" || data['message'] == "true")
            {
              this.globalconfigurationService.swalSuccess("Test result uploaded successfully", "Upload Result");
              
            }else{
              this.globalconfigurationService.swalInfo(data, "Upload Result");
            }
                
                this.getAllTests();
            },
              error => {
                console.log("error ="+ error);
                this.globalconfigurationService.swalError("Something went wrong uploading test result. Try again", "Upload Result");
              });
  }
  negativeResult(id: any){
    const result = 'Negative'
    
    this.bookingService.updateTestResult(id, result).subscribe(
      data => {
        debugger;
            if(data['message'] == "True" || data['message'] == "true")
            {
              this.globalconfigurationService.swalSuccess("Test Result uploaded successfully", "Upload Result");
             
            }else{
              this.globalconfigurationService.swalInfo(data, "Cancel Booking");
            }
                
                this.getAllTests();
            },
              error => {
                console.log("error ="+ error);
                this.globalconfigurationService.swalError("Something went wrong uploading test result. Try again", "Upload Result");
              });
  }
}
