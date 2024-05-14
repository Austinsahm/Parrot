import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryFormData, State } from 'src/app/data-access/models/location.model';

@Component({
  selector: 'app-back-office-country-create',
  templateUrl: './back-office-country-create.component.html',
  styleUrls: ['./back-office-country-create.component.scss']
})
export class BackOfficeCountryCreateComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  cancelHandler(): void {
    console.log('kdkd')
    this.router.navigate(['countries'], { relativeTo: this.route.parent });
  }

  saveHandler(details: CountryFormData): void {
    console.log(details);
  }

  statesChangedHandler(states: State[]): void {
    console.log(states);
  }

  stateSelectedHandler(state: State): void {
    console.log(state);
  }
}
