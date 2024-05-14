import { Component, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CorporatePermissionCategory, PartnerPermissionCategory } from 'src/app/data-access/models/role-authorization.model';

@Component({
  selector: 'app-device-list-details',
  templateUrl: './device-list-details.component.html',
  styleUrls: ['./device-list-details.component.scss']
})
export class DeviceListDetailsComponent implements OnInit {
  @Input() source$:Observable<any>
  @Input() permission$: Observable<PartnerPermissionCategory|CorporatePermissionCategory>
  @Input() title
  @Input() editMode:boolean
  @Input() subdomain: string
  
  @Output() edit
  @Output() addDevice
  @Output() cancel
  @Output() submit
  @Output() deleteHandler

  deviceTypeForm:FormGroup

  constructor() { }

  ngOnInit(): void {
  }

}
