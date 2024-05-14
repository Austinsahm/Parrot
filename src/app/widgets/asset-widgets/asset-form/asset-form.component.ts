import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AssetHttpService } from "src/app/data-access/http/asset-http.service";
import {
  AssetDetail,
  AssetFloor,
  AssetFormData,
  ContentType,
} from "src/app/data-access/models/asset.model";
import { Device } from "src/app/data-access/models/device.model";
import { Domain } from "src/app/data-access/models/domain.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { FloorPlanService } from "src/app/services/floor-plan.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { AssetDeviceModalComponent } from "../asset-device-modal/asset-device-modal.component";

@Component({
  selector: "app-asset-form",
  templateUrl: "./asset-form.component.html",
  styleUrls: ["./asset-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetFormComponent implements OnInit {
  @Output() onSave: EventEmitter<AssetFormData>;
  @Output() onClose: EventEmitter<void>;
  @Output() onDeviceNameSelected: EventEmitter<Device>;
  @Output() onDevicesChanged: EventEmitter<Device[]>;
  @Output() onDevicesModified: EventEmitter<Device>;

  @Input() company: Domain;
  @Input() editable = true;

  showTank: boolean = false;
  TANK: string = "TANK";
  PI: number = 3.14;
  tankHeight: number;
  tankDiameter: number;
  tankVolume: number;

  showFloors: boolean = false;
  Building: string = "ast01";

  @Input() set asset(value: AssetDetail) {
    this.assetValue = value;
    this.updateForm(value);
    this.toggleTankForm(value.assetTypeId);
    this.toggleFloorDetails(value.assetTypeId);
    this.assetId = value.assetId;
  }

  @Input() devices: Device[] = [];

  assetValue: AssetDetail;
  form: FormGroup;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;
  secondaryColour: string;
  assetId: string;

  contentShape: ComboBoxOption<string>[] = [
    { key: "Cylinder", value: "Cylinder", label: "Cylinder" },
    { key: "Rectangle", value: "Rectangle", label: "Rectangle" },
    { key: "Circle", value: "Circle", label: "Circle" },
  ];

  options$: Observable<ComboBoxOption<string>[]>;

  contents$: Observable<ComboBoxOption<string>[]>;

  constructor(
    private formBuilder: FormBuilder,
    private readonly modal: NgbModal,
    private readonly cd: ChangeDetectorRef,
    private assetService: AssetHttpService,
    private companyInfoService: CompanyInfoService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;

    this.onSave = new EventEmitter<AssetFormData>();
    this.onClose = new EventEmitter<void>();
    this.onDeviceNameSelected = new EventEmitter<Device>();
    this.onDevicesChanged = new EventEmitter<Device[]>();
    this.onDevicesModified = new EventEmitter<Device>();

    this.form = this.formBuilder.group({
      assetName: ["", [Validators.required]],
      assetDesc: ["", [Validators.required]],
      assetTypeId: ["", [Validators.required]],
      companyId: [""],
      locationId: ["", [Validators.required]],
      // floors: formBuilder.array([]),
    });
  }

  floorForm = this.formBuilder.group({
    floorName: new FormControl("", [Validators.required]),
    floorPlan: ["", Validators.compose([])],
  });

  ngOnInit(): void {
    this.options$ = this.assetService.fetchContentTypes().pipe(
      map((each) =>
        each.map((data) => ({
          label: data.contentType,
          value: data.contentType,
          key: data.contentType,
        }))
      )
    );

    // if (!this.floors.length) {
    //   this.addFloor();
    // }
  }

  changeAssetType(e) {
    this.form.patchValue({ assetTypeId: e.value });
    this.toggleTankForm(e.value);
  }

  changeLocation(e) {
    this.form.patchValue({ locationId: e.value });
  }

  toggleTankForm(assetTypeId?: string) {
    if (!assetTypeId) {
      this.showTank =
        this.form.get("assetTypeId").value == this.TANK ? true : false;
    } else {
      this.showTank = assetTypeId == this.TANK ? true : false;
    }

    if (this.showTank) {
      this.form.addControl(
        "assetTankModel",
        this.formBuilder.group({
          contentType: ["", [Validators.required]],
          totalVolume: [""],
          delVolume: ["", [Validators.required]],
          totalUsefVolume: ["", [Validators.required]],
          consumption: ["", [Validators.required]],
          minUsefVolume: ["", [Validators.required]],
          filling: ["", [Validators.required]],
          contentId: ["", [Validators.required]],
          contentShape: [this.contentShape[0].key, Validators.required],
          contentColor: ["green"],
          diameter: [null, [Validators.required]],
          height: [null, [Validators.required]],
          lastReading: ["", [Validators.required]],
        })
      );

      if (this.assetValue) this.updateTankForm(this.assetValue);
    } else {
      this.form.removeControl("assetTankModel");
    }
  }

  get totVol() {
    const volume = this.calculateVolume();
    return volume ? volume : 0;
  }

  set totVol(userInput) {
    return;
  }

  calculateVolume(): number {
    const radius = this.tankDiameter / 2;
    const height = this.tankHeight;
    return (
      this.PI *
      (radius ? radius : 0) *
      (radius ? radius : 0) *
      (height ? height : 0)
    );
  }

  toggleFloorDetails(assetTypeId?: string) {
    if (!assetTypeId) {
      this.showFloors =
        this.form.get("assetTypeId").value == this.Building ? true : false;
    } else {
      this.showFloors = assetTypeId == this.Building ? true : false;
    }
  }

  private updateForm(asset: AssetDetail): void {
    this.form.patchValue({
      assetName: asset?.assetName,
      assetDesc: asset?.assetDesc,
      assetTypeId: asset?.assetTypeId,
      companyId: asset?.companyId,
      locationId: asset?.locationId,
    });
  }

  private updateTankForm(asset: AssetDetail): void {
    console.log("update tank");
    this.form.get("assetTankModel").patchValue({
      contentType: asset?.contentType,
      totalVolume: asset?.totalVolume,
      delVolume: asset?.delVolume,
      totalUsefVolume: asset?.totalUsefVolume,
      consumption: asset?.consumption,
      minUsefVolume: asset?.minUsefVolume,
      filling: asset?.filling,
      contentId: asset?.contentId,
      lastReading: asset?.lastReading,
      // height: asset?.height,
      // diameter: asset?.diameter,
    });
    this.tankHeight = asset?.height;
    this.tankDiameter = asset?.diameter;

    this.getContent();
  }

  changeContentType(e) {
    this.form.get("assetTankModel").patchValue({ contentType: e.value });

    this.getContent();
  }

  changeContentId(e) {
    this.form.get("assetTankModel").patchValue({ contentId: e.value });
  }

  changeContentShape(e) {
    this.form.get("assetTankModel").patchValue({ contentShape: e.value });
  }

  getContent(): void {
    this.contents$ = of();

    let contentValue = this.form.get("assetTankModel.contentType").value;
    if (!contentValue) {
      return;
    }

    this.contents$ = this.assetService.getContentType(contentValue).pipe(
      map((each) =>
        each.map((data) => ({
          label: data.useCaseName,
          value: data.contentId,
          key: data.contentId,
        }))
      )
    );
  }

  addDevice(): void {
    this.form.markAsDirty();

    const modalRef = this.modal.open(AssetDeviceModalComponent, { size: "lg" });
    (modalRef.componentInstance as AssetDeviceModalComponent).subdomain =
      this.company?.companyId;
    (
      modalRef.componentInstance as AssetDeviceModalComponent
    ).existingDeviceIds = this.devices.map((d) => d.deviceId);

    modalRef.result.then(
      (devices: Device[]) => {
        if (!devices?.length) {
          return;
        }

        this.devices = [...this.devices, ...devices];

        this.onDevicesChanged.emit([...this.devices]);

        this.cd.detectChanges();
      },
      () => {}
    );
  }

  deviceDeleteHandler(device: Device): void {
    this.form.markAsDirty();

    this.devices = [
      ...this.devices.filter(
        (eachDevice) => eachDevice.deviceId != device.deviceId
      ),
    ];

    this.onDevicesChanged.emit(
      this.devices.filter((d) => d.deviceId !== device.deviceId)
    );

    this.onDevicesModified.emit(device);

    this.cd.detectChanges();
  }

  addFloor() {
    this.floors.push(this.floorForm);
  }

  get floors() {
    return this.form.controls["floors"] as FormArray;
  }

  removeFloor(index: number) {
    console.log(index);

    this.floors.removeAt(index);
  }

  saveHandler(): void {
    if (this.form.invalid || this.form.pristine) {
      return;
    }

    // const formData = new FormData();

    // formData.append("plan", this.form.get("floorPlan").value);

    // // handle archilogic floor plan and update the form with the id

    this.form.patchValue({ companyId: this.company?.companyId });

    this.onSave.emit(this.form.value);
  }

  closeHandler(): void {
    this.onClose.emit();
  }

  deviceSelectHandler(selection: Device): void {
    if (!selection?.deviceId) {
      return;
    }

    this.onDeviceNameSelected.emit(selection);
  }
}
