import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DatatableComponent } from "@swimlane/ngx-datatable";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";
import { Observable, Subject } from "rxjs";
import { Asset } from "src/app/data-access/models/asset.model";
import { AssetDataAccessService } from "src/app/data-access/asset-data-access.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { FormControl } from "@angular/forms";
import { AssetStoreService } from "src/app/data-access/store/asset-store.service";

@Component({
  selector: "app-assets-list",
  templateUrl: "./assets-list.component.html",
  styleUrls: ["./assets-list.component.scss"],
})
export class AssetsListComponent implements OnInit, OnDestroy {
  @ViewChild(DatatableComponent) assetsListTable: DatatableComponent;

  assets$: Observable<Asset[]>;

  searchField = new FormControl("");

  private unsubscriber = new Subject();

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly assetDataService: AssetDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private asssetsStore: AssetStoreService
  ) {}

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
    // this.assets$ = this.assetDataService.getAccessor(
    // this.companyInfoService.getCompanyInfo().companyId
    // ).search(keywords);

    if (!keywords) {
      this.asssetsStore.allAssets(
        this.companyInfoService.getCompanyInfo().companyId
      );

      this.assets$ = this.asssetsStore.assets$;
    } else {
      this.assets$ = this.asssetsStore.searchAssets(keywords);
    }
  }

  addAsset() {
    this.router.navigate(["../assets-new"], { relativeTo: this.route });
  }

  goToAssetDetail(asset: Asset) {
    this.router.navigate([`../assets-detail/${asset.assetId}`], {
      relativeTo: this.route,
    });
  }
}
