import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-company-location-report',
  templateUrl: './corporate-company-location-report.component.html',
  styleUrls: ['./corporate-company-location-report.component.scss']
})
export class CorporateCompanyLocationReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cancelHandler(): void { }

  saveHandler(data: any): void {
    console.log(data);
  }
}
