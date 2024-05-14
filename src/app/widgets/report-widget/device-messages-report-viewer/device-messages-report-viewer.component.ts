import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { DeviceMessageReportEntry } from 'src/app/data-access/models/report.model';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-device-messages-report-viewer',
  templateUrl: './device-messages-report-viewer.component.html',
  styleUrls: ['./device-messages-report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeviceMessagesReportViewerComponent implements OnInit {

  @Input() set records(value: DeviceMessageReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<DeviceMessageReportEntry> = {
    columns: [
      { name: 'Company', prop: 'companyName', sortable: false },
      { name: 'Device Id', prop: 'deviceId', sortable: false },
      { name: 'Device Name', prop: 'deviceName', sortable: false },
      { name: 'Message Date', prop: 'messageDate', sortable: false },
      { name: 'Message', prop: 'message', sortable: false }
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
