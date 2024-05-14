import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-corporate-company-report',
  templateUrl: './corporate-company-report.component.html',
  styleUrls: ['./corporate-company-report.component.scss']
})
export class CorporateCompanyReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  saveHandler(filters: any): void {
    console.log(filters)
  }

  cancelHandler(): void {}
}
