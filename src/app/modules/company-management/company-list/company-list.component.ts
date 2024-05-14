import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { CorporateEventMonitoringHttpService } from "src/app/data-access/http/corporate-event-monitoring-http.service";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DateHttpService } from "src/app/data-access/http/date-http.service";

import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-company-list",
  templateUrl: "./company-list.component.html",
  styleUrls: ["./company-list.component.scss"],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  companyId: string;

  viewMode: string;

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly companyInfoService: CompanyInfoService,
    private sessionService: SessionStorageService,
    private httpViewMode: CorporateEventMonitoringHttpService,
    private toastService: ToastrService,
    private dateService: DateHttpService,
    private dashboard: DashboardHttpService,
    private userStore: UsersStoreService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
  }

  ngOnInit(): void {
    // this.httpViewMode.getCompanyParameters(this.companyId).subscribe(
    //   (data) => {
    //     this.viewMode = data[0]?.coyDirectory;
    //   },
    //   (error) => {
    //     this.viewMode = "";
    //     if (!error.status)
    //       this.toastService.error(
    //         "You can't make the request, You are offline",
    //         ""
    //       );
    //     else this.toastService.error("Unknown errors", "");
    //   }
    // );

    this.userStore.getCompanyParameter(this.companyId, true);
    this.userStore.companyParameter$.subscribe(
      (data) => {
        this.viewMode = data?.coyDirectory;
      },
      () => {}
    );
  }

  goToCompanyInformation(company) {
    this.router.navigate([`../company-detail/${company.companyId}`], {
      relativeTo: this.route,
      state: { parentCompany: company.parentCompany },
    });
  }

  goToAddCompany() {
    this.router.navigate([`../company-new`], { relativeTo: this.route });
  }
}
