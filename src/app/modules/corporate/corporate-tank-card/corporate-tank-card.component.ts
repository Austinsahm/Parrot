import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FusionDataSource } from "src/app/data-access/models/asset.model";
import { DataDetails } from "src/app/data-access/models/company.model";
import { CorporateLogsModalComponent } from "../corporate-logs-modal/corporate-logs-modal.component";

@Component({
  selector: "app-corporate-tank-card",
  templateUrl: "./corporate-tank-card.component.html",
  styleUrls: ["./corporate-tank-card.component.scss"],
})
export class CorporateTankCardComponent implements OnInit {
  @Input() title: string;
  @Input() dataSource: FusionDataSource;
  @Input() deviceIndex: number;
  @Output() frontEndAnimate = new EventEmitter<any>();
  @Output() minimizeTank = new EventEmitter<number>();
  @Output() maximizeTank = new EventEmitter<number>();
  @Output() tankDetails = new EventEmitter<number>();

  constructor(private modal: NgbModal) {}

  ngOnInit(): void {}

  minimize() {
    this.minimizeTank.emit(this.deviceIndex);
    }

  maximize() {
    this.maximizeTank.emit(this.deviceIndex);
  }

  dataDetails() {
    this.tankDetails.emit(this.deviceIndex);
  }

  animation(evt) {
    this.frontEndAnimate.emit(evt);
  }
}
