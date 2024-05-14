import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, of, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import { DeviceConfigurationDirectory } from "src/app/data-access/models/device.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { DeviceDirectoryStoreService } from "src/app/data-access/store/device-directory-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";

@Component({
  selector: "app-corporate-device-configuration",
  templateUrl: "./corporate-device-configuration.component.html",
  styleUrls: ["./corporate-device-configuration.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateDeviceConfigurationComponent implements OnInit {
  searchField = new FormControl("");
  devices$: Observable<DeviceConfigurationDirectory[]> = of([]);
  unsubscriber = new Subject();
  userId: string;
  permission$: Observable<CorporatePermissionCategory>;
  formColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private userInfoService: UserInfoService,
    private sessionService: SessionStorageService,
    private toastService: ToastrService,
    private deviceDirStore: DeviceDirectoryStoreService
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.userId = this.userInfoService.getUserInfo().userId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.devices$ = this._search(this.searchField.value);

    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(350),
        distinctUntilChanged()
      )
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((keywords) => {
        this.devices$ = this._search(keywords);
        this.cd.detectChanges();
      });
  }

  private _search(
    keywords?: string
  ): Observable<DeviceConfigurationDirectory[]> {
    // return this.deviceDataAccessor
    //   .getAccessor(
    // this.companyInfoService.getCompanyInfo().companyId,
    // this.userId
    //   )
    //   .searchDirectory(keywords);

    if (!keywords) {
      this.deviceDirStore.getAllDeviceConfigDir(
        this.companyInfoService.getCompanyInfo().companyId,
        this.userId
      );
      return this.deviceDirStore.deviceConfigDir$;
    }
    return this.deviceDirStore.searchDeviceConfigDir(keywords)
  }

  private _find(deviceId: string) {
    let subdomain = this.companyInfoService.getCompanyInfo().companyId;
    return this.deviceDataAccessor
      .getAccessor(subdomain, this.userId)
      .findById(deviceId, subdomain);
  }

  openDetails(entry: DeviceConfigurationDirectory): void {
    this.router.navigate([entry.configId, "update"], {
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }
}
