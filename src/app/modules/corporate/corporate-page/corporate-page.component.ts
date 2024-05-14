import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Domain } from "src/app/data-access/models/domain.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-corporate-page",
  templateUrl: "./corporate-page.component.html",
  styleUrls: ["./corporate-page.component.scss"],
})
export class CorporatePageComponent implements OnInit {
  sidenavWidth = 4;
  closeDash: boolean;
  closeSec: boolean;
  closeReport: boolean;
  closeUtil: boolean;
  closeSet: boolean;
  closeEvent: boolean;
  closePayment: boolean;
  payload: CorporatePermissionCategory;
  domain: Domain;

  constructor(
    private sessionService: SessionStorageService,
    private router: Router,
    private companyInfoService: CompanyInfoService,
    private toastService: ToastrService
  ) {
    this.domain = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {
    this.sessionService.readPermission().subscribe(
      (val) => {
        if (Object.keys(val).length === 0) {
          this.reloadComponent();
        }
        this.payload = val;
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  increase() {
    this.sidenavWidth = 20;
  }

  decrease() {
    this.closeDash = false;
    this.closeSec = false;
    this.closeReport = false;
    this.closeUtil = false;
    this.closeSet = false;
    this.closeEvent = false;
    this.closePayment = false;
    this.sidenavWidth = 4;
  }
}
