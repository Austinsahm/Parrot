import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryDataAccessService } from 'src/app/data-access/country-data-access.service';
import { Country } from 'src/app/data-access/models/location.model';
import { attachProgress } from 'src/app/widgets/common-widgets/functions';
import { ProgressOutput } from 'src/app/widgets/common-widgets/types';

@Component({
  selector: 'app-back-office-countries',
  templateUrl: './back-office-countries.component.html',
  styleUrls: ['./back-office-countries.component.scss']
})
export class BackOfficeCountriesComponent implements OnInit {

  countries$: Observable<ProgressOutput<Country[]>>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly dataAccessor: CountryDataAccessService
  ) { }

  ngOnInit(): void {
    this.countries$ = attachProgress(this.dataAccessor.fetch());
  }

  addCountryHandler(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
