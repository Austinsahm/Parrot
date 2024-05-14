import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyInformation, CompanyLocation } from 'src/app/data-access/models/company.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-company-location-detail',
  templateUrl: './company-location-detail.component.html',
  styleUrls: ['./company-location-detail.component.scss']
})
export class CompanyLocationDetailComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour:string


  @Input() locationDetail: any;
  @Input() locationId: string;
  @Input() set location(value: Observable<{ company: CompanyInformation, branch: CompanyLocation }>) {
    this.locationSource$ = value?.pipe(
      tap((branch) => this._updateForm(branch?.company, branch?.branch))
    );
  };

  locationSource$: Observable<{ company: CompanyInformation, branch: CompanyLocation }>;

  locationForm: FormGroup;
  editMode = false;

  constructor(
    private activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private readonly companyInfoService: CompanyInfoService,
    ) {
    this.locationForm = this.formBuilder.group({
      locationName: ['', [Validators.required]],
      locationAddress1: ['', [Validators.required]],
      locationAddress2: new FormControl(''),
      locationAddress: new FormControl(''),
      locationDesc: new FormControl(''),
      stateId: new FormControl(''),
      cityId: new FormControl(''),
      locationId: this.locationId,
      stateName: "",
      cityName: ""
    });
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {}

  edit() {
    this.editMode = true;
  }

  private _updateForm(company: CompanyInformation, branch: CompanyLocation): void {
    this.locationForm.patchValue({
      locationAddress1: branch?.locationAddress,
      locationAddress: branch?.locationAddress,
      locationAddress2: branch?.locationAddress2,
      locationDesc: branch?.LocationDesc,
      locationId: branch?.locationId,
      locationName: branch?.locationName,
      cityId: branch.cityId,
      companyId: company.companyId,
      stateId: branch?.stateId,
      stateName: branch?.stateName,
      cityName: branch?.cityName
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  selectChangeHandlerStateName (event: any) {
    const index =  event.target.selectedIndex;
    this.locationForm.patchValue({stateName: event.target[index].text});
  }

   selectChangeHandlerCityName (event: any) {
    const index =  event.target.selectedIndex;
    this.locationForm.patchValue({cityName: event.target[index].text});
  }

  save() {
    this.activeModal.close(this.locationForm.value);
  }

}
