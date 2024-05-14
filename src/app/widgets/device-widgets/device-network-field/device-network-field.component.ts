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
import { Observable, of, Subject } from "rxjs";
import { map, takeUntil } from "rxjs/operators";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DevicesStoreService } from "src/app/data-access/store/devices-store.service";
import { ComboBoxOption } from "../../common-widgets/types";
// import { DeviceNetworkDataAccessService } from 'src/app/data-access/device-network-data-access.service';
// import { DeviceNetworkHttpService } from 'src/app/data-access/http/device-network-http.service';

@Component({
  selector: "app-device-network-field",
  templateUrl: "./device-network-field.component.html",
  styleUrls: ["./device-network-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceNetworkFieldComponent),
      multi: true,
    },
  ],
})
export class DeviceNetworkFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable: boolean = false;

  @Input() defaultValue: string;
  @Output() networkVal = new EventEmitter();

  private onChange = (value: string) => {};
  onTouched = () => {};
  private unsubscriber = new Subject();
  disabled = false;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  control = new FormControl("");
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    // private readonly dataAccessor: DeviceNetworkDataAccessService
    private readonly dashboardHttpService: DashboardHttpService,
    private devicesStore: DevicesStoreService
  ) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value: string) => {
        this.onChange(value);
        this.onTouched();
      });

    // this.options$ = this.dataAccessor.fetch().pipe(map((networks) => {
    //   return networks.map((network) => ({ key: network.networkId, value: network.networkId, label: network.networkName }));
    // }));
    this.options$ = this.devicesStore.deviceNetworks$.pipe(
      map((networks) => {
        if (this.selectable) {
          networks.push({
            networkId: "ALL",
            networkName: "All",
          });
        }
        return networks.map((network) => ({
          key: network.networkId,
          value: network.networkId,
          label: network.networkName,
        }));
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
