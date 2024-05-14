import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { DeviceListReportEntry } from "src/app/data-access/models/report.model";
import { Report } from "../types/common.types";

@Component({
  selector: "app-device-list-report-viewer",
  templateUrl: "./device-list-report-viewer.component.html",
  styleUrls: ["./device-list-report-viewer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceListReportViewerComponent implements OnInit {
  @Input() set records(value: DeviceListReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<DeviceListReportEntry> = {
    columns: [
      { name: "Manuf. Device Id", prop: "manufDeviceId", sortable: true },
      { name: "Device Name", prop: "deviceName", sortable: true },
      { name: "Company", prop: "companyName", sortable: true },
      { name: "Date", prop: "createdDate", sortable: true },
      { name: "Status", prop: "statusName", sortable: true },
      { name: "Network", prop: "networkName", sortable: true },
      { name: "Device Category Name", prop: "deviceCategName", sortable: true },
      { name: "Location", prop: "locationName", sortable: true },
      { name: "City", prop: "cityName", sortable: true },
      { name: "State", prop: "stateName", sortable: true },
    ],
    rows: [],
  };

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {}

  printHandler(): void {
    window.print();
  }

  saveHandler(): void {}

  exportHandler(): void {}

  deleteHandler(): void {}
}
