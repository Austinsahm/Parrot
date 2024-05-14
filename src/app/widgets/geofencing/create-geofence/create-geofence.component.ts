import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSelectChange } from "@angular/material/select";
import { ToastrService } from "ngx-toastr";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { GoogleMapLoader } from "../google-map-loader";
import {} from "@angular/google-maps";
import { WriteStatusCode } from "src/app/data-access/models/http.model";
import {
  Points,
  Shape,
  ShapeName,
} from "src/app/data-access/models/geofencing.model";

@Component({
  selector: "app-create-geofence",
  templateUrl: "./create-geofence.component.html",
  styleUrls: ["./create-geofence.component.scss"],
})
export class CreateGeofenceComponent implements OnInit, AfterViewInit {
  @ViewChild("map") mapElementRef: ElementRef;
  @Input() taskOptions: ComboBoxOption<string>[];
  @Input() companyId: string;
  @Input() isDeviceCategory: string;

  @Output() selectedTask = new EventEmitter<string>();
  @Output() selectedDeviceCategory = new EventEmitter<string>();

  formColor: string;
  formBgColor: string;
  formFont: string;
  form: FormGroup;

  showPanorama = false;
  panorama;
  togglePanoramaState = false;
  geofencing: Shape[] = [];
  geofenceCount = 0;
  enableGeofence = false;

  GoogleMap;
  map: google.maps.Map;

  constructor(
    private readonly dashboard: DashboardHttpService,
    private renderer: Renderer2,
    private readonly fb: FormBuilder,
    private gMapLoader: GoogleMapLoader,
    private readonly dateService: DateHttpService,
    private toastService: ToastrService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      newGeofence: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const mapControls = {
      zoom: 14,
      center: { lat: 7.37, lng: 3.94 },
      streetViewControl: false,
    };

    this.gMapLoader
      .loadGoogleMap()
      .then((googleMaps) => {
        this.GoogleMap = googleMaps;
        const mapElement = this.mapElementRef.nativeElement;

        this.map = new googleMaps.Map(mapElement, mapControls);

        googleMaps.event.addListenerOnce(this.map, "idle", () => {
          this.renderer.addClass(mapElement, "visible");
        });

        this.showGeofencingTools();

        this.fetchGoogleStreet(mapControls.center);
      })
      .catch((e) => this.toastService.error("Map cannot be loaded", ""));
  }

  updateMapView(): void {
    this.map.addListener("click", (mouseEvent) => {
      this.fetchGoogleStreet({
        lat: mouseEvent.latLng.lat(),
        lng: mouseEvent.latLng.lng(),
      });
    });
  }

  onGeofencingTask(e: MatSelectChange): void {
    this.selectedTask.emit(e.value);
  }

  onDeviceCategory(deviceCateforyId: MatSelectChange) {
    this.selectedDeviceCategory.emit(deviceCateforyId.value);
  }

  onCreate(): void {
    const geofenceName: string = this.form.get("newGeofence").value;
    const formdata = {
      headerName: geofenceName,
      categoryId: this.isDeviceCategory,
      shapes: this.geofencing,
    };

    this.dashboard.saveGeofencing(formdata).subscribe(
      (res) => {
        if (res.status === WriteStatusCode.SUCCESS) {
          this.toastService.success("New Geofence Created", "Geofencing");
          this.selectedTask.emit("search");
          this.cd.markForCheck();
        } else {
          this.toastService.error("Error creating Geofence", "");
        }
      },
      (error) => {
        console.log(this.geofencing);

        this.selectedTask.emit("search");
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  geofenceCode(): string {
    this.geofenceCount = this.geofenceCount + 1;
    if (this.geofenceCount >= 1) {
      this.enableGeofence = true;
      this.cd.markForCheck();
    }
    let code = prompt("Please, enter the geofencing code");
    return code;
  }

  toggleView(): void {
    this.togglePanoramaState = this.panorama.getVisible();

    if (this.togglePanoramaState === false) {
      this.panorama.setVisible(true);
    } else {
      this.panorama.setVisible(false);
    }

    // this controls the template state
    this.togglePanoramaState = !this.togglePanoramaState;
  }

  fetchGoogleStreet(location: Points): void {
    new this.GoogleMap.StreetViewService()
      .getPanorama({
        location,
        radius: 100,
      })
      .then(({ data }) => {
        this.showPanorama = true;
        this.processStreetViewData(data);
      })
      .catch(() => (this.showPanorama = false));
  }

  processStreetViewData(data): void {
    const location = data.location;
    this.panoramaView(location.pano);
  }

  panoramaView(location: Points): void {
    this.panorama = this.map.getStreetView();

    this.panorama.setPano(location);

    this.panorama.setPov({ heading: 265, pitch: 0 });

    this.map.setStreetView(this.panorama);
  }

  private showGeofencingTools() {
    const drawingManager = new this.GoogleMap.drawing.DrawingManager({
      drawingControl: true,
      drawingControlOptions: {
        position: this.GoogleMap.ControlPosition.TOP_CENTER,
        drawingModes: [
          this.GoogleMap.drawing.OverlayType.CIRCLE,
          this.GoogleMap.drawing.OverlayType.POLYGON,
          // this.GoogleMap.drawing.OverlayType.POLYLINE,
          this.GoogleMap.drawing.OverlayType.RECTANGLE,
        ],
      },
    });

    drawingManager.setMap(this.map);

    this.GoogleMap.event.addListener(
      drawingManager,
      "overlaycomplete",
      (event) => {
        let code = this.geofenceCode();
        if (!code) {
          return event.overlay.setMap(null);
        }
        code = code.replace(/\s+/g, "").toUpperCase();

        let len = code.length;

        let sameCode = this.geofencing.findIndex((g) => g.code === code);

        while (len === 0 || sameCode !== -1) {
          let code = this.geofenceCode();
          sameCode = this.geofencing.findIndex(
            (g) => g.code.toUpperCase() === code
          );
          len = code.length;
        }
        this.shapeOverlay(event, code);
        drawingManager.setDrawingMode(null);
      }
    );
  }

  shapeOverlay(event, code: string): void {
    if (event.type === "circle") {
      const radius = event.overlay.getRadius();
      const lat = event.overlay.getCenter().lat();
      const lng = event.overlay.getCenter().lng();
      const circle = {
        points: [{ lat, lng }],
        name: ShapeName.circle,
        radius,
        code,
      };
      this.geofencing.push(circle);
    }

    if (event.type === "polygon") {
      const coords = event.overlay
        .getPath()
        .getArray()
        .map((coord, i) => ({
          lat: coord.lat(),
          lng: coord.lng(),
          index: i,
        }));
      const polygon = {
        points: coords,
        name: ShapeName.polygon,
        code: "poly",
      };
      this.geofencing.push(polygon);
    }

    if (event.type === "rectangle") {
      const bounds = event.overlay.getBounds();
      const north = bounds.getNorthEast().lat();
      const south = bounds.getSouthWest().lat();
      const east = bounds.getNorthEast().lng();
      const west = bounds.getSouthWest().lng();

      const rect = {
        points: [{ east, north, south, west }],
        name: ShapeName.rect,
        code,
      };
      this.geofencing.push(rect);
    }

    // this.GoogleMap.event.removeListener(event)
  }
}
