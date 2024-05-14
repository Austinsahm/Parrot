import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { WhiteLabelHttpService } from "src/app/data-access/http/white-label-http.service";
import { Domain } from "src/app/data-access/models/domain.model";
import {
  WhiteLabelDirectory,
  WhiteLabelFormData,
} from "src/app/data-access/models/white-label.model";
import { WhiteLabelDataAccessService } from "src/app/data-access/white-label-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-corporate-white-label",
  templateUrl: "./corporate-white-label.component.html",
  styleUrls: ["./corporate-white-label.component.scss"],
})
export class CorporateWhiteLabelComponent implements OnInit {
  domain: Domain;

   formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  constructor(
    private companyInfoService: CompanyInfoService,
    private readonly dataAccessor: WhiteLabelDataAccessService,
    private toastService: ToastrService,
    private readonly session: SessionStorageService,
    private readonly router: Router,
    private readonly whiteLabelService: WhiteLabelHttpService
  ) {
    this.domain = this.companyInfoService.getCompanyInfo();
 this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour; }

  ngOnInit(): void {}

  saveHandler(details: WhiteLabelFormData) {
    this.dataAccessor
      .getAccessor(this.domain.companyId)
      .directory.update(details)
      // .pipe(
      //   this.toast.observe({
      //     loading: "Saving, please wait...",
      //     success: "Record updated successfully.",
      //     error: "Error saving information.",
      //   })
      // )
      .subscribe(
        (data) => {
          if (data?.status === "SUCCESS") {
            this.toastService.success("White Label Updated successful", "");
            this.session.deleteDomain().subscribe();
            this.reloadCurrentPage();
          } else {
            this.toastService.error("Error while updating", "");
          }
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  uploadHandler(logo: FormData) {
    this.whiteLabelService
      .updateLogo(logo)
      // .pipe(
      //   this.toast.observe({
      //     loading: "Saving, please wait...",
      //     success: "Record updated successfully.",
      //     error: "Error saving information.",
      //   })
      // )
      .subscribe(
        (data) => {
          if (data?.status === "SUCCESS") {
            this.toastService.success("Company Logo Updated successful", "");
            this.session.deleteDomain().subscribe();
            this.reloadCurrentPage();
          } else this.toastService.error("Error updating logo", "");
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }
}
