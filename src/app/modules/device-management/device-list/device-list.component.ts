import {Component, OnInit, ViewChild} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ActivatedRoute, Router} from '@angular/router';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {CompanyInfoService} from '../../../services/company-info.service';
import { Observable } from 'rxjs';
import { Device, DeviceDetail } from 'src/app/data-access/models/device.model';
import { DeviceDataAccessService } from 'src/app/data-access/device-data-access.service';
import { FormControl } from '@angular/forms';
import { UserInfoService } from 'src/app/services/user-info.service';
import { PartnerPermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {
  @ViewChild(DatatableComponent) deviceListTable: DatatableComponent;

  devices$: Observable<Device[]>;
  searchField = new FormControl('');
  formColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;


  userId: string;
  permission$: Observable<PartnerPermissionCategory>

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private router: Router,
    private route: ActivatedRoute,
    private userInfoService: UserInfoService,
    private sessionService: SessionStorageService,
    ) {
      this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
      this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
      this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.permission$ = this.sessionService.partnerReadPermission();
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;

  }

  ngOnInit(): void {
    this._search();

    this.userId = this.userInfoService.getUserInfo().userId;

    this.searchField.valueChanges.pipe(
      map((keywords: string) => keywords.trim()),
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((keywords: string) => this._search(keywords));
  }

  private _search(keywords?: string) {
    this.devices$ = this.deviceDataAccessor.getAccessor(
      this.companyInfoService.getCompanyInfo().companyId, this.userId
    ).search(keywords);
  }

  goToDeviceDetail(device: DeviceDetail) {
    this.router.navigate([`../device-detail/${device.deviceId}/companyId/${device.companyId}`], {relativeTo: this.route, queryParams: {deviceName: device.deviceName}});
  }

  addDevice() {
    this.router.navigate([`../device-new`], {relativeTo: this.route});
  }
}
