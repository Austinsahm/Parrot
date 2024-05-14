import { Component, OnInit } from '@angular/core';
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { UseCase } from "src/app/data-access/models/use-case.model";
import { UseCaseService } from "src/app/data-access/http/use-case.service";
import { ErrorResponse } from "src/app/data-access/models/http.model";
import { ToastrService } from "ngx-toastr";
import { Location } from "@angular/common";
import { Company } from "src/app/data-access/models/company.model";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { ActivatedRoute } from "@angular/router";
import { UserSessionInformation } from "src/app/services/user.service";
import { icon } from "leaflet";
import { usecasesIcon } from "src/app/services/utilities";

@Component({
  selector: 'app-corporate-device-usecase',
  templateUrl: './corporate-device-usecase.component.html',
  styleUrls: ['./corporate-device-usecase.component.scss']
})
export class CorporateDeviceUsecaseComponent implements OnInit {
  companyId: string;
  useCaseId: string;
  DeviceUseCase: UseCase[];
  useCaseIcon: UseCase[];
  totalDevice: number;

  constructor(
    private UseCaseService: UseCaseService,
    protected readonly companyInfoService: CompanyInfoService,
    private readonly userInfoService: UserInfoService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private companyHttpService: CompanyHttpService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.companyId = this.userInfoService.getUserInfo().userCompanyId;

    this.fetchUseCases();
  }

  fetchUseCases() { 
    this.UseCaseService.fetchUseCasesByCompany(this.companyId).subscribe(
      (value) => {

        this.DeviceUseCase = value;

        this.useCaseIcon = usecasesIcon(this.DeviceUseCase);

        if (this.DeviceUseCase.length === 1) {
          const allCases = {
            useCaseId: "ALL",
            useCaseName: "ALL",
            icon: "apps",
            deviceQty: this.DeviceUseCase[0].deviceQty,
            
          };
          this.useCaseIcon.push(allCases);
        } else {
          const totalDevices = value.reduce((a, b) => ({
            useCaseId: "ALL",
            useCaseName: "ALL",
            icon: "apps",
            deviceQty: (+a.deviceQty + +b.deviceQty).toString(),
          }));

          this.useCaseIcon.push(totalDevices);
        
        }
        
        
      },
      (error) => {
        if (error.message === ErrorResponse.NOT_FOUND)
          this.toastrService.error(error.message);
        else this.toastrService.error("Request Timed Out");
        this.back();
      }
    );
  }

  back() {
    this.location.back();
  }

}
