import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { WhiteLabelHttpService } from "src/app/data-access/http/white-label-http.service";
import {
  WhiteLabel,
  WhiteLabelDirectory,
  WhiteLabelFormData,
} from "src/app/data-access/models/white-label.model";
import { WhiteLabelDataAccessService } from "src/app/data-access/white-label-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-white-label-details-modal",
  templateUrl: "./white-label-details-modal.component.html",
  styleUrls: ["./white-label-details-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteLabelDetailsModalComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  @Input() company$: Observable<Partial<WhiteLabel & WhiteLabelDirectory>>;
  companyId: string;
  primaryColour: string;

  constructor(
    private modalRef: NgbActiveModal,
    private readonly dataAccessor: WhiteLabelDataAccessService,
    private toastService: ToastrService,
    private readonly companyInfo: CompanyInfoService,
    protected readonly companyInfoService: CompanyInfoService,
    private readonly router: Router,
    private readonly session: SessionStorageService,
    private readonly whiteLabelService: WhiteLabelHttpService
  ) {
    this.companyId = companyInfo.getCompanyInfo().companyId;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void { }

  closeHandler(): void {
    this.modalRef.close();
  }

  saveHandler(company: WhiteLabelDirectory, details: WhiteLabelFormData): void {
    this.dataAccessor
      .getAccessor(company.companyId)
      .directory.update(details)
      // .pipe(
      //   this.toast.observe({
      //     loading: "Saving, please wait...",
      //     success: "Record updated successfully.",
      //     error: "Error saving information.",
      //   })
      // )
      .subscribe((data) => {
        this.modalRef.close();
        if (data?.status === "SUCCESS") {
          this.toastService.success("White Label Updated successful", "");
          if (
            this.companyId === company.companyId &&
            data?.status === "SUCCESS"
          ) {
            this.session.deleteDomain().subscribe();
            this.reloadCurrentPage();
          }
        } else {
          this.toastService.error("Error while updating", "");
        }
      },
        (error) => {
          if (!error.status)
            this.toastService.error(
              "You can't make the request, You are offline",
              ""
            );
          else this.toastService.error("Unknown errors", "");
        });
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  uploadHandler(logo: FormData) {
    let companyId = logo.get("companyId");

    this.whiteLabelService
      .updateLogo(logo)
      // .pipe(
      //   this.toast.observe({
      //     loading: "Saving, please wait...",
      //     success: "Record updated successfully.",
      //     error: "Error saving information.",
      //   })
      // )
      .subscribe((data) => {
        this.modalRef.close();
        if (data?.status === "SUCCESS") {
          this.toastService.success(
            "Company Logo Updated successful",
            ""
          ); if (this.companyId === companyId && data?.status === "SUCCESS") {
            this.session.deleteDomain().subscribe();
            this.reloadCurrentPage();
          }
        } else {
          this.toastService.error("Error updating logo", "");
        }
      },
        (error) => {
          if (!error.status)
            this.toastService.error(
              "You can't make the request, You are offline",
              ""
            );
          else this.toastService.error("Unknown errors", "");
        });
  }
}
