import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { NgxScannerQrcodeComponent } from "ngx-scanner-qrcode";

@Component({
  selector: "app-qr-scanner",
  templateUrl: "./qr-scanner.component.html",
  styleUrls: ["./qr-scanner.component.scss"],
})
export class QrScannerComponent implements OnInit {
  @Output() qrCodeEvent = new EventEmitter<string>();
  @Output() closeQr = new EventEmitter()
  @ViewChild("action", { static: true }) scanner: NgxScannerQrcodeComponent;

  public output: string;

  constructor() {}

  ngOnInit(): void {
    if (!this.scanner.isStart) this.scanner.toggleCamera();
  }

  onError(e: any): void {
    alert(e);
  }

  qrResult(result?: string) {
    if (result) this.qrCodeEvent.emit(result);
    else this.qrCodeEvent.emit();
    this.scanner.stop();
  }

  
}
