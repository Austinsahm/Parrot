import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DeviceDataAccessService } from 'src/app/data-access/device-data-access.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ComboBoxOption } from '../../common-widgets/types';

@Component({
  selector: 'app-device-field',
  templateUrl: './device-field.component.html',
  styleUrls: ['./device-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DeviceFieldComponent),
      multi: true
    }
  ]
})
export class DeviceFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

  userId: string;
    


  @Input() set subdomain(value: string) {
    this.control.setValue('');
    this.options$ = this._createSourceObservable(value);
  }

  @Input() placeholder: string;
  @Input() noContentMessage: string;

  private onChange = (value: string) => { };
  onTouched = () => { };
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl('');
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dataAccessor: DeviceDataAccessService,
    private userInfoService: UserInfoService
  ) {
    this.options$ = this._createSourceObservable();
  }

  ngOnInit(): void {

    this.userId = this.userInfoService.getUserInfo().userId;

    this.control.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((value: string) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  private _createSourceObservable(subdomain?: string): Observable<ComboBoxOption<string>[]> {

    if (!subdomain) {
      return of([]);
    }

    const accessor = this.dataAccessor.getAccessor(subdomain, this.userId);

    return accessor.fetch().pipe(map((devices) => {
      return devices.map((device) => {
        return { key: device.deviceId, value: device.deviceId, label: device.deviceName };
      });
    }));
  }

  ngOnDestroy(): void {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

  writeValue(value: string): void {
    this.control.setValue(value || '');
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
}
