import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { forkJoin, Observable } from "rxjs";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import { UtilityHttpService } from "src/app/data-access/http/utility-http.service";
import { DeviceAccess } from "src/app/data-access/models/company.model";
import { StatusCode } from "src/app/data-access/models/http.model";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";
// import { ToastrService } from 'ngx-toastr';
// import { ActivatedRoute, Router } from '@angular/router';
// import { StatusCode } from 'src/app/data-access/models/http.model';
@Component({
  selector: "app-corporate-user-device-access",
  templateUrl: "./corporate-user-device-access.component.html",
  styleUrls: ["./corporate-user-device-access.component.scss"],
})
export class CorporateUserDeviceAccessComponent implements OnInit {
  deviceForm: FormGroup;
  companyId: string;
  userId: string;
  templateUrl: string;
  subdomain: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;

  companyName: string;

  constDeviceAccessForm: DeviceAccess[] = [];
  constUserAccessDevice: DeviceAccess[] = [];

  deviceAccessForm: DeviceAccess[] = [];
  userAccessDevice: DeviceAccess[] = [];
  permission$: Observable<CorporatePermissionCategory>;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private userInfoService: UserInfoService,
    private utilityService: UtilityHttpService,
    private userHttpService: UserHttpService,
    private toastService: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly cd: ChangeDetectorRef,
    private sessionService: SessionStorageService
  ) {
    this.permission$ = this.sessionService.readPermission();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.deviceForm = this.formBuilder.group({
      userId: ["", [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.companyName = this.companyInfoService.getCompanyInfo().companyName;

    this.userId = this.userInfoService.getUserInfo().userId;

    this.deviceForm.get("userId").valueChanges.subscribe(
      (data) => {
        forkJoin([
          this.userHttpService.deviceAccessForm(this.subdomain, data),
          this.userHttpService.userAccessDevice(data),
        ]).subscribe(
          (result) => {
            this.constDeviceAccessForm = result[0];
            this.deviceAccessForm = result[0];
            this.userAccessDevice = result[1];
            this.constUserAccessDevice = result[1];
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
        // this.userHttpService
        //   .deviceAccessForm(this.subdomain, data)
        // .subscribe((value) => {
        //   this.constDeviceAccessForm = value;

        //   this.deviceAccessForm = value;
        // });

        // this.userHttpService.userAccessDevice(data)
        // .subscribe(
        //   (value) => {
        //     this.constUserAccessDevice = value;

        //     this.userAccessDevice = value;
        //   },
        // (error) => {
        //   if (!error.status)
        //     this.toastService.error("You might be offline 1", "Request Failed");
        //   else this.toastService.error("Unknown Error", "");
        // }
        // );
      },
      () => {}
    );
  }

  cancel() {
    // this.deviceForm.reset();
    if (this.deviceForm.touched) {
      // window.location.reload();
      this.reloadComponent();
    }
  }
  changeCompany(event) {
    this.companyId = this.deviceForm.get("companyId").value;
    this.templateUrl = this.utilityService.buildTemplateUrl(
      `utility/bulk-upload-device-template/companyId/${this.companyId}`
    );
  }
  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer == event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  submit() {
    const userId = this.deviceForm.get("userId").value;
    const data = this.userAccessDevice.map((each) => ({
      userId: userId,
      deviceId: each.deviceId,
    }));

    this.userHttpService.insertUserDevice(data).subscribe(
      (res) => {
        this.toastService.success("User Device Assign", "Successful");
        this.router.navigate(["./"], { relativeTo: this.route });
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline 3", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  availableDeviceSearch(event) {
    let manufDeviceId: string = event.target.value ?? "";

    this.deviceAccessForm = this.constDeviceAccessForm.filter((each) =>
      each.manufDeviceId.toLowerCase().includes(manufDeviceId.toLowerCase())
    );
  }

  assignDeviceSearch(event) {
    let manufDeviceId: string = event.target.value ?? "";

    this.userAccessDevice = this.constUserAccessDevice.filter((each) =>
      each.manufDeviceId.toLowerCase().includes(manufDeviceId.toLowerCase())
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}
