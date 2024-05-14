import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CompanyLocationReportEntry, CompanyLocationReportFilter } from 'src/app/data-access/models/report.model';
import { PartnerPermissionCategory } from 'src/app/data-access/models/role-authorization.model';
import { ReportDataAccessorService } from 'src/app/data-access/report-data-accessor.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-company-location-report',
  templateUrl: './company-location-report.component.html',
  styleUrls: ['./company-location-report.component.scss']
})
export class CompanyLocationReportComponent implements OnInit {

  company: Domain;
  formColor: string;
  formBgColor: string;
  formFont: string;

  report$: Observable<CompanyLocationReportEntry[]>;
  inFilterMode = true;
  permission$: Observable<PartnerPermissionCategory>


  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly reportDataAccessor: ReportDataAccessorService,
    private sessionService: SessionStorageService,
    private today: DateService

  ) {
    this.permission$ = this.sessionService.partnerReadPermission()

    this.company = this.companyInfoService.getCompanyInfo();
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
  }

  cancelHandler(): void { }

  saveHandler(filters: CompanyLocationReportFilter): void {
    this.inFilterMode = false;
    if(!filters.typeId){
      filters.typeId='ALL'
     }
     
     if(!filters.from){
       filters.from='2020-02-21'
      }
 
     if(!filters.to){
       filters.to=this.today.currentDate()
      }
 
     if(!filters.statusId){
       filters.statusId='ALL'
      }
    
    if(!filters.toState){
      filters.toState='Alabama'
      }
       
    if(!filters.fromState){
      filters.fromState='New York'
      }
   
    if(!filters.toCity){
      filters.toCity='accra'
      }
   
    if(!filters.fromCity){
      filters.fromCity='Washington'
      }
 
     console.log(filters)
    this.report$ = this.reportDataAccessor.generateCompanyByLocationReport(this.company.companyId, filters);
  }

}
