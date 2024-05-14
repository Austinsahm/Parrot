import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DeviceListSummaryReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-device-summary-report-viewer',
  templateUrl: './device-summary-report-viewer.component.html',
  styleUrls: ['./device-summary-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceSummaryReportViewerComponent implements OnInit {

  @Input() set records(value: DeviceListSummaryReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<DeviceListSummaryReportEntry> = {
    columns: [
      { name: 'Company', prop: 'companyName', sortable: false },
      { name: 'Device Category Name', prop: 'deviceCategName', sortable: false },
      { name: 'Location', prop: 'locationName', sortable: false },
      { name: 'City', prop: 'cityName', sortable: false },
      { name: 'State', prop: 'stateName', sortable: false },
      { name: 'Device Count', prop: 'count', sortable: false }
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
