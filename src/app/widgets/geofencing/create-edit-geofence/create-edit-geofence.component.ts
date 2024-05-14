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
import {
  Points,
  Shape,
  ShapeDataForm,
  ShapeName,
} from "src/app/data-access/models/geofencing.model";
import { ComboBoxOption } from "../../common-widgets/types";
import {} from "@angular/google-maps";
import { WriteStatusCode } from "src/app/data-access/models/http.model";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { GoogleMapLoader } from "../google-map-loader";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { ToastrService } from "ngx-toastr";
import { MatSelectChange } from "@angular/material/select";
import { concat, Observable, of } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-create-edit-geofence",
  templateUrl: "./create-edit-geofence.component.html",
  styleUrls: ["./create-edit-geofence.component.scss"],
})
export class CreateEditGeofenceComponent implements OnInit, AfterViewInit {
  @ViewChild("map") mapElementRef: ElementRef;
  @Input() taskOptions: ComboBoxOption<string>[];
  @Input() companyId: string;
  @Input() geofenceNameOptions$: Observable<ComboBoxOption<string>[]>;

  @Output() selectedTask = new EventEmitter<string>();
  @Output() selectedDeviceCategory = new EventEmitter<string>();

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  form: FormGroup;

  showPanorama = false;
  panorama;
  togglePanoramaState = false;
  geofencing: Shape[] = [];
  geofenceCount = 0;
  enableGeofence = false;
  isDeviceCategory: string;

  GoogleMap;
  map: google.maps.Map;
  drawnRectangle: google.maps.Rectangle[] = [];
  drawnCircle: google.maps.Circle[] = [];
  drawnPolygon: google.maps.Polygon[] = [];
  drawingManager;
  infoWindow = [];
  infoShapes = [];
  headerId: string;

