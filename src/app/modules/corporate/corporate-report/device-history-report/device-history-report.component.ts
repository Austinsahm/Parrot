import {
  ChangeDetectionStrategy,
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
import { BehaviorSubject, from, merge, Observable, of } from "rxjs";
import { CorporateReportHttpService } from "src/app/data-access/http/corporate-report-http.service";
import { Device, DeviceMessage } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { NgbTimeStruct, NgbTimeAdapter } from "@ng-bootstrap/ng-bootstrap";
import {
  concatMap,
  debounceTime,
  distinct,
  distinctUntilChanged,
  groupBy,
  map,
  mergeAll,
  mergeMap,
  reduce,
  tap,
  toArray,
} from "rxjs/operators";
import { searchByField } from "src/app/data-access/utilities/collection.util";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
// import { DateService } from 'src/app/services/date.service';
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { ToastrService } from "ngx-toastr";

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
  selector: "app-device-history-report",
  templateUrl: "./device-history-report.component.html",
  styleUrls: ["./device-history-report.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NgbTimeAdapter, useClass: NgbTimeStringAdapter }],
})
export class DeviceHistoryReportComponent implements OnInit {
  time: string;

  company: Domain;

  readonly form: FormGroup;

  showDetails: boolean = false;

  showError: boolean = false;

  device: Device;

  deviceName: string;
  manufDeviceId: string;
  formColor: string;
  formBgColor: string;
  formFont: string;
  formFontColor: string;
  primaryColour: string;
  secondaryColour: string;
  today: any;
  searchField = new FormControl("");
  report$: Observable<Device[]> = of([]);
  constReport$: Observable<Device[]> = of([]);
  deviceMessages$: Observable<
    { id: string | DeviceMessage; value: (string | DeviceMessage)[] }[]
  >;
  permission$: Observable<CorporatePermissionCategory>;

  private rep = new BehaviorSubject<Device[]>([]);

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportService: CorporateReportHttpService,
    private readonly fb: FormBuilder,
    private sessionService: SessionStorageService,
    private dateHttp: DateHttpService,
    private toastService: ToastrService // private today: DateService,
  ) {
    this.permission$ = this.sessionService.readPermission();

    this.today = new Date();
    this.company = this.companyInfoService.getCompanyInfo();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.form = this.fb.group({
      // fromTime: ['', Validators.compose([Validators.required])],
      // toTime: ['', Validators.compose([Validators.required])],
      // from: ['', Validators.compose([Validators.required])],
      // to: ['', Validators.compose([Validators.required])],
      fromTime: ["00:00:00"],
      toTime: ["23:59:59"],
      from: [""],
      to: [""],
    });
  }

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(
        map((keywords: string) => keywords.trim())
        // debounceTime(300),
        // distinctUntilChanged()
      )
      .subscribe((keywords: string) => this._search(keywords));

    // this.constReport$ =
    this.reportService
      .generateDeviceHistory(this.company.companyId)
      .pipe(tap((devices) => this.rep.next(devices)))
      .subscribe({ error: () => {} });

    this.report$ = this.rep.asObservable();

    this.dateHttp.defaultDatesParams(this.company.companyId).subscribe(
      (data) => {
        this.form.patchValue({
          from: data[0].start_device_rep_date,
          to: data[0].end_date,
        });
      },
      () => {
        this.toastService.error("Request Timed Out");
      }
    );
  }

  _search(keywords: string) {
    if (!keywords) {
      return this.report$; //= this.constReport$;
    }

    this.report$ = this.rep.pipe(
      map((devices) => {
        return searchByField(
          devices,
          (device) => device.manufDeviceId,
          keywords
        );
      })
    );
    // console.log(keyword);
  }

  openDetails(device: Device): void {
    this.deviceMessages$ = null;
    this.deviceName = device.deviceName;
    this.manufDeviceId = device.manufDeviceId;
    this.device = device;
    this.showDetails = true;
  }

  fetchDeviceMessages() {
    this.showError = this.form.invalid ? true : false;

    if (!this.showError) {
      this.deviceMessages$ = null;

      let startDate: string =
        typeof this.form.get("from").value === "string"
          ? this.form.get("from").value                                                                                     
          : this.form.get("from").value.toISOString();
      let stopDate: string =
        typeof this.form.get("to").value === "string"
          ? this.form.get("to").value
          : this.form.get("to").value.toISOString();

      let startDeviceNetworkTime: string = `${startDate}+${this.form.get("fromTime").value}`;
      let stopDeviceNetworkTime: string = `${stopDate}+${this.form.get("toTime").value}`;

      this.deviceMessages$ = this.reportService
        .generateDeviceMessages(
          this.company.companyId,
          this.device.deviceId,
          startDeviceNetworkTime,
          stopDeviceNetworkTime
        )
        .pipe(
          concatMap(from),

          map((each: DeviceMessage) => each),

          groupBy((each) => each.devNetwkTime),

          mergeMap((group) =>
            group.pipe(
              reduce(
                (accumulate, current) => [...accumulate, current],
                [`${group.key}`]
              )
            )
          ),

          map((each) => ({ id: each[0], value: each.slice(1) })),

          toArray()
        );
    }
  }
}
