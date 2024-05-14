import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DeviceManufacturerTypeDataAccessService } from 'src/app/data-access/device-manufacturer-type-data-access.service';
import { DeviceManufacturerTypeDirectory } from 'src/app/data-access/models/manufacturer.model';
import { attachProgress } from 'src/app/widgets/common-widgets/functions';
import { ProgressOutput } from 'src/app/widgets/common-widgets/types';

@Component({
  selector: 'app-back-office-manufacturer-device-types',
  templateUrl: './back-office-manufacturer-device-types.component.html',
  styleUrls: ['./back-office-manufacturer-device-types.component.scss']
})
export class BackOfficeManufacturerDeviceTypesComponent implements OnInit {

  types$: Observable<ProgressOutput<DeviceManufacturerTypeDirectory[]>>;

  constructor(
    private readonly dataAccessor: DeviceManufacturerTypeDataAccessService
  ) { }

  ngOnInit(): void {
    this.types$ = attachProgress(this.dataAccessor.getDirectoryAccessor().fetch());
  }

  addHandler(): void { }
}
