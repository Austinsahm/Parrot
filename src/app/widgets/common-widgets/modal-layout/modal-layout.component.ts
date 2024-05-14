import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-modal-layout',
  templateUrl: './modal-layout.component.html',
  styleUrls: ['./modal-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalLayoutComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
  ) { 
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType; 
  }

  ngOnInit(): void {
    
  }

}
