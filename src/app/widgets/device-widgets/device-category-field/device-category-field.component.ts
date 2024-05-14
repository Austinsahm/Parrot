import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { ActivatedRoute } from "@angular/router";
import { Observable, of, Subject } from "rxjs";
import { map, takeUntil, tap } from "rxjs/operators";
import { DeviceCategoryDataAccessService } from "src/app/data-access/device-category-data-access.service";
import { DeviceDirectoryStoreService } from "src/app/data-access/store/device-directory-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../../common-widgets/types";
// import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";

@Component({
  selector: "app-device-category-field",
  templateUrl: "./device-category-field.component.html",
  styleUrls: ["./device-category-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceCategoryFieldComponent),
      multi: true,
    },
  ],
})
export class DeviceCategoryFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  companyId: string;

  @Input() set subdomain(value: string) {
    this.control.setValue("");
    this.companyId = value;
    this.options$ = this._createSourceObservable(value);
  }

  @Input() set fromCategoryFn(value: string) {
    this.options$ = this._createSourceObservable(this.companyId, value);
  }
  @Input() set networkId(value: string) {
    this.options$ = this._createSourceObservable(this.companyId, "", value);
  }

  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable: boolean = false;
  @Input() defaultValue: string;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dataAccessor: DeviceCategoryDataAccessService,
    private deviceDirStore: DeviceDirectoryStoreService,
    protected readonly companyInfoService: CompanyInfoService,
    // private readonly dashboardHttpService: DashboardHttpService,
    private route: ActivatedRoute
  ) {
    this.options$ = this._createSourceObservable();
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });
    // console.log(this.networkId);
  }
  ngOnChanges(): void {
    // console.log(this.networkId);
  }

  private _createSourceObservable(
    subdomain?: string,
    deviceCategName?: string,
    networkId?: string
  ): Observable<ComboBoxOption<string>[]> {
    // console.log(networkId);
    if (!subdomain) {
      return of([]);
    }
    this.deviceDirStore.getDeviceCategoryDirectory(subdomain, deviceCategName);
    // const accessor =
    // this.dataAccessor.getAccessor(
    //   subdomain,
    //   deviceCategName
    // ).directory;

    // return accessor.fetch()
    return this.deviceDirStore.deviceCategoryDirectory$.pipe(
      map((categories) => {
        let filterByNetworkId = categories.filter(
          (network) => network.networkId === networkId
        );
        if (networkId) {
          return filterByNetworkId.map((category) => {
            return {
              key: category.deviceCategId,
              value: category.deviceCategId,
              label: `${category.deviceCategName} - ${category?.companyName}`,
            };
          });
        };
        return categories.map((category) => {
          return {
            key: category.deviceCategId,
            value: category.deviceCategId,
            label: `${category.deviceCategName} - ${category?.companyName}`,
          };
        });
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  writeValue(value: string): void {
    this.control.setValue(value || "");
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}
