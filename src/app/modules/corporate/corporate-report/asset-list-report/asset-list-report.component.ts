import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { CorporateReportHttpService } from "src/app/data-access/http/corporate-report-http.service";
import { Device } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { searchByField } from "src/app/data-access/utilities/collection.util";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-asset-list-report",
  templateUrl: "./asset-list-report.component.html",
  styleUrls: ["./asset-list-report.component.scss"],
})
export class AssetListReportComponent implements OnInit {
  company: Domain;
  formColor: string;
  formBgColor: string;
  formFont: string;

  assetName: string;
  searchField = new FormControl("");
  report$: Observable<Device[]> = of([]);
  constReport$: Observable<Device[]> = of([]);
  devices$: Observable<Device[]>;

  showDevices: boolean = false;
  private assests = new BehaviorSubject<Device[]>([]);

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportService: CorporateReportHttpService,
    private toastService: ToastrService
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim())
        // debounceTime(300),
        // distinctUntilChanged()
      )
      .subscribe(
        (keywords: string) => this._search(keywords),
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );

    // this.constReport$ =
    this.reportService
      .generateAssetList(this.company.companyId)
      .pipe(tap((assests) => this.assests.next(assests)))
      .subscribe({ error: () => {} });

    this.report$ = this.assests;
  }

  _search(keywords: string) {
    if (!keywords) {
      this.report$ //= this.constReport$;
    }

    this.report$ = this.assests.pipe(
      map((devices) => {
        return searchByField(devices, (device) => device.assetName, keywords);
      })
    );
  }

  openDetails(device: Device): void {
    this.showDevices = true;
    this.assetName = device.assetName;
    this.devices$ = this.reportService.generateAssetDeviceList(
      this.company.companyId,
      device.assetId
    );
  }
}
