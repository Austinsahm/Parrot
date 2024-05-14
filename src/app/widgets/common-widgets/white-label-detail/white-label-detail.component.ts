import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { WhiteLabel, WhiteLabelDirectory } from 'src/app/data-access/models/white-label.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-white-label-detail',
  templateUrl: './white-label-detail.component.html',
  styleUrls: ['./white-label-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WhiteLabelDetailComponent implements OnInit {
  formColor: string;
  formBgColor: string;
  formFont: string;

  @Input() company: WhiteLabel & WhiteLabelDirectory;
  
  constructor(
    protected readonly companyInfoService: CompanyInfoService,
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
   }

  ngOnInit(): void {
  }

}
