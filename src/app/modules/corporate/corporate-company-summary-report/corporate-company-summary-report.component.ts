import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-company-summary-report',
  templateUrl: './corporate-company-summary-report.component.html',
  styleUrls: ['./corporate-company-summary-report.component.scss']
})
export class CorporateCompanySummaryReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  cancelHandler(): void { }

  saveHandler(data: any): void {
    console.log(data);
  }

}
