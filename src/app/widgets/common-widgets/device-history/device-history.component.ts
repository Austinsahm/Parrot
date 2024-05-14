import {
  Component,
  OnInit,
  ContentChildren,
  QueryList,
  ViewChild,
  Input,
} from "@angular/core";
import { DataTableColumnDirective } from "@swimlane/ngx-datatable";
import { HistoryData } from "src/app/data-access/models/device-logs.model";
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-device-history",
  templateUrl: "./device-history.component.html",
  styleUrls: ["./device-history.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class DeviceHistoryComponent implements OnInit {
  // @ContentChildren(DataTableColumnDirective)
  // columnDirectives: QueryList<DataTableColumnDirective>;
  // @ViewChild("myTable", { static: true }) table: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @Input() logs: HistoryData[] = [];

  formBgColor: string;
  formColor: string;
  formFont: string;

  columnsToDisplay = ["Action", "Date", "Type", "Sequence #", "Menu"];
  expandedElement: HistoryData | null;
  dataSource = new MatTableDataSource();

  constructor(protected readonly companyInfoService: CompanyInfoService) {
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.dataSource.data = this.logs.reverse();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // getNext(event: PageEvent) {
  //   let offset = event.pageSize * event.pageIndex;
  // }

  // filter table
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