  constructor(
    private readonly dashboard: DashboardHttpService,
    private renderer: Renderer2,
    private readonly fb: FormBuilder,
    private gMapLoader: GoogleMapLoader,
    private readonly dateService: DateHttpService,
    private toastService: ToastrService,
    private readonly cd: ChangeDetectorRef,
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.form = this.fb.group({
      newGeofence: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.renderer.setStyle(
      document.body,
      "--input-border",
      `3px solid ${this.formFontColor}`
    );
  }

  onGeofencingTask(e: MatSelectChange): void {
    this.selectedTask.emit(e.value);
  }

  onDeviceCategory(deviceCateforyId: MatSelectChange) {
    //edit and view map details
    this.dashboard
      .geofencingHeader(deviceCateforyId.value)
      .pipe(
        concatMap((data) => {
          //show drawing tools once
          if (!this.drawingManager) this.showGeofencingTools();
          if (data.length) {
            this.enableGeofence = true;
            this.form.patchValue({ newGeofence: data[0].geofencing_hder_name });
            return this.dashboard
              .generateGeofenceData(
                this.companyId,
                deviceCateforyId.value,
                data[0].geofencing_hder_id
              )
              .pipe(concatMap((shapes) => of(this.ondrawGeofence(shapes))));
          } else {
            this.enableGeofence = false;
            this.form.patchValue({ newGeofence: "" });
            this.onClearShapes();
            return of();
          }
        })
      )
      .subscribe({ error: () => {} });
    this.isDeviceCategory = deviceCateforyId.value;
  }

  ngAfterViewInit(): void {
    const mapControls = {
      zoom: 14,
      center: { lat: 7.37, lng: 3.94 },
      streetViewControl: false,
      clickableIcons: false,
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

  ondrawGeofence(shapes: ShapeDataForm): void {
    this.headerId = shapes?.headerId;
    const data = !shapes ? [] : shapes.shapes;
    this.geofencing = data;
    this.geofencing = data;
    this.onClearShapes();

    this.infoShapes = [];

    this.addShapesToMap(data);

    this.fitShapeToMap(data);
  }

  onClearShapes() {
    if (this.drawnCircle.length) {
      for (let i = 0; i < this.drawnCircle.length; i++)
        if (this.drawnCircle[i]) this.drawnCircle[i].setMap(null);
      this.drawnCircle = [];
    }
    if (this.drawnRectangle.length) {
      for (let i = 0; i < this.drawnRectangle.length; i++)
        if (this.drawnRectangle[i]) this.drawnRectangle[i].setMap(null);
      this.drawnRectangle = [];
    }
    if (this.drawnPolygon.length) {
      for (let i = 0; i < this.drawnPolygon.length; i++)
        if (this.drawnPolygon[i]) this.drawnPolygon[i].setMap(null);
      this.drawnPolygon = [];
    }
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

  geofenceCode(): string {
    this.geofenceCount = this.geofenceCount + 1;
    if (this.geofenceCount >= 1) {
      this.enableGeofence = true;
      this.cd.markForCheck();
    }
    let code = prompt("Please, enter the geofencing code");
    return code;
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
      this.addShapesToMap([circle]);
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
        code,
      };
      this.geofencing.push(polygon);
      this.addShapesToMap([polygon]);
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
      this.addShapesToMap([rect]);
    }

    // this.GoogleMap.event.removeListener(event)
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

        //check if its not unique code
        while (len === 0 || sameCode !== -1) {
          let code = this.geofenceCode();
          sameCode = this.geofencing.findIndex(
            (g) =>
              g.code.toUpperCase() === code.replace(/\s+/g, "").toUpperCase()
          );
          len = code.length;
        }

        //edit the overlay with editing tools
        this.shapeOverlay(event, code);

        //delete the original shape
        event.overlay.setMap(null);

        //deactivate the drawing poiter
        drawingManager.setDrawingMode(null);
      }
    );
    this.drawingManager = drawingManager;
  }

  private addShapesToMap(shapes: Shape[]): void {
    // this.geofencing = shapes;
    // this.geofencing =
    shapes.map(({ code, name, points, radius }, i) => {
      // console.log(name, points[0], "every:", points);

      if (name === ShapeName.rect) {
        this.drawnRectangle[i] = new this.GoogleMap.Rectangle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          draggable: true,
          editable: true,
          bounds: {
            east: points[0]["east"],
            north: points[0]["north"],
            south: points[0]["south"],
            west: points[0]["west"],
          },
        });
        //show on map
        this.drawnRectangle[i].setMap(this.map);

        //check uf street view is available
        this.fetchGoogleStreet({
          lat: points[0]["east"],
          lng: points[0]["west"],
        });
        this.infoShapes.push({ shape: this.drawnRectangle[i], code });

        //listen to drag event and update the shape data accordingly
        ["bounds_changed", "dragend"].forEach((eventName) => {
          this.drawnRectangle[i].addListener(eventName, () => {
            const bounds = this.drawnRectangle[i].getBounds()?.toJSON();

            const newRect = {
              points: [
                {
                  east: bounds.east,
                  north: bounds.north,
                  south: bounds.south,
                  west: bounds.west,
                },
              ],
              name,
              code,
            };

            const shapeIndex = this.geofencing.findIndex(
              (el) => el.code === code
            );

            this.geofencing.splice(shapeIndex, 1, newRect);
          });
        });

        //load info window when clicked
        const infoWindow = this.gMapLoader.viewGeofenceInfo(
          this.drawnRectangle[i],
          this.customHTML(code, this.drawnRectangle[i], i, shapes),
          this.GoogleMap,
          this.map
        );
        this.infoWindow.push({ infoWindow, code });
        //zoom in bounds
        // const boundRect = new this.GoogleMap.LatLng(
        //   this.drawnRectangle.getBounds()
        // );
        // // this.bounds.extend(boundRect);
        // this.map.fitBounds(this.drawnRectangle.getBounds());
      }

      if (name === ShapeName.circle) {
        this.drawnCircle[i] = new this.GoogleMap.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          center: points[0],
          radius,
          draggable: true,
          editable: true,
        });
        this.drawnCircle[i].setMap(this.map);

        this.fetchGoogleStreet({
          lat: points[0]["lat"],
          lng: points[0]["lng"],
        });

        //listen to drag event and update the shape data accordingly
        ["radius_changed", "center_changed", "dragend"].forEach((eventName) => {
          this.drawnCircle[i].addListener(eventName, () => {
            const bounds = this.drawnCircle[i];

            const newCircle = {
              points: [
                {
                  lat: bounds.getCenter().lat(),
                  lng: bounds.getCenter().lng(),
                },
              ],
              radius: bounds.getRadius().toString(),
              name,
              code,
            };

            const shapeIndex = this.geofencing.findIndex(
              (el) => el.code === code
            );

            this.geofencing.splice(shapeIndex, 1, newCircle);
          });
        });

        // this.GoogleMap.event.addListener(this.drawnCircle[i], "click", () => {
        //   console.log("click");
        this.infoShapes.push({ shape: this.drawnCircle[i], code });

        const infoWindow = this.gMapLoader.viewGeofenceInfo(
          this.drawnCircle[i],
          this.customHTML(code, this.drawnCircle[i], i, shapes),
          this.GoogleMap,
          this.map
        );
        this.infoWindow.push({ infoWindow, code });

        // });

        // });

        // fit bounds
        // this.map.fitBounds(this.drawnCircle.getBounds());
      }

