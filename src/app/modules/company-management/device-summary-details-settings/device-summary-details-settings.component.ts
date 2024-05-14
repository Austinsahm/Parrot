import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { UserInfoService } from '../../../services/user-info.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import {
  DeviceListStat,
  StaticChartValue,
  TimeSeriesChartValue,
} from "src/app/data-access/models/company.model";

@Component({
  selector: 'app-device-summary-details-settings',
  templateUrl: './device-summary-details-settings.component.html',
  styleUrls: ['./device-summary-details-settings.component.scss']
})
export class DeviceSummaryDetailsSettingsComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;
  parentCompany: string;

  settingsForm: FormGroup;

  // devices: DeviceListStat[];
  @Input() device:any;

  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
  
  

  constructor(
    fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private userInfoService: UserInfoService,
    private formBuilder: FormBuilder,
    protected readonly companyInfoService: CompanyInfoService,
  ) {     
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType; 

    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    console.log(this.device);
    
  }

  close() {
    this.activeModal.close();
  }

}


