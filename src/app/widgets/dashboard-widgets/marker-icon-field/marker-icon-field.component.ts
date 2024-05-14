import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DashboardHttpService } from 'src/app/data-access/http/dashboard-http.service';
import { ComboBoxOption } from '../../common-widgets/types';

@Component({
  selector: 'app-marker-icon-field',
  templateUrl: './marker-icon-field.component.html',
  styleUrls: ['./marker-icon-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MarkerIconFieldComponent),
      multi: true
    }
  ]
})
export class MarkerIconFieldComponent implements OnInit {

  @Input() placeholder: string;
  @Input() noContentMessage: string;

  private onChange = (value: string) => { };
  onTouched = () => { };
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl('');
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private readonly dashboardHttpService: DashboardHttpService
  ) {
  }

  ngOnInit(): void {
    this.control.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((value: string) => {
      this.onChange(value);
      this.onTouched();
    });

    this.options$ = this.dashboardHttpService.fetchMarkerIcon().pipe(map((chartType) => {
      return chartType.map((chart) => ({ key: chart.markerIconId, value: chart.markerIconId, label: chart.iconName }));
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
