import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
import { UserStatDetail } from "src/app/data-access/models/company.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { Location } from "@angular/common";

@Component({
  selector: "app-user-summary-detail",
  templateUrl: "./user-summary-detail.component.html",
  styleUrls: ["./user-summary-detail.component.scss"],
})
export class UserSummaryDetailComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;

  companyId: string;
  userTypes$: Observable<UserStatDetail[]>;
  userStatus$: Observable<UserStatDetail[]>;

  constructor(
    private companyHttpService: CompanyHttpService,
    private route: ActivatedRoute,
    protected readonly companyInfoService: CompanyInfoService,
    private location: Location
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.companyId = this.route.parent.snapshot.paramMap.get("companyId");

    this.userTypes$ = this.companyHttpService.fetchUserStatTypeDetail(
      this.companyId
    );

    this.userStatus$ = this.companyHttpService.fetchUserStatStatusDetail(
      this.companyId
    );
  }

  back() {
    this.location.back();
  }
}
