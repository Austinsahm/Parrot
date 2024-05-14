import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  OnInit,
} from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbTimeAdapter, NgbTimeStruct } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DashboardDirectory } from "src/app/data-access/models/dashboard.model";
import { CompanyInfoService } from "src/app/services/company-info.service";

const pad = (i: number): string => (i < 10 ? `0${i}` : `${i}`);

/**
 * Example of a String Time adapter
 */
@Injectable()
export class NgbTimeStringAdapter extends NgbTimeAdapter<string> {
  fromModel(value: string | null): NgbTimeStruct | null {
    if (!value) {
      return null;
    }
    const split = value.split(":");
    return {
      hour: parseInt(split[0], 10),
      minute: parseInt(split[1], 10),
      second: parseInt(split[2], 10),
    };
  }

  toModel(time: NgbTimeStruct | null): string | null {
    return time != null
      ? `${pad(time.hour)}:${pad(time.minute)}:${pad(time.second)}`
      : null;
  }
}

@Component({
  selector: "app-corporate-asset-tracker",
  templateUrl: "./corporate-asset-tracker.component.html",
  styleUrls: ["./corporate-asset-tracker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
})
export class CorporateAssetTrackerComponent implements OnInit {
  form: FormGroup;

  searchField = new FormControl("");
  geolocations$: Observable<DashboardDirectory[]> = of([]);
  companyId: string;
  showMap = false;
  showSelected = false;
  showError: boolean = false;
  deviceName: string;
  deviceId: string;
  manufDeviceId: string;
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  startTIme: string;
  stopTime: string;

  public locationData: { lat: number; lng: number }[];
  public markerIcon: string;

  constructor(
    private readonly dashboardHttpService: DashboardHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private readonly fb: FormBuilder,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromTime: ["", Validators.compose([Validators.required])],
      toTime: ["", Validators.compose([Validators.required])],
      from: ["", Validators.compose([Validators.required])],
      to: ["", Validators.compose([Validators.required])],
    });

    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.geolocations$ = this.dashboardHttpService.fetchGeolocationDirectory(
      this.companyId
    );

    // this.dashboards$ = this._search(this.searchField.value);

    // this.searchField.valueChanges.pipe(
    //   map((keywords: string) => keywords.trim()),
    //   debounceTime(350),
    //   distinctUntilChanged()
    // ).pipe(takeUntil(this.unsubscriber)).subscribe((keywords) => {
    //   this.devices$ = this._search(keywords);
    //   this.cd.detectChanges();
    // });
  }

  openDetails(entry: DashboardDirectory): void {
    this.form.patchValue({
      from: entry.startDate,
      to: entry.endDate,
      fromTime: "00:00:00",
      toTime: "11:59:59",
    });
    this.showMap = false;
    this.showSelected = true;
    this.deviceName = entry.deviceName;
    this.manufDeviceId = entry.manufDeviceId;
    this.deviceId = entry.deviceId;
  }

  fetchAssetTracker(): void {
    this.showError = this.form.invalid ? true : false;

    if (!this.showError) {
      this.showMap = false;

      this.startTIme = `${this.form.get("from").value} ${
        this.form.get("fromTime").value
      }`;

      this.stopTime = `${this.form.get("to").value} ${
        this.form.get("toTime").value
      }`;

      // this.startTIme = '2021-04-01 00:00:00';
      // this.stopTime = '2021-04-30 00:00:00';

      this.dashboardHttpService
        .fetchAssetTracker(this.deviceId, this.startTIme, this.stopTime)
        .subscribe(
          (response) => {
            if (
              !response.location.length ||
              !response.manufDeviceId ||
              !response.markerIconId
            ) {
              this.toastService.warning("No data available", "Asset Tracker");
              return;
            }

            this.locationData = response.location.map((each) =>
              this.processLocation(each)
            );
            this.dashboardHttpService
              .getSpecificMarkerIcon(response.markerIconId)
              .subscribe(
                (marker) => {
                  this.markerIcon = marker.iconImage;
                  this.showMap = true;
                  this.cd.detectChanges();
                },
                () => {}
              );
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
    }
  }

  processLocation = (data: string) => {
    let parsedData = JSON.parse(data);
    return { lat: parsedData[0], lng: parsedData[1] };
  };
}
