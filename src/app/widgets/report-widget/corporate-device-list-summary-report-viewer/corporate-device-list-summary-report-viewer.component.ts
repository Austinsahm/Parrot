import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DeviceListSummaryReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-corporate-device-list-summary-report-viewer',
  templateUrl: './corporate-device-list-summary-report-viewer.component.html',
  styleUrls: ['./corporate-device-list-summary-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorporateDeviceListSummaryReportViewerComponent implements OnInit {

  @Input() set records(value: DeviceListSummaryReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

   report: Report<DeviceListSummaryReportEntry> = {
    columns: [
      { name: 'Company', prop: 'companyName', sortable: true },
      { name: 'Device Category Name', prop: 'deviceCategName', sortable: true },
      { name: 'Location', prop: 'locationName', sortable: true },
      { name: 'City', prop: 'cityName', sortable: true },
      { name: 'State', prop: 'stateName', sortable: true },
      { name: 'Device Count', prop: 'count', sortable: true },
    ],
    rows: []
  };

  constructor(
    private readonly cd: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
  }

  printHandler(): void {
    window.print();
  }

  saveHandler(): void { }

  exportHandler(): void { }

  deleteHandler(): void { }

}
