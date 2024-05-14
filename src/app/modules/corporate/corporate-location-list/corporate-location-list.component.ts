import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable, Subject } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  map,
  takeUntil,
} from "rxjs/operators";
import { LocationDataAccessService } from "src/app/data-access/location-data-access.service";
import { CorporateLocation } from "src/app/data-access/models/location.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-corporate-location-list",
  templateUrl: "./corporate-location-list.component.html",
  styleUrls: ["./corporate-location-list.component.scss"],
})
export class CorporateLocationListComponent implements OnInit {
  searchField = new FormControl("");

  locations$: Observable<CorporateLocation[]>;

  private unsubscriber = new Subject();
  permission$: Observable<CorporatePermissionCategory>;

  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private locationDataService: LocationDataAccessService,
    private readonly companyInfoService: CompanyInfoService,
    private sessionService: SessionStorageService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.permission$ = this.sessionService.readPermission();

    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this._search(this.searchField.value);

    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsubscriber)
      )
      .subscribe(
        (keywords: string) => this._search(keywords),
      );
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  private _search(keywords?: string): void {
    this.locations$ = this.locationDataService
      .getAccessor(this.companyInfoService.getCompanyInfo().companyId)
      .search(keywords);
  }

  addLocation() {
    this.router.navigate(["create"], { relativeTo: this.route });
  }

  goToLocationDetail(location: CorporateLocation) {
    this.router.navigate([location.locationId, "details"], {
      relativeTo: this.route,
    });
  }
}
