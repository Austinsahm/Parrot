import { Component, Input, OnInit } from "@angular/core";
import { AssetFloor } from "src/app/data-access/models/asset.model";
import { Observable, of } from "rxjs";
import { map, concatMap, switchMap } from "rxjs/operators";
import { FloorPlanService } from "src/app/services/floor-plan.service";
import { FloorDetails } from "src/app/data-access/models/smartHome.model";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AssetFloorModalComponent } from "../asset-floor-modal/asset-floor-modal.component";

@Component({
  selector: "app-asset-floor-viewer",
  templateUrl: "./asset-floor-viewer.component.html",
  styleUrls: ["./asset-floor-viewer.component.scss"],
})
export class AssetFloorViewerComponent implements OnInit {
  @Input() assetId: string;
  floors$: Observable<AssetFloor[]>;
  floors: AssetFloor[] = [];
  badFloors: number;

  constructor(
    private floorService: FloorPlanService,
    private toastService: ToastrService,
    private readonly modal: NgbModal
  ) {}

  ngOnInit(): void {
    // get request from parrot table
    this.floors$ = this.floorService.getAssetFloors(this.assetId);
  }

  getFloorDetails() {
    let regex = new RegExp(/[0-9][0-9][0-9]-[A-Za-z]/i);
    this.badFloors = 0;
    this.floors$ = this.floorService.getTempToken().pipe(
      concatMap((res: any) => {
        return this.floorService.getFloorIdsByAsset(
          this.assetId,
          res.authorization
        );
      }),
      switchMap((floors: FloorDetails) => {
        // check for badly named floors
        floors.features.map((floor) => {
          if (!regex.test(floor.properties.name)) {
            this.badFloors++;
          }
        });
        // display only correctly named floors
        const correctFloors = floors.features.filter((floor) =>
          regex.test(floor.properties.name)
        );
        const assetFloors: AssetFloor[] = correctFloors.map((floor) => ({
          floorNumber: +floor.properties.name.split("-")[0],
          floorName: floor.properties.name.split("-")[1],
          floorPlanId: floor.id,
          assetId: this.assetId,
        }));
        return this.floorService.postAssetFloors(assetFloors).pipe(
          map(() => {
            // notification messages
            if (this.badFloors == 1) {
              this.toastService.warning(
                "A floor is not correctly named!",
                "Asset Floor Details"
              );
            } else if (this.badFloors > 1) {
              this.toastService.warning(
                "Some floors are not correctly named!",
                "Asset Floor Details"
              );
            }
            if (assetFloors.length < 1)
              this.toastService.error(
                "No Floors in this Asset",
                "Asset Floor Details"
              );
            return assetFloors;
          })
        );
      })
    );
  }

  displayFloor(floor: AssetFloor) {
    const modalRef = this.modal.open(AssetFloorModalComponent, {
      size: "lg",
      centered: true,
    });
    (modalRef.componentInstance as AssetFloorModalComponent).floor = floor;
  }
}
