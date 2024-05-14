import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Device } from 'src/app/data-access/models/device.model';

@Component({
  selector: 'app-asset-device-list',
  templateUrl: './asset-device-list.component.html',
  styleUrls: ['./asset-device-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssetDeviceListComponent implements OnInit {

  @Output() onNameSelected: EventEmitter<Device>;
  @Output() onDelete: EventEmitter<Device>;

  @Input() devices: Device[] = [];
  @Input() editing = false;
  
  constructor() {
    this.onNameSelected = new EventEmitter<Device>();
    this.onDelete = new EventEmitter<Device>();
   }

  ngOnInit(): void { 
  }

}
