import { Component, OnInit } from "@angular/core";
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
  selector: "app-device-use-case",
  templateUrl: "./device-use-case.component.html",
  styleUrls: ["./device-use-case.component.scss"],
})
export class DeviceUseCaseComponent implements OnInit {
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
  ) {}

  ngOnInit(): void {
    this.companyId = this.route.parent.snapshot.paramMap.get("companyId");

    this.fetchUseCases();
  }

  // usecasesIcon(useCases: UseCase[]): UseCase[] {
  //   return useCases.map((usecase) => {
  //     if (usecase.useCaseName === "Not Asssigned") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "help",
  //       };
  //     }
  //     if (usecase.useCaseName === "Agriculture") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "agriculture",
  //       };
  //     }
  //     if (usecase.useCaseName === "Fleet Management") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "local_shipping",
  //       };
  //     }
  //     if (usecase.useCaseName === "Predictive Maintenance") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "engineering",
  //       };
  //     }
  //     if (usecase.useCaseName === "Asset Tracking") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "share_location",
  //       };
  //     }
  //     if (usecase.useCaseName === "Smart Metering") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "speed"
  //       };
  //     }
  //     if (usecase.useCaseName === "Refinery Monitoring") {
  //       return {
  //         useCaseId: usecase.useCaseId,
  //         useCaseName: usecase.useCaseName,
  //         deviceQty: usecase.deviceQty,
  //         icon: "oil_barrel"
  //       };
  //     }
  //   });
  // }

  fetchUseCases() {
    // const useCaseIconList = [
    //   {
    //     useCaseName: "Not Asssigned",
    //     icon: "help",
    //   },

    //   {
    //     useCaseName: "Agriculture",
    //     icon: "agriculture",
    //   },

    //   {
    //     useCaseName: "Fleet Management",
    //     icon: "local_shipping",
    //   },

    //   {
    //     useCaseName: "Predictive Maintenance",
    //     icon: "engineering",
    //   },
    //   {
    //     useCaseName: "Asset Tracking",
    //     icon: "share_location",
    //   },

    //   {
    //     useCaseName: "Smart Metering",
    //     icon: "speed",
    //   },

    //   {
    //     useCaseName: "Refinery Monitoring",
    //     icon: "oil_barrel",
    //   },
    // ];

//*************** All the possible use-cases *****************

    // const value = [
    //   {
    //     useCaseId: "0",
    //     useCaseName: "Not Asssigned",
    //     deviceQty: "138",
    //     // icon: "help",
    //   },
    //   {
    //     useCaseId: "1",
    //     useCaseName: "Agriculture",
    //     deviceQty: "2",
    //     // icon: "agriculture",
    //   },
    //   {
    //     useCaseId: "2",
    //     useCaseName: "Asset Tracking",
    //     deviceQty: "30",
    //     // icon: "share_location",
    //   },
    //   {
    //     useCaseId: "3",
    //     useCaseName: "Predictive Maintenance",
    //     deviceQty: "17",
    //     // icon: "engineering",
    //   },
    //   {
    //     useCaseId: "4",
    //     useCaseName: "Smart Metering",
    //     deviceQty: "1",
    //     // icon: "speed"
    //   },
    //   {
    //     useCaseId: "5",
    //     useCaseName: "Fleet Management",
    //     deviceQty: "5",
    //     // icon: "local_shipping",
    //   },
    //   {
    //     useCaseId: "6",
    //     useCaseName: "Supply Chain Management",
    //     deviceQty: "2",
    //     // icon: "precision_manufacturing",
    //   },
    //   {
    //     useCaseId: "7",
    //     useCaseName: "Oil and Gas Cargo Shipping",
    //     deviceQty: "2",
    //     // icon: "oil_barrel",
    //   },
    //   {
    //     useCaseId: "8",
    //     useCaseName: "Wellhead Monitoring",
    //     deviceQty: "2",
    //     // icon: "gas_meter",
    //   },
    //   {
    //     useCaseId: "9",
    //     useCaseName: "Refinery Monitoring",
    //     deviceQty: "1",
    //     // icon: "gas_meter"
    //   },
    //   {
    //     useCaseId: "10",
    //     useCaseName: "Pipeline Monitoring",
    //     deviceQty: "2",
    //     // icon: "gas_meter",
    //   },
    //   {
    //     useCaseId: "11",
    //     useCaseName: "Offshore Oil and Gas Rig Monitoring",
    //     deviceQty: "2",
    //     // icon: "gas_meter",
    //   },
    //   {
    //     useCaseId: "12",
    //     useCaseName: "Asset Warehouse",
    //     deviceQty: "2",
    //     // icon: "warehouse",
    //   },
    //   {
    //     useCaseId: "13",
    //     useCaseName: "Computer Asset",
    //     deviceQty: "2",
    //     // icon: "devices",
    //   },
    //   {
    //     useCaseId: "14",
    //     useCaseName: "Asset Warehouse14",
    //     deviceQty: "2",
    //     // icon: "warehouse",
    //   },
    //   {
    //     useCaseId: "15",
    //     useCaseName: "Asset Warehouse_15",
    //     deviceQty: "2",
    //     // icon: "warehouse",
    //   },
    //   {
    //     useCaseId: "16",
    //     useCaseName: "Block Chain management",
    //     deviceQty: "2",
    //     // icon: "lan",
    //   },
    //   {
    //     useCaseId: "17",
    //     useCaseName: "Block Chain management",
    //     deviceQty: "2",
    //     // icon: "lan",
    //   },
    //   {
    //     useCaseId: "17",
    //     useCaseName: "Anything New",
    //     deviceQty: "2",
    //     // icon: "lan",
    //   },
    // ];

    // this.DeviceUseCase = value;

    // this.useCaseIcon = usecasesIcon(this.DeviceUseCase);

    // console.log(this.useCaseIcon);

    // if (this.DeviceUseCase.length === 1) {
    //   const allCases = {
    //     useCaseId: "ALL",
    //     useCaseName: "ALL",
    //     icon: "apps",
    //     deviceQty: this.DeviceUseCase[0].deviceQty,
    //   };
    //   this.useCaseIcon.push(allCases);
    // } else {
    //   const totalDevices = value.reduce((a, b) => ({
    //     useCaseId: "ALL",
    //     useCaseName: "ALL",
    //     icon: "apps",
    //     deviceQty: (+a.deviceQty + +b.deviceQty).toString(),
    //   }));

    //   this.useCaseIcon.push(totalDevices);
    // }

 // ********** End ******

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
          console.log(this.DeviceUseCase[0].deviceQty);
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
