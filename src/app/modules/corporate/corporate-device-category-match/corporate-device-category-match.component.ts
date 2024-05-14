import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilityHttpService } from 'src/app/data-access/http/utility-http.service';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { UserInfoService } from 'src/app/services/user-info.service';
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StatusCode } from 'src/app/data-access/models/http.model';

@Component({
  selector: 'app-corporate-device-category-match',
  templateUrl: './corporate-device-category-match.component.html',
  styleUrls: ['./corporate-device-category-match.component.scss']
})
export class CorporateDeviceCategoryMatchComponent implements OnInit {

  deviceForm: FormGroup;
  companyId: string;
  userId: string;
  templateUrl: string;
  subdomain: string;
  
  names: string[];
  selectedNames: string[];

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private utilityService: UtilityHttpService,
    // private toastService: ToastrService,
    // private readonly router: Router,
    // private readonly route: ActivatedRoute,
  ) { 

    this.deviceForm = this.formBuilder.group({
      clientDeviceCategId: ['', [Validators.required]],      
      companyId: ['', [Validators.required]],      
    });

  }

  ngOnInit(): void {

    this.names = [
      "bash", "tope", "james", "homes", "adessz", "tobss", "damss", "lolaa", "adebanjoss", "steve", "jobs", "nats", "taisss"
    ]

    this.selectedNames = [];

    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
    this.userId = this.userInfoService.getUserInfo().userId;
  }

  cancel() {
    this.deviceForm.reset();
  }

  changeCompany(event){
    this.companyId = this.deviceForm.get('companyId').value;
    this.templateUrl = this.utilityService.buildTemplateUrl(`utility/bulk-upload-device-template/companyId/${this.companyId}`);
  }

  onDrop(event: CdkDragDrop<string[]>){

    if(event.previousContainer == event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }else{
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex )
    }
  }

  submit() {

    // const formData = new FormData();
    // formData.append('uploadFile', this.deviceForm.get('fileSource').value);
    // formData.append('userId', this.userId);
    // formData.append('companyId', this.companyId);

    // this.utilityService.bulkDeviceUpload(formData).subscribe((res) => { console.log(res)
      
    //   this.utilityService.downLoadFile(res, "application/ms-excel");
      
    // }, (error) => {
    //   this.toastService.error(error.message, '');
    // });

    // this.deviceForm.reset();
  }

}
