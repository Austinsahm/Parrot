import { ChangeDetectionStrategy, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VisualizationTypes } from 'src/app/data-access/models/dashboard.model';
import { ComboBoxOption } from '../../common-widgets/types';

@Component({
  selector: 'app-visualization-field',
  templateUrl: './visualization-field.component.html',
  styleUrls: ['./visualization-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => VisualizationFieldComponent),
      multi: true
    }
  ]
})
export class VisualizationFieldComponent implements OnInit {

  @Input() placeholder: string;
  @Input() noContentMessage: string;

  private onChange = (value: string) => { };
  onTouched = () => { };
  private unsubscriber = new Subject();
  disabled = false;

  control = new FormControl('');
  options$: Observable<ComboBoxOption<string>[]>;

  constructor(
  ) { }

  ngOnInit(): void {

     this.control.valueChanges.pipe(takeUntil(this.unsubscriber)).subscribe((value: string) => {
      this.onChange(value);
      this.onTouched();
    });

    this.options$ = of([
      {key: VisualizationTypes.dashboard, label: VisualizationTypes.dashboard.toUpperCase(), value: VisualizationTypes.dashboard},
      {key: VisualizationTypes.geolocation, label: VisualizationTypes.geolocation.toUpperCase(), value: VisualizationTypes.geolocation},
    ])
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
