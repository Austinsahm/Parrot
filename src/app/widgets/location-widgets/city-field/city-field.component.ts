import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  OnInit,
} from "@angular/core";
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from "@angular/forms";
import { Observable, of, Subject } from "rxjs";
import { MatSelectChange } from "@angular/material/select";
import { map, takeUntil } from "rxjs/operators";
import { CityDataAccessService } from "src/app/data-access/city-data-access.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { CityHttpService } from "../../../data-access/http/city-http.service";

@Component({
  selector: "app-city-field",
  templateUrl: "./city-field.component.html",
  styleUrls: ["./city-field.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityFieldComponent),
      multi: true,
    },
  ],
})
export class CityFieldComponent
  implements OnInit, OnDestroy, ControlValueAccessor
{
  fromStateName: string;

  toStateName: string;

  fromStateId: string;

  @Input() set stateId(value: string) {
    this.control.setValue("");
    this.fromStateId = value;
    this.cities$ = this._createCitiesFromState(value);
  }
  @Input() placeholder: string;
  @Input() noContentMessage: string;
  @Input() new: boolean = false;

  @Input() set fromState(value: string) {
    this.fromStateName = value;
  }

  @Input() set toState(toStateName: string) {
    this.toStateName = toStateName;
    this.cities$ = this._createCities(
      this.fromStateId,
      this.fromStateName,
      toStateName
    );
  }

  @Input() set fromCityFn(fromCityName: string) {
    this.cities$ = this._createCities(
      this.fromStateId,
      this.fromStateName,
      this.toStateName,
      fromCityName
    );
  }
  @Input() defaultValue: string;

  @Output() selectionChange = new EventEmitter<MatSelectChange>();

  private onChange = (value: string) => {};
  public onTouched = () => {};
  private unsubscriber = new Subject();

  disabled = false;

  control = new FormControl("");

  cities$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly cityDataAccessor: CityDataAccessService,
    private cityHttp: CityHttpService
  ) {}

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(takeUntil(this.unsubscriber))
      .subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      });
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

  private _createCities(
    stateId: string,
    fromStateName: string,
    toStateName: string,
    fromCityName?: string
  ): Observable<ComboBoxOption<string>[]> {
    if (!fromStateName || !toStateName) {
      return of([]);
    }

    return this.cityDataAccessor
      .getAccessor(stateId, fromStateName, toStateName)
      .fetch(fromCityName)
      .pipe(
        map((cities) => {
          return cities.map((city) => ({
            key: city.cityId,
            value: city.cityId,
            label: city.cityName,
          }));
        })
      );
  }

  private _createCitiesFromState(
    stateId: string
  ): Observable<ComboBoxOption<string>[]> {
    if (!stateId) {
      return of([]);
    }

    return this.cityHttp.fetchDirectoryForState(stateId).pipe(
      map((cities) => {
        return cities.map((city) => ({
          key: city.cityId,
          value: city.cityId,
          label: city.cityName,
        }));
      })
    );
  }
}
