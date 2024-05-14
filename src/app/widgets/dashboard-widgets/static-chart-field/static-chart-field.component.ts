import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { DashboardHttpService } from 'src/app/data-access/http/dashboard-http.service';
import { ComboBoxOption } from '../../common-widgets/types';

@Component({
  selector: 'app-static-chart-field',
  templateUrl: './static-chart-field.component.html',
  styleUrls: ['./static-chart-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StaticChartFieldComponent),
      multi: true
    }
  ]
})
export class StaticChartFieldComponent implements OnInit {

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

    this.options$ = this.dashboardHttpService.fetchStaticChartType().pipe(map((chartType) => {
      return chartType.map((chart) => ({ key: chart.chartTypeId, value: chart.chartTypeId, label: chart.charTypeName }));
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
