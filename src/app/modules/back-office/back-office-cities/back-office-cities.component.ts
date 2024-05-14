import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CityDataAccessService } from 'src/app/data-access/city-data-access.service';
import { City, CityDirectory } from 'src/app/data-access/models/location.model';
import { attachProgress } from 'src/app/widgets/common-widgets/functions';
import { ProgressOutput } from 'src/app/widgets/common-widgets/types';

@Component({
  selector: 'app-back-office-cities',
  templateUrl: './back-office-cities.component.html',
  styleUrls: ['./back-office-cities.component.scss']
})
export class BackOfficeCitiesComponent implements OnInit {

  cites$: Observable<ProgressOutput<CityDirectory[]>>;

  constructor(
    private readonly dataAccessor: CityDataAccessService
  ) { }

  ngOnInit(): void {
    this.cites$ = attachProgress(this.dataAccessor.getDirectoryAccessor().fetch());
  }

  addCityHandler(): void { }
}
