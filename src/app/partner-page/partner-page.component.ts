import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Domain } from "../data-access/models/domain.model";
import { PartnerPermissionCategory } from "../data-access/models/role-authorization.model";
import { CompanyInfoService } from "../services/company-info.service";
import { SessionStorageService } from "../services/session-storage.service";

@Component({
  selector: "app-partner-page",
  templateUrl: "./partner-page.component.html",
  styleUrls: ["./partner-page.component.scss"],
})
export class PartnerPageComponent implements OnInit {
  sidenavWidth = 4;
  close: boolean;
  closeDev: boolean;
  closeReport: boolean;
  closeUtil: boolean;
  closeSet: boolean;
  closeBill: boolean;
  payload: PartnerPermissionCategory;
  domain: Domain;

  constructor(
    private router: Router,
    private session: SessionStorageService,
    private companyInfoService: CompanyInfoService
  ) {
    this.domain = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {
    this.session.partnerReadPermission().subscribe((val) => {
      if (Object.keys(val).length === 0) {
        this.ngOnInit();
      }
      this.payload = val;
    });
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  reloadCurrentPage() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl("/", { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  increase() {
    this.sidenavWidth = 20;
  }

  decrease() {
    this.close = false;
    this.closeDev = false;
    this.closeReport = false;
    this.closeUtil = false;
    this.closeSet = false;
    this.closeBill = false;
    this.sidenavWidth = 4;
  }
}
