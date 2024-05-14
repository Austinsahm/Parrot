import { Component, OnInit, ViewChild } from "@angular/core";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, map } from "rxjs/operators";
import { DeviceCategoryDataAccessService } from "src/app/data-access/device-category-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { Observable } from "rxjs";
import { DeviceCategoryDirectory } from "src/app/data-access/models/device.model";
import { FormControl } from "@angular/forms";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { DeviceDirectoryStoreService } from "src/app/data-access/store/device-directory-store.service";

@Component({
  selector: "app-device-type-list",
  templateUrl: "./device-category-list.component.html",
  styleUrls: ["./device-category-list.component.scss"],
})
export class DeviceCategoryListComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @ViewChild(DatatableComponent) deviceTypeListTable: DatatableComponent;

  categories$: Observable<DeviceCategoryDirectory[]>;
  searchField = new FormControl("");
  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly categoryDataAccessor: DeviceCategoryDataAccessService,
    private router: Router,
    private sessionService: SessionStorageService,
    private deviceDirStore: DeviceDirectoryStoreService,
    private route: ActivatedRoute
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.permission$ = this.sessionService.partnerReadPermission();
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this._search();

    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((keywords: string) => this._search(keywords));
  }

  private _search(keywords?: string): void {
    // this.categories$ = this.categoryDataAccessor.getAccessor(
    // this.companyInfoService.getCompanyInfo().companyId
    // ).directory.search(keywords);

    if (!keywords) {
      this.deviceDirStore.getDeviceCategoryDirectory(
        this.companyInfoService.getCompanyInfo().companyId
      );

      this.categories$ = this.deviceDirStore.deviceCategoryDirectory$;
    } else {
      this.categories$ = this.deviceDirStore.searchDeviceCategory(keywords);
    }
  }

  goToDeviceTypeDetail(deviceType: DeviceCategoryDirectory) {
    this.router.navigate(
      [`../device-category-detail/${deviceType.deviceCategId}`],
      { relativeTo: this.route }
    );
  }

  addDeviceType() {
    this.router.navigate([`../device-category-new`], {
      relativeTo: this.route,
    });
  }
}
