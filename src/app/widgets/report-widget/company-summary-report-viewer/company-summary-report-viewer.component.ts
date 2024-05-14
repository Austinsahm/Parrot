import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CompanySummaryReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-company-summary-report-viewer',
  templateUrl: './company-summary-report-viewer.component.html',
  styleUrls: ['./company-summary-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanySummaryReportViewerComponent implements OnInit {

  @Input() set records(value: CompanySummaryReportEntry[]) {
    this.report.rows = value;
  }

  report: Report<CompanySummaryReportEntry> = {
    columns: [
      { name: 'Company', prop: 'companyName', sortable: false },
      { name: 'Company Type Name', prop: 'companyTypeName', sortable: false },
      { name: 'Company Count', prop: 'count', sortable: false }
    ],
    rows: []
  };

  constructor() { }

  ngOnInit(): void { }

  printHandler(): void {
    window.print();
  }

  saveHandler(): void { }

  exportHandler(): void { }

  deleteHandler(): void { }
}
