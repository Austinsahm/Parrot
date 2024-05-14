import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Domain } from '../data-access/models/domain.model';
import {CompanyInfoService} from '../services/company-info.service';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {

  companyInfo: any;
  company$: Observable<Domain>;

  constructor(
    private readonly session: SessionStorageService,
    private companyInfoService: CompanyInfoService
    ) {
    this.companyInfo = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {
    this.company$ = this.session.domain$;
  }

}
