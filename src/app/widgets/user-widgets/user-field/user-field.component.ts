import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { UserHttpService } from 'src/app/data-access/http/user-http.service';
import { UserDataAccviceessorService } from 'src/app/data-access/user-data-accessor.service';
import { ComboBoxOption } from '../../common-widgets/types';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-user-field',
  templateUrl: './user-field.component.html',
  styleUrls: ['./user-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UserFieldComponent),
      multi: true
    }
  ]
})
export class UserFieldComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() set companyId(value: string) {
    this.control.setValue('');
    this.options$ = this._createSourceObservable(value);
  }

  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() selectable=false

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => { };
  onTouched = () => { };
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl('');
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dataAccessor: UserDataAccviceessorService,
    private readonly userHttp:UserHttpService
  ) {
    this.options$ = this._createSourceObservable();
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((value: string) => {
      this.onChange(value);
      this.onTouched();
    });
  }

  private _createSourceObservable(companyId?: string): Observable<ComboBoxOption<string>[]> {

    if (!companyId) {
      return of([]);
    }

    const accessor = this.dataAccessor.getAccessor(companyId);

    return this.userHttp.fetchUserCombo(companyId).pipe(map((users) => {
      return users.map((user) => {
        return { key: user.userId, value: user.userId, label: `${user.lastName} ${user.firstName}` };
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

  onSelectionChange(event) {
    this.selectionChange.next(event);
  }
}
