import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyUser } from 'src/app/data-access/models/company.model';
import { UserGroup } from 'src/app/data-access/models/group.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-partner-user-detail-view',
  templateUrl: './partner-user-detail-view.component.html',
  styleUrls: ['./partner-user-detail-view.component.scss']
})
export class PartnerUserDetailViewComponent implements OnInit {
  formBgColor: string;
  formColor: string;
  formFont: string;
  primaryColour:string;

  @Output() onClose: EventEmitter<void>;

  @Input() user: CompanyUser;
  @Input() groups: UserGroup[] = [];

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
  ) {
    this.onClose = new EventEmitter<void>();
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
  }

}
