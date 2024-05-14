import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceManufacturerDataAccessService } from 'src/app/data-access/device-manufacturer-data-access.service';
import { DeviceManufacturer, DeviceManufacturerDirectory } from 'src/app/data-access/models/manufacturer.model';
import { attachProgress } from 'src/app/widgets/common-widgets/functions';
import { ProgressOutput } from 'src/app/widgets/common-widgets/types';

@Component({
  selector: 'app-back-office-manufacturers',
  templateUrl: './back-office-manufacturers.component.html',
  styleUrls: ['./back-office-manufacturers.component.scss']
})
export class BackOfficeManufacturersComponent implements OnInit {

  manufacturers$: Observable<ProgressOutput<DeviceManufacturerDirectory[]>>;

  constructor(
    private readonly dataAccessor: DeviceManufacturerDataAccessService
  ) { }

  ngOnInit(): void {
    this.manufacturers$ = attachProgress(this.dataAccessor.fetchDirectory())
  }

  addHandler(): void {}
}
