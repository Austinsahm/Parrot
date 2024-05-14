import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { DeviceMessageReportEntry } from "src/app/data-access/models/report.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { Report } from "../types/common.types";

@Component({
  selector: "app-device-report-viewer",
  templateUrl: "./device-report-viewer.component.html",
  styleUrls: ["./device-report-viewer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceReportViewerComponent implements OnInit {
  @Input() set records(value: any[]) {
    //diff data will be received from the api
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }
  @Input() data;

  user: string;
  companyType:string

  report: Report<any> = {
    columns: [],
    rows: [],
  };

  constructor(
    private readonly cd: ChangeDetectorRef,
    private userInfoService: UserInfoService,
    private companyInfoService: CompanyInfoService
  ) {}

  ngOnInit(): void {
    this.user =
      this.userInfoService.getUserInfo().firstName +
      " " +
      this.userInfoService.getUserInfo().lastName;
      this.companyType= this.companyInfoService.getCompanyInfo().companyType
      

    if (!this.report.rows.length) return;

    //extract object keys
    const formatColumn = Object.keys(this.report.rows[0]);

    //filter unwanted keys

    //format column
    const column = formatColumn.map((el) => ({
      name: el,
      prop: el,
      sortable: true,
    }));

    this.report = { columns: column, rows: this.report.rows };
  }

  printHandler(): void {
    window.print();
  }

  saveHandler(): void {}

  exportHandler(): void {}

  deleteHandler(): void {}
}
