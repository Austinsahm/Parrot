import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { LastStatus } from "src/app/data-access/models/device-logs.model";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-device-last-status",
  templateUrl: "./device-last-status.component.html",
  styleUrls: ["./device-last-status.component.scss"],
})
export class DeviceLastStatusComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Input() data: LastStatus[];

  formBgColor: string;
  formColor: string;
  formFont: string;

  columnsToDisplay = ["data", "value", "date"];
  dataSource = new MatTableDataSource();

  constructor(protected readonly companyInfoService: CompanyInfoService) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.dataSource.data = this.data;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
