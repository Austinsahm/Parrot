import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyDataAccessService } from './company-data-access.service';
import { DeviceDataAccessListService, DeviceDataAccessService } from './device-data-access.service';
import { DomainDataAccessService } from './domain-data-access.service';
import { DomainHttpService } from './http/domain-http.service';
import { DeviceHttpService } from './http/device-http.service';
import { DeviceCategoryHttpService } from './http/device-category-http.service';
import { AssetHttpService } from './http/asset-http.service';
import { UserHttpService } from './http/user-http.service';
import { CompanyHttpService } from './http/company-http.service';
import { CompanyDetailHttpService } from './http/company-detail-http.service';
import { CompanyDetailDataAccessService } from './company-detail-data-access.service';
import { CityHttpService } from './http/city-http.service';
import { StateHttpService } from './http/state-http.service';
import { CountryHttpService } from './http/country-http.service';
import { StateDataAccessService } from './state-data-access.service';
import { CountryDataAccessService } from './country-data-access.service';
import { CityDataAccessService } from './city-data-access.service';
import { CompanyTypeDataAccessService } from './company-type-data-access.service';
import { CompanyTypeHttpService } from './http/company-type-http.service';
import { CompanyBranchHttpService } from './http/company-branch-http.service';
import { CompanyBranchDataAccessService } from './company-branch-data-access.service';
import { AssetDataAccessService } from './asset-data-access.service';
import { StatusHttpService } from './http/status-http.service';
import { StatusDataAccessService } from './status-data-access.service';
import { DeviceCategoryDataAccessService } from './device-category-data-access.service';
import { DeviceManufacturerHttpService } from './http/device-manufacturer-http.service';
import { DeviceManufacturerDataAccessService } from './device-manufacturer-data-access.service';
import { DeviceNetworkDataAccessService } from './device-network-data-access.service';
import { DeviceNetworkHttpService } from './http/device-network-http.service';
import { AssetTypeHttpService } from './http/asset-type-http.service';
import { AssetTypeDataAccessService } from './asset-type-data-access.service';
import { DeviceManufacturerTypeHttpService } from './http/device-manufacturer-type-http.service';
import { DeviceManufacturerTypeDataAccessService } from './device-manufacturer-type-data-access.service';
import { WhiteLabelDataAccessService } from './white-label-data-access.service';
import { WhiteLabelHttpService } from './http/white-label-http.service';
import { DeviceSensorDataAccessorService } from './device-sensor-data-accessor.service';
import { DeviceSensorHttpService } from './http/device-sensor-http.service';
import { UserGroupDataAccessorService } from './user-group-data-accessor.service';
import { UserGroupHttpService } from './http/user-group-http.service';
import { UserDataAccviceessorService } from './user-data-accessor.service';
import { UserTypeHttpService } from './http/user-type-http.service';
import { UserTypeDataAccessorService } from './user-type-data-accessor.service';
import { ReportHttpService } from './http/report-http.service';
import { ReportDataAccessorService } from './report-data-accessor.service';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule
  ],
  providers: [
    DomainHttpService,
    CompanyHttpService,
    CompanyDetailHttpService,
    DeviceHttpService,
    DeviceCategoryHttpService,
    DomainHttpService,
    AssetHttpService,
    UserHttpService,
    CityHttpService,
    StateHttpService,
    CountryHttpService,
    CompanyTypeHttpService,
    CompanyBranchHttpService,
    StatusHttpService,
    WhiteLabelHttpService,
    DeviceCategoryHttpService,
    DeviceNetworkHttpService,
    AssetTypeHttpService,
    DeviceManufacturerHttpService,
    DeviceManufacturerTypeHttpService,
    DeviceSensorHttpService,
    UserGroupHttpService,
    CompanyDataAccessService,
    CompanyDetailDataAccessService,
    DeviceDataAccessService,
    DeviceDataAccessListService,
    DomainDataAccessService,
    AssetDataAccessService,
    CityDataAccessService,
    StateDataAccessService,
    CountryDataAccessService,
    CompanyTypeDataAccessService,
    CompanyBranchDataAccessService,
    StatusDataAccessService,
    DeviceCategoryDataAccessService,
    DeviceManufacturerDataAccessService,
    DeviceNetworkDataAccessService,
    AssetTypeDataAccessService,
    DeviceManufacturerTypeDataAccessService,
    WhiteLabelDataAccessService,
    DeviceSensorDataAccessorService,
    UserGroupDataAccessorService,
    UserDataAccviceessorService,
    UserTypeHttpService,
    UserTypeDataAccessorService,
    ReportHttpService,
    ReportDataAccessorService
  ]
})
export class DataAccessModule { }
