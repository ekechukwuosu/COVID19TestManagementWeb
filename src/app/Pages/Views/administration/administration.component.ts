import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingMaster } from '../../../Models/bookingmaster.model';
import { AdministrationService } from '../../../Services/administration/administration.service';
import { GlobalconfigurationService } from '../../../Services/globalconfiguration.service';
import { LocationService } from '../../../Services/location/location.service';
import { NotificationService } from '../../../Services/notification.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'location', 'date', 'space', 'usedSpace'];
  allAllocations: BookingMaster[]=[];
  alllocations: any[];
  dataSource;
  newAllocationForm: FormGroup;
  hasFormErrors = false;
  
  constructor(private adminService: AdministrationService,
    private locationService : LocationService,
    public datepipe: DatePipe,
    private globalconfigurationService : GlobalconfigurationService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
    this.getLocations();
   this.getAllocations();
  }
  initForm() {
		// demo message to show
		this.newAllocationForm = this.fb.group({		
	
      location:['', Validators.compose([
				Validators.required,	
			])
			],
      space: ['', Validators.compose([
				Validators.required,	
			])
			],
      date: ['', Validators.compose([
				Validators.required,	
			])
			],
		});
  }
  SubmitAllocation(){
    debugger;
    this.hasFormErrors = false;
		const controls = this.newAllocationForm.controls;
		/** check form */
		if (this.newAllocationForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
      this.globalconfigurationService.swalInfo("Invalid or Empty input details. Try again", "Add Allocation");
			this.hasFormErrors = true;
			return;
		}

		const _allocation = new BookingMaster();
    _allocation.location = controls.location.value;
    _allocation.date = this.datepipe.transform(controls.date.value, 'yyyy-MM-dd');  
    _allocation.space = controls.space.value;

   

    this.adminService.submitNewAllocation(_allocation).subscribe(
      data => {
                this.globalconfigurationService.swalSuccess("New Allocation added successfully", "Add Allocation");
                this.newAllocationForm.reset();
                this.getAllocations();
            },
              error => {
                console.log("error ="+ error);
                  this.globalconfigurationService.swalError("New Allocation submission was not successful", "Add Allocation");
              });

  }
  getLocations(){
    this.locationService.getAlllocations().subscribe(data =>{
      this.alllocations = data;
    });
  }
  getAllocations(){
    this.adminService.getAllAllocations().subscribe(data =>{
      this.allAllocations = data;
    });
  }
}
