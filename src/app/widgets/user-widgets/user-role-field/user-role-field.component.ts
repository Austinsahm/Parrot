import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UserGroupDataAccessorService } from 'src/app/data-access/user-group-data-accessor.service';
import { ComboBoxOption } from '../../common-widgets/types';

@Component({
  selector: 'app-user-role-field',
  templateUrl: './user-role-field.component.html',
  styleUrls: ['./user-role-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserRoleFieldComponent),
      multi: true
    }
  ]
})
export class UserRoleFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() placeholder: string;
  @Input() noContentMessage: string;

  private onChange = (value: string) => { };
  onTouched = () => { };

  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl('');
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dataAccessor: UserGroupDataAccessorService
  ) {
    this.options$ = this._createSourceObservable();
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((value: string) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  private _createSourceObservable(): Observable<ComboBoxOption<string>[]> {
    return this.dataAccessor.fetch().pipe(map((types) => {
      return types.map((type) => {
        return { key: type.roleId, value: type.roleId, label: type.roleName };
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
