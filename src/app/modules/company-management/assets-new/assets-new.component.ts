import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { AssetFormData } from 'src/app/data-access/models/asset.model';
import { Domain } from 'src/app/data-access/models/domain.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';

@Component({
  selector: 'app-assets-new',
  templateUrl: './assets-new.component.html',
  styleUrls: ['./assets-new.component.scss']
})
export class AssetsNewComponent implements OnInit {
  
  company: Domain;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private router: Router,
    private route: ActivatedRoute
    ) {
      this.company = this.companyInfoService.getCompanyInfo();
  }

  ngOnInit(): void {}

  cancel() {
    this.router.navigate(['../assets-list'], {relativeTo: this.route});
  }

  submit(details: AssetFormData) {
    console.log(details);
  }
}
