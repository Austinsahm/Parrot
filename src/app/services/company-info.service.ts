import { Injectable } from '@angular/core';
import { Domain } from '../data-access/models/domain.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyInfoService {
  companyInfo: any;

  constructor() {
    this.companyInfo = {};
  }

  getCompanyInfo(): Domain {
    return this.companyInfo || {};
  }

  setCompanyInfo(data) {
    this.companyInfo = data || {};
  }
}
