import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, forkJoin, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { DeviceDataAccessService } from "src/app/data-access/device-data-access.service";
import {
  Device,
  DeviceCategory,
} from "src/app/data-access/models/device.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-device-category-device-modal",
  templateUrl: "./device-category-device-modal.component.html",
  styleUrls: ["./device-category-device-modal.component.scss"],
})
export class DeviceCategoryDeviceModalComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Input() set subdomain(value: string) {
    this._subdomain = value;
    this.options$ = this._createOptions(value, this.control.value).pipe(
      shareReplay(1)
    );
  }

  @Input() existingDeviceIds: string[] = [];

  @Input() category: DeviceCategory;
  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private _subdomain: string;

  form: FormGroup;

  control = new FormArray([]);
  values = [];

  options$: Observable<ComboBoxOption<string>[]> = of([]);

  mappings$ = of(new Map<string, Device>());

  userId: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataAccessor: DeviceDataAccessService,
    private readonly modal: NgbActiveModal,
    private userInfoService: UserInfoService,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.primaryColour = companyInfoService.getCompanyInfo().primaryColour;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.form = this.fb.group({
      devices: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.options$ = this._createOptions(this._subdomain);

    this.userId = this.userInfoService.getUserInfo().userId;

    if (!this.control.length) {
      this.addControl();
    }

    this.control.valueChanges.subscribe((values: string[]) => {
      console.log(values);

      this.options$ = this._createOptions(this._subdomain, values).pipe(
        shareReplay(1)
      );

      this.mappings$ = this.dataAccessor
        .getAccessor(this._subdomain, this.userId)
        .fetch()
        .pipe(
          map((devices) => {
            return new Map<string, Device>(
              devices.map((device) => [device.deviceId, device])
            );
          })
        )
        .pipe(shareReplay(1));
    });
  }

  private _createOptions(
    subdomain?: string,
    selections: string[] = []
  ): Observable<ComboBoxOption<string>[]> {
    if (!subdomain) {
      return of([]);
    }

    return this.dataAccessor
      .getAccessor(subdomain, this.userId)
      .fetch()
      .pipe(
        map((devices) => {
          const nonexistingDevices = devices.filter(
            (device) => !this.existingDeviceIds.includes(device.deviceId)
          );
          return nonexistingDevices.map((device) => {
            return {
              key: device.deviceId,
              value: device.deviceId,
              label: device.manufDeviceId,
              disabled: selections.includes(device.deviceId),
            };
          });
        })
      );
  }

  addControl(): void {
    this.control.push(
      new FormControl("", Validators.compose([Validators.required]))
    );
  }

  deleteHandler(index: number): void {
    this.control.removeAt(index);

    if (!this.control.length) {
      this.addControl();
    }
  }

  saveHandler(): void {
    const source$ = this.mappings$.pipe(
      map((mappings) => {
        return (this.control.value as string[]).map((curId) =>
          mappings.get(curId)
        );
      })
    );

    source$.subscribe(this.modal.close, () => {});
  }

  closeHandler(): void {
    this.modal.close();
  }

  onSelectionChange(event: MatSelectChange, index: number) {
    this.values.splice(index, 1, event.value);
    this.control.setValue(this.values);
  }
}
