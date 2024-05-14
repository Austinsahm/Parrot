import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssetDataAccessService } from 'src/app/data-access/asset-data-access.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { Asset, AssetFormData, AssetType } from 'src/app/data-access/models/asset.model';
import { Observable, zip } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { AssetTypeDataAccessService } from 'src/app/data-access/asset-type-data-access.service';
import { Company } from 'src/app/data-access/models/company.model';
import { CompanyDataAccessService } from 'src/app/data-access/company-data-access.service';
import { DeviceDataAccessService } from 'src/app/data-access/device-data-access.service';
import { Device } from 'src/app/data-access/models/device.model';
import { Domain } from 'src/app/data-access/models/domain.model';

@Component({
  selector: 'app-assets-detail',
  templateUrl: './assets-detail.component.html',
  styleUrls: ['./assets-detail.component.scss']
})
export class AssetsDetailComponent implements OnInit {

  editMode = false;
  source$: Observable<{ asset: Asset, type: AssetType, company: Company, devices: Device[] }>;
  company: Domain;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly dataAccessor: AssetDataAccessService,
    private readonly typeDataAccessor: AssetTypeDataAccessService,
    private readonly companyDataAccessor: CompanyDataAccessService,
    private readonly deviceDataAccessor: DeviceDataAccessService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.company = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {
    this.source$ = this.route.paramMap.pipe(
      concatMap((params) => this._createSourceObservable(params.get('id')))
    );
  }

  private _createSourceObservable(assetId: string): Observable<{ asset: Asset, type: AssetType, company: Company, devices: Device[] }> {
    return this.dataAccessor.getAccessor(this.company?.companyId).findById(assetId).pipe(
      concatMap((asset) => {
        return zip(
          this.companyDataAccessor.getAccessor(this.company?.companyId).findByName(asset.companyName),
          //this.companyDataAccessor.getAccessor(this.subdomain).findLocationByName(asset.locationName),
          this.typeDataAccessor.findByName(asset.assetTypeName),
          this.deviceDataAccessor.getAccessor(this.company?.companyId).fetchByAssetName(asset.assetName)
        ).pipe(map(([company, type, devices]) => {
          return { asset, type, company, devices };
        }));
      })
    );
  }

  edit() {
    this.editMode = true;
  }

  cancel() {
    this.router.navigate(['../../assets-list'], { relativeTo: this.route });
  }

  submit(details: AssetFormData) {
    console.log(details);
  }
}
