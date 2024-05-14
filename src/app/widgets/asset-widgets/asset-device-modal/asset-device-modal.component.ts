import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import {
  DeviceDataAccessListService,
  DeviceDataAccessService,
} from "src/app/data-access/device-data-access.service";
import { Asset, AssetFormData } from "src/app/data-access/models/asset.model";
import { Device } from "src/app/data-access/models/device.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { ComboBoxOption } from "../../common-widgets/types";

@Component({
  selector: "app-asset-device-modal",
  templateUrl: "./asset-device-modal.component.html",
  styleUrls: ["./asset-device-modal.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetDeviceModalComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Input() asset: Partial<Asset & AssetFormData>;
  @Input() existingDeviceIds: string[] = [];
  @Input() set subdomain(value: string) {
    this._subdomain = value;
    this.options$ = this._createOptions(value, this.control.value).pipe(
      shareReplay(1)
    );
  }

  private _subdomain: string;

  form: FormGroup;

  control = new FormArray([]);
  values = [];

  options$: Observable<ComboBoxOption<string>[]> = of([]);

  mappings$ = of(new Map<string, Device>());

  userId: string;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dataAccessor: DeviceDataAccessListService,
    private readonly modal: NgbActiveModal,
    private userInfoService: UserInfoService,
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.form = this.fb.group({
      devices: this.fb.array([]),
    });
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
    this.options$ = this._createOptions(this._subdomain);

    this.userId = this.userInfoService.getUserInfo().userId;

    if (!this.control.length) {
      this.addControl();
    }

    this.control.valueChanges.subscribe((values: string[]) => {
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
          const nonExistingDevices = devices.filter(
            (d) => !(this.existingDeviceIds || []).includes(d.deviceId)
          );
          return nonExistingDevices.map((device) => {
            return {
              key: device.deviceId,
              value: device.deviceId,
              label: device.deviceName,
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

  saveHandler(): void {
    const source$ = this.mappings$.pipe(
      map((mappings) => {
        return (this.control.value as string[]).map((value) =>
          mappings.get(value)
        );
      })
    );

    source$.subscribe(
      (value) => this.modal.close(value),
      () => {}
    );
  }

  closeHandler(): void {
    this.modal.close();
  }

  deleteHandler(index: number): void {
    this.control.removeAt(index);

    if (!this.control.length) {
      this.addControl();
    }
  }

  onSelect(val: MatSelectChange, index: number) {
    this.values.splice(index, 1, val.value);
    this.control.setValue(this.values);
  }
}
