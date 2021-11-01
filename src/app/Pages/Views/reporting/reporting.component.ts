import { Component, OnInit } from '@angular/core';
import { Reporting } from '../../../Models/reporting.model';
import { ReportingService } from '../../../Services/reporting/reporting.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  displayedColumns: string[] = ['location', 'date', 'capacity', 'actualBookings', 'cancelledBookings', 'completedBookings', 'positiveCases','negativeCases'];
  reportList : Reporting[] =[];
  constructor(private reportingService: ReportingService,) { }

  ngOnInit(): void {
    this.getReports();
  }
  getReports(){
    this.reportingService.getAllReports().subscribe(data =>{
      this.reportList = data;
    });
  }
}
