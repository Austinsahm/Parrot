import { Component, OnInit, Input, ViewChild, ElementRef } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { AssetFloor } from "src/app/data-access/models/asset.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { FloorPlanService } from "src/app/services/floor-plan.service";

@Component({
  selector: "app-asset-floor-modal",
  templateUrl: "./asset-floor-modal.component.html",
  styleUrls: ["./asset-floor-modal.component.scss"],
})
export class AssetFloorModalComponent implements OnInit {
  @ViewChild("floorPlan", { static: true }) floorPlan!: ElementRef;
  @Input() floor: AssetFloor;

  formColor: string;
  formBgColor: string;
  formFont: string;

  floorPlanController: any;

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    public modal: NgbActiveModal,
    private floorService: FloorPlanService
  ) {
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.loadFloorPreview(this.floor.floorPlanId);
  }

  loadFloorPreview(floorId: string) {
    this.floorService.getTempToken().subscribe(
      (res: any) => {
        this.floorService.loadFloorSdk().then((floorSdk) => {
          const floorEl = this.floorPlan.nativeElement;
          const floorPlanStartupSettings = {
            hideElements: ["roomStamp"],
            panZoom: false,
            planRotation: 0,
            roomStampSize: null,
            ui: {
              menu: false,
              scale: false,
              coordinates: false,
            },
            theme: {
              background: {
                color: "#f3f5f8",
                showGrid: false,
              },
              wallContours: false,
              elements: {
                roomstamp: { showArea: false },
                asset: { fill: [255, 255, 255] },
              },
            },
            units: {
              system: "metric",
              digits: 0,
              roomDimensions: "area",
            },
          };

          this.floorPlanController = new floorSdk.FloorPlanEngine(
            floorEl,
            floorPlanStartupSettings
          );

          // load floor plan
          this.floorPlanController.loadScene(floorId, {
            authorization: res.authorization,
          });
        });
      },
      () => {}
    );
  }
}
