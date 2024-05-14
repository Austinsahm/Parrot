import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DeviceMessageReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-corporate-device-message-report-viewer',
  templateUrl: './corporate-device-message-report-viewer.component.html',
  styleUrls: ['./corporate-device-message-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CorporateDeviceMessageReportViewerComponent implements OnInit {

  @Input() set records(value: DeviceMessageReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<DeviceMessageReportEntry> = {
    columns: [
      { name: 'Manuf. Device Id', prop: 'deviceId', sortable: true },
      { name: 'Device Name', prop: 'deviceName', sortable: true },
      // { name: 'Network', prop: 'networkName', sortable: true },
      { name: 'Company', prop: 'companyName', sortable: true },
      { name: 'Message Date', prop: 'messageDate', sortable: true },
      { name: 'Message', prop: 'message', sortable: true },
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
