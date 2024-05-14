import { Component, OnInit } from "@angular/core";
import { UserInfoService } from "../services/user-info.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserSessionInformation } from "../services/user.service";
import { CompanyTypeCode } from "../data-access/models/company.model";
import { Domain } from "../data-access/models/domain.model";
import { isCorporateDomain } from "../services/utilities";
import { CompanyInfoService } from "../services/company-info.service";
import { SessionStorageService } from "../services/session-storage.service";
import { map, tap } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  company: Domain;
  isDomain = true;
  ePage = "assets/images/err.png";

  constructor(
    private userInfoService: UserInfoService,
    private readonly route: ActivatedRoute,
    private router: Router,
    private companyInfoService: CompanyInfoService,
    private sessionStorage: SessionStorageService
  ) {
    this.company = this.route.parent.snapshot.data.companyInitData;
  }

  ngOnInit(): void {
    setTimeout(() => {
      if (Object.keys(this.companyInfoService.getCompanyInfo()).length !== 0) {
        if (this.userInfoService.isAuthenticated()) {
          if (
            [CompanyTypeCode.CORPORATE, CompanyTypeCode.INDIVIDUAL].includes(
              this.company.companyType
            )
          ) {
            this.router.navigateByUrl("corporate");
          } else {
            this.router.navigateByUrl("partner");
          }
          return;
        } else {
          this.router.navigateByUrl("login");
        }
      } else {
        this.isDomain = false;
      }
    }, 500);
  }
}
