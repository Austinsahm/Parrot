import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
  tap,
} from "rxjs/operators";
import { AssetDataAccessService } from "src/app/data-access/asset-data-access.service";
import { Asset } from "src/app/data-access/models/asset.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { AssetStoreService } from "src/app/data-access/store/asset-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-corporate-asset-list",
  templateUrl: "./corporate-asset-list.component.html",
  styleUrls: ["./corporate-asset-list.component.scss"],
})
export class CorporateAssetListComponent implements OnInit {
  @Input() smartHome = false;
  @Input() floorPlanDesign = false;
  assets$: Observable<Asset[]>;

  searchField = new FormControl("");

  private unsubscriber = new Subject();

  permission$: Observable<CorporatePermissionCategory>;

  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly assetDataService: AssetDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService: SessionStorageService,
    private toastService: ToastrService,
    private asssetsStore: AssetStoreService
  ) {
    this.permission$ = this.sessionService.readPermission();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit() {
    this._search(this.searchField.value);

    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber)
      )
      .subscribe((keywords: string) => this._search(keywords));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private _search(keywords?: string): void {
    // this.assets$ = this.assetDataService
    //   .getAccessor(this.companyInfoService.getCompanyInfo().companyId)
    //   .search(keywords);

    if (!keywords) {
      this.asssetsStore.allAssets(
        this.companyInfoService.getCompanyInfo().companyId
      );

      this.assets$ = this.asssetsStore.assets$.pipe(
        map((assets) => {
          if (this.smartHome) {
            return assets.filter((asset) => asset.assetType === "Building");
          }
          return assets;
        })
      );
    } else {
      this.assets$ = this.asssetsStore.searchAssets(keywords).pipe(
        map((assets) => {
          if (this.smartHome) {
            return assets.filter((asset) => asset.assetType === "Building");
          }
          return assets;
        })
      );
    }
  }

  addAsset() {
    this.router.navigate(["new"], { relativeTo: this.route });
  }

  goToAssetDetail(asset: Asset) {
    if (this.floorPlanDesign && this.smartHome) {
      return this.router.navigate([asset.assetId, "floor-plan"], {
        relativeTo: this.route,
      });
    } else if (this.smartHome) {
      return this.router.navigate([asset.assetId, "devices"], {
        relativeTo: this.route,
      });
    }
    this.router.navigate([asset.assetId, "details"], {
      relativeTo: this.route,
    });
  }
}
