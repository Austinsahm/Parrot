import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryDetail, CountryFormData, State } from 'src/app/data-access/models/location.model';

@Component({
  selector: 'app-country-form',
  templateUrl: './country-form.component.html',
  styleUrls: ['./country-form.component.scss']
})
export class CountryFormComponent implements OnInit {

  @Output() onStatesChanged: EventEmitter<State[]>;
  @Output() onStateSelected: EventEmitter<State>;
  @Output() onSave: EventEmitter<CountryFormData>;
  @Output() onCancel: EventEmitter<void>;

  @Input() set country(value: CountryDetail) {
    this.form.patchValue(value || {});
  }

  @Input() states: State[] = [];

  form: FormGroup;
  
  constructor(
    private readonly fb: FormBuilder,
  ) {
    this.onStatesChanged = new EventEmitter<State[]>();
    this.onStateSelected = new EventEmitter<State>();
    this.onSave = new EventEmitter<CountryFormData>();
    this.onCancel = new EventEmitter<void>();

    this.form = this.fb.group({
      countryId: ['', Validators.compose([Validators.required])],
      countryName: ['', Validators.compose([Validators.required])],
      countryDesc: ['', Validators.compose([Validators.required])],
      currency: ['', Validators.compose([Validators.required])],
      currencySymbol: ['', Validators.compose([Validators.required])],
      usExchangeRate: ['', Validators.compose([Validators.required])],
      ukExchangeRate: ['', Validators.compose([Validators.required])],
      euExchangeRate: ['', Validators.compose([Validators.required])]
    });
   }

  ngOnInit(): void {}

  stateDeleteHandler(state: State): void {
    this.onStatesChanged.emit(this.states.filter(s => s.stateid !== state.stateid));
  }

  addStateHandler(): void {}

  saveHandler(): void {}
}