      if (name === ShapeName.polygon) {
        this.drawnPolygon[i] = new this.GoogleMap.Polygon({
          paths: points,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
          draggable: true,
          editable: true,
        });
        this.drawnPolygon[i].setMap(this.map);
        this.fetchGoogleStreet({
          lat: points[0]["lat"],
          lng: points[0]["lng"],
        });

        // this.bounds.extend(this.drawnPolygon.getBounds());
        this.infoShapes.push({ shape: this.drawnPolygon[i], code });

        //listen to drag event and update the shape data accordingly
        ["insert_at", "remove_at", "set_at", "dragend"].forEach((eventName) => {
          this.drawnPolygon[i].getPath().addListener(eventName, () => {
            const coords = this.drawnPolygon[i]
              .getPath()
              .getArray()
              .map((coord, i) => ({
                lat: coord.lat(),
                lng: coord.lng(),
                index: i,
              }));

            const newPolygon = {
              points: coords,
              name: ShapeName.polygon,
              code,
            };

            const shapeIndex = this.geofencing.findIndex(
              (el) => el.code === code
            );

            this.geofencing.splice(shapeIndex, 1, newPolygon);
          });
        });

        // info window
        const infoWindow = this.gMapLoader.viewGeofenceInfo(
          this.drawnPolygon[i],
          this.customHTML(code, this.drawnPolygon[i], i, shapes),
          this.GoogleMap,
          this.map
        );
        this.infoWindow.push({ infoWindow, code });

        // this.map.fitBounds(this.drawnPolygon.bindTo());
        const bounds = new this.GoogleMap.LatLngBounds();

        this.drawnPolygon[i].getPaths().forEach((path) => {
          path.forEach((latlng) => {
            bounds.extend(latlng);
            this.map.fitBounds(bounds);
          });
        });
      }

      // this.map.fitBounds(this.bounds);
    });
  }

  customHTML(code: string, shape: any, index: number, shapes: any) {
    const container = this.renderer.createElement("div");
    this.renderer.setStyle(container, "padding-bottom", "0.3rem");
    const p1 = this.renderer.createElement("p");
    const name = this.renderer.createText(`Code: ${code}`);
    this.renderer.appendChild(p1, name);

    const button = this.renderer.createElement("ion-button");
    this.renderer.addClass(button, "del-btn");
    const buttonText = this.renderer.createText("Delete");
    button.size = "small";
    button.fill = "outline";

    button.onclick = () => {
      const infoShape = this.infoShapes.filter((el) => el.code === code)[0]
        .shape;
      const deleteShape = this.geofencing.filter((el) => el.code === code)[0];
      const deleteInfoWindow = this.infoWindow.findIndex(
        (el) => el.code === code
      );
      infoShape.setMap(null);
      this.infoWindow[deleteInfoWindow].infoWindow.close();
      this.geofencing.splice(index, 1);
    };

    this.renderer.appendChild(button, buttonText);

    this.renderer.appendChild(container, p1);
    this.renderer.appendChild(container, button);
    return container;
  }

  private fitShapeToMap(shapes: Shape[]): void {
    let points; //= new Array()
    const bounds = new this.GoogleMap.LatLngBounds();
    for (let counter = 0; counter < shapes.length; counter++) {
      switch (shapes[counter].name) {
        case ShapeName.rect:
          // points = new this.GoogleMap.LatLng(
          //   this.drawnRectangle.getBounds().getNorthEast().lat(),
          //   this.drawnRectangle.getBounds().getNorthEast().lng()
          // );
          // bounds.extend(points);

          // points = new this.GoogleMap.LatLng(
          //   this.drawnRectangle.getBounds().getSouthWest().lat(),
          //   this.drawnRectangle.getBounds().getSouthWest().lng()
          // );
          // bounds.extend(points);
          bounds.union(this.drawnRectangle[counter].getBounds());

          break;

        case ShapeName.circle:
          // console.log(circles);

          // circles.forEach((el) => {
          //   console.log(el[0]);

          //   bounds.union(new this.GoogleMap.LatLng(el[0].lat, el[0].lng).getBounds());
          // });

          // points = new this.GoogleMap.LatLng(
          //   this.drawnCircle.getBounds().getNorthEast().lat(),
          //   this.drawnCircle.getBounds().getNorthEast().lng()
          // );
          // bounds.extend(points);

          // points = new this.GoogleMap.LatLng(
          //   this.drawnCircle.getBounds().getSouthWest().lat(),
          //   this.drawnCircle.getBounds().getSouthWest().lng()
          // );
          // bounds.extend(points);
          bounds.union(this.drawnCircle[counter].getBounds());
          break;

        case ShapeName.polygon:
          this.drawnPolygon[counter].getPaths().forEach((path) => {
            path.forEach((latlng) => {
              bounds.extend(latlng);
            });
          });

        // for (let aa=0; aa < circles.length; aa++) {
        //    points = new google.maps.LatLng(circles[aa][0], circles[aa][0]);
        //   bounds.extend(points);
        // }
        // break;
      }
      this.map.fitBounds(bounds);
    }
  }

  onCreate() {
    const geofenceName = this.form.get("newGeofence").value;
    const formdata = {
      headerName: geofenceName,
      categoryId: this.isDeviceCategory,
      shapes: this.geofencing,
      headerId: this.headerId,
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
        this.selectedTask.emit("search");
        if (!error.status) this.toastService.error(error);
        else this.toastService.error("Unknown Error", "");
      }
    );
  }
}
