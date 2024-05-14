import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { DeviceAttribute } from "src/app/data-access/models/company.model";
import {
  DeviceDetail,
  DeviceMoreDetail,
} from "src/app/data-access/models/device.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { changeAttributeValue } from "src/app/services/utilities";

@Component({
  selector: "app-device-more-detail-modal",
  templateUrl: "./device-more-detail-modal.component.html",
  styleUrls: ["./device-more-detail-modal.component.scss"],
})
export class DeviceMoreDetailModalComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Input() moreDetails$: Observable<DeviceMoreDetail[]>;

  @Input() deviceName: string;

  constructor(
    private modalRef: NgbActiveModal,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {}

  closeHandler(): void {
    this.modalRef.close();
  }

  changeAttributeName(att: DeviceAttribute): string {
    return changeAttributeValue(att);
  }
}
