import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from "@angular/cdk/drag-drop";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { forkJoin } from "rxjs";
import { UserHttpService } from "src/app/data-access/http/user-http.service";
import { UtilityHttpService } from "src/app/data-access/http/utility-http.service";
import { DeviceAccess } from "src/app/data-access/models/company.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
@Component({
  selector: "app-partner-user-device-access",
  templateUrl: "./partner-user-device-access.component.html",
  styleUrls: ["./partner-user-device-access.component.scss"],
})
export class PartnerUserDeviceAccessComponent implements OnInit {
  deviceForm: FormGroup;
  companyId: string;
  templateUrl: string;
  subdomain: string;
  userId: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  constDeviceAccessForm: DeviceAccess[] = [];
  constUserAccessDevice: DeviceAccess[] = [];

  deviceAccessForm: DeviceAccess[] = [];
  userAccessDevice: DeviceAccess[] = [];
  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly formBuilder: FormBuilder,
    private utilityService: UtilityHttpService,
    private userHttpService: UserHttpService,
    private toastService: ToastrService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }
  ngOnInit(): void {
    this.deviceForm = this.formBuilder.group({
      companyId: ["", [Validators.required]],
      userId: ["", [Validators.required]],
    });
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;
  }
  cancel() {
    // this.deviceForm.reset();
    if (this.deviceForm.touched) {
      // window.location.reload();
      this.reloadComponent();
    }
  }

  changeCompany(event) {
    this.deviceForm.patchValue({ companyId: event.value });
    this.deviceAccessForm = [];
    this.userAccessDevice = [];
    this.companyId = this.deviceForm.get("companyId").value;
    this.userId = this.deviceForm.get("userId").value;

    if (!this.userId) return;
    this.userHttpService
      .deviceAccessForm(this.companyId, this.userId)
      .subscribe((value) => (this.deviceAccessForm = value));

    this.userHttpService.userAccessDevice(this.userId).subscribe(
      (value) => (this.userAccessDevice = value),
      (err) => console.log(err, "err here")
    );
  }

  changeUser(event) {
    this.deviceForm.patchValue({ userId: event.value });
    this.deviceAccessForm = [];
    this.userAccessDevice = [];

    this.userId = this.deviceForm.get("userId").value;
    this.companyId = this.deviceForm.get("companyId").value;
    if (!this.companyId) return;

    const allDevices$ = this.userHttpService.deviceAccessForm(
      this.companyId,
      this.userId
    );
    const userDevices$ = this.userHttpService.userAccessDevice(this.userId);

    forkJoin([allDevices$, userDevices$]).subscribe(
      (results) => {
        this.deviceAccessForm = results[0];
        this.userAccessDevice = results[1];
      },
      (err) => {
        if (!err.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );

    // this.userHttpService
    //   .deviceAccessForm(this.companyId, this.userId)
    //   .subscribe((value) => (this.deviceAccessForm = value));

    // this.userHttpService
    //   .userAccessDevice(this.userId)
    //   .subscribe((value) => (this.userAccessDevice = value));
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
  filterManufDeviceId(manufDeviceId: string) {
    console.log(manufDeviceId);
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
          this.toastService.error(
            "You can't make the request, You are offline",
            ""
          );
        else this.toastService.error("Unknown errors", "");
      }
    );
  }

  availableDeviceSearch(event) {
    let manufDeviceId: string = event.target.value ?? "";

    this.deviceAccessForm = this.constDeviceAccessForm.filter((each) =>
      each.manufDeviceId.toLowerCase().includes(manufDeviceId.toLowerCase())
    );
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }

  assignDeviceSearch(event) {
    let manufDeviceId: string = event.target.value ?? "";

    this.userAccessDevice = this.constUserAccessDevice.filter((each) =>
      each.manufDeviceId.toLowerCase().includes(manufDeviceId.toLowerCase())
    );
  }
}
