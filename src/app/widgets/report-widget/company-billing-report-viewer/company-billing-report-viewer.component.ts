import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CompanyBillingReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-company-billing-report-viewer',
  templateUrl: './company-billing-report-viewer.component.html',
  styleUrls: ['./company-billing-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyBillingReportViewerComponent implements OnInit {

  @Input() set records(value: CompanyBillingReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<CompanyBillingReportEntry> = {
    columns: [
      { name: 'Company', prop: 'companyName', sortable: false },
      { name: 'Device Id', prop: 'deviceId', sortable: false },
      { name: 'Device Name', prop: 'deviceName', sortable: false },
      { name: 'Message Date', prop: 'messageDate', sortable: false },
      { name: 'Message Count', prop: 'messageCount', sortable: false },
      { name: 'Unit Price', prop: 'messagePrice', sortable: false },
      { name: 'Total Cost', prop: 'messageBill', sortable: false }
    ],
    rows: []
  };

  constructor(
    private readonly cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  printHandler(): void {
    window.print();
  }

  saveHandler(): void { }

  exportHandler(): void { }

  deleteHandler(): void { }


}
