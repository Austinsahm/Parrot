import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { CompanyListReportEntry } from "src/app/data-access/models/report.model";
import { Report } from "../types/common.types";

@Component({
  selector: "app-company-list-report-viewer",
  templateUrl: "./company-list-report-viewer.component.html",
  styleUrls: ["./company-list-report-viewer.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListReportViewerComponent implements OnInit {
  @Input() set records(value: CompanyListReportEntry[]) {
    this.report.rows = value;
    setTimeout(() => {
      this.cd.detectChanges();
    });
  }

  report: Report<CompanyListReportEntry> = {
    columns: [
      { name: "Company", prop: "companyName", sortable: false },
      { name: "Company Type Name", prop: "companyTypeId", sortable: false },
      { name: "Status", prop: "statusName", sortable: false },
      { name: "Date", prop: "createdDate", sortable: false },
    ],
    rows: [],
  };

  constructor(private readonly cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log(this.report);
    // this.report.rows = [{
    //   'companyName': 'MAKING FANTASY FOOTBALL',
    //   'companyTypeName': 'A REAL THING',
    //   'statusName': 'FCF',
    //   'createdDate': '2020'
    // }, {
    //   'companyName': 'MAKING FANTASY FOOTBALL',
    //   'companyTypeName': 'A REAL THING',
    //   'statusName': 'FCF1',
    //   'createdDate': '2020'
    // }
    // ]
  }

  printHandler() {
    // window.print();
    // var mywindow = window.open('', 'PRINT', 'height=400,width=600');

    // mywindow.document.write('<html><head><title>' + document.title  + '</title>');
    // mywindow.document.write('</head><body >');
    // mywindow.document.write('<h1>' + document.title  + '</h1>');
    // mywindow.document.write(document.getElementById('print-target').innerHTML)!;
    // mywindow.document.write('</body></html>');

    // mywindow.document.close(); // necessary for IE >= 10
    // mywindow.focus(); // necessary for IE >= 10*/

    // mywindow.print();
    // mywindow.close();

    // return true;

    // var printContents = document.getElementById("print-target").innerHTML;
    // let w = window.open();

    // w.document.write(printContents);
    // w.document.write(
    //   "<scr" +
    //     'ipt type="text/javascript">' +
    //     "window.onload = function() { window.print(); window.close(); };" +
    //     "</sc" +
    //     "ript>"
    // );

    // w.document.close(); // necessary for IE >= 10
    // w.focus(); // necessary for IE >= 10

    // return true;


    let printElement = document.getElementById('print-target');
    var printWindow = window.open('', 'PRINT');
    printWindow.document.write(document.documentElement.innerHTML);
    setTimeout(() => { // Needed for large documents
      printWindow.document.body.style.margin = '0 0';
      printWindow.document.body.innerHTML = printElement.outerHTML;
      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/
      printWindow.print();
      printWindow.close();
    }, 1000)
  }

  saveHandler(): void {}

  exportHandler(): void {}

  deleteHandler(): void {}
}
