import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import * as xlsx from "xlsx";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import * as fileSaver from "file-saver";

@Component({
  selector: "app-report-actions",
  templateUrl: "./report-actions.component.html",
  styleUrls: ["./report-actions.component.scss"],
})
export class ReportActionsComponent implements OnInit {
  @ViewChild("printSheet", { static: false }) printSheet: ElementRef;
  @Input() report: string = "";
  @Input() data;

  constructor() {}

  ngOnInit(): void {}

  onPrint() {
    let printElement = document.getElementById("print-target");
    var printWindow = window.open("", "PRINT");
    printWindow.document.write(document.documentElement.innerHTML);
    setTimeout(() => {
      printWindow.document.body.style.margin = "0 0";
      printWindow.document.body.innerHTML = printElement.outerHTML;
      printWindow.document.close(); // necessary for IE >= 10
      printWindow.focus(); // necessary for IE >= 10*/
      printWindow.print();
      printWindow.close();
    }, 1000);
  }

  onSave() {
    let saveDoc = document.getElementById("print-target");
    html2canvas(saveDoc).then((canvas) => {
      let width = 208;
      let height = (canvas.height * width) / canvas.width;
      const uri = canvas.toDataURL("image/png");
      let pdf = new jsPDF("p", "mm", "a4");
      let position = 0;
      pdf.addImage(uri, "PNG", 0, position, width, height);
      pdf.save(`${this.report}${new Date().getTime()}.pdf`);
    });
  }

  // onExport() {
  // const ws = xlsx.utils.table_to_sheet(this.printSheet.nativeElement);
  // const wb = xlsx.utils.book_new();
  // xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  // xlsx.writeFile(wb, "Sheet.xlsx");
  // }

  onExport() {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveAsExcelFile(excelBuffer, this.report);
  }

  // onDelete() {}
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const EXCEL_TYPE =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    fileSaver.saveAs(data, fileName + new Date().getTime() + EXCEL_EXTENSION);
  }
}
