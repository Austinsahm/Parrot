import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CompanyLocationReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-company-location-report-viewer',
  templateUrl: './company-location-report-viewer.component.html',
  styleUrls: ['./company-location-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyLocationReportViewerComponent implements OnInit {

  @Input() set records(value: CompanyLocationReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<CompanyLocationReportEntry> = {
    columns: [
      { name: 'Company', prop: 'companyName', sortable: false },
      { name: 'Company Type Name', prop: 'companyTypeName', sortable: false },
      { name: 'Location', prop: 'locationName', sortable: false },
      { name: 'State', prop: 'stateName', sortable: false },
      { name: 'City', prop: 'cityName', sortable: false },
      { name: 'Status', prop: 'statusName', sortable: false },
      { name: 'Date', prop: 'createdDate', sortable: false }
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
