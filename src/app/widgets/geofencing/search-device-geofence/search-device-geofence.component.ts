import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { MatSelectChange } from "@angular/material/select";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import {
  Points,
  Shape,
  ShapeDataForm,
  ShapeName,
} from "src/app/data-access/models/geofencing.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "../../common-widgets/types";
import { GoogleMapLoader } from "../google-map-loader";
import {} from "@angular/google-maps";
import { concatMap, map } from "rxjs/operators";

type AnchorType =
  | google.maps.Marker
  | google.maps.Rectangle
  | google.maps.Circle
  | google.maps.Polygon;

@Component({
  selector: "app-search-device-geofence",
  templateUrl: "./search-device-geofence.component.html",
  styleUrls: ["./search-device-geofence.component.scss"],
})
export class SearchDeviceGeofenceComponent implements OnInit, AfterViewInit {
  @ViewChild("map") mapElementRef: ElementRef;
  @Input() taskOptions: ComboBoxOption<string>[] = [];
  @Input() companyId: string;
  @Input() isDeviceCategory: string;
  @Input() isDeviceId: string;
  @Input() deviceIdOptions$: Observable<ComboBoxOption<string>[]>;
  @Input() geofenceNameOptions$: Observable<ComboBoxOption<string>[]>;

  @Output() selectedDeviceId = new EventEmitter<string>();
  @Output() selectedDeviceCategory = new EventEmitter<string>();
  @Output() selectedTask = new EventEmitter<string>();

  formFontColor: string;
  formBgColor: string;
  formFont: string;

  showPanorama = false;
  panorama;
  togglePanoramaState = false;

  map: google.maps.Map;
  marker: google.maps.Marker;
  drawnRectangle: google.maps.Rectangle[] = [];
  drawnCircle: google.maps.Circle[] = [];
  drawnPolygon: google.maps.Polygon[] = [];
  GoogleMap;

  t = of([
    { key: "search", label: "Device ", value: "search" },
    { key: "tracing", label: "Device Tracing", value: "tracing" },
    { key: "create", label: "Create Geofence", value: "create" },
  ]);

  constructor(
    private readonly companyInfoService: CompanyInfoService,
    private readonly dashboard: DashboardHttpService,
    private renderer: Renderer2,
    private gMapLoader: GoogleMapLoader,
    private toastService: ToastrService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
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

        // this.bounds = new this.GoogleMap.LatLngBounds();

        this.fetchGoogleStreet(mapControls.center);
      })
      .catch((e) => this.toastService.error("Map cannot be loaded", ""));
  }

  onGeofencingTask(e: MatSelectChange): void {
    this.selectedTask.emit(e.value);
  }

  onDeviceCategory(deviceCateforyId: MatSelectChange) {
    this.selectedDeviceCategory.emit(deviceCateforyId.value);

    this.dashboard
      .geofencingHeader(deviceCateforyId.value)
      .pipe(
        concatMap((data) => {
          //show drawing tools once
          if (data.length) {
            return this.dashboard
              .generateGeofenceData(
                this.companyId,
                deviceCateforyId.value,
                data[0].geofencing_hder_id
              )
              .pipe(concatMap((shapes) => of(this.ondrawGeofence(shapes))));
          } else {
            this.onClearShapes();
            return of();
          }
        })
      )
      .subscribe({ error: () => {} });
  }

  onDeviceId(deviceId: MatSelectChange): void {
    this.selectedDeviceId.emit(deviceId.value);
  }

  // onGeofencingName(name: MatSelectChange): void {
  //   this.dashboard
  //     .generateGeofenceData(this.companyId, this.isDeviceCategory, name.value)
  //     .subscribe(
  //       ({ shapes }) => {
  //         if (!shapes) return this.toastService.error("No data found");
  //         if (this.GoogleMap) this.ondrawGeofence(shapes);
  //       },
  //       (error) => {
  //         if (!error.status)
  //           this.toastService.error("You might be offline", "Request Failed");
  //         else this.toastService.error("Unknown Error", "");
  //       }
  //     );
  // }

  updateMapView(): void {
    this.map.addListener("click", (mouseEvent) => {
      this.fetchGoogleStreet({
        lat: mouseEvent.latLng.lat(),
        lng: mouseEvent.latLng.lng(),
      });
    });
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

  onSearch(): void {
    this.dashboard
      .geofenceSearchPoint(this.isDeviceId)
      .pipe(
        concatMap((bound) => {
          if (bound.latitude === 0 && bound.longitude == 0) {
            return of(this.toastService.error("No data found"));
          }
          return this.dashboard
            .geofenceDetail(bound.latitude, bound.longitude)
            .pipe(
              map((address) => {
                if (!address || !address.results || !address.results.length) {
                  address.results.push({
                    formatted_address:
                      "<div>device address unavailable at the moment</div",
                  });
                }
                const formatted_address = `<div style="color:black">${address.results[0].formatted_address}</div`;

                //marker object
                this.marker = new this.GoogleMap.Marker({
                  icon: "",
                  // title: "static text",
                  position: { lat: bound.latitude, lng: bound.longitude },
                  map: this.map,
                  Animation: google.maps.Animation.DROP,
                });

                //fit bound
                const bounds = new this.GoogleMap.LatLngBounds();

                bounds.extend(this.marker.getPosition());
                this.map.fitBounds(bounds);

                //get zoom to fit bound
                const zoom = this.map.getZoom();
                this.map.setZoom(zoom > 10 ? 16 : zoom);

                //street view option
                this.fetchGoogleStreet({
                  lat: bound.latitude,
                  lng: bound.longitude,
                });

                //addressinfo window
                this.gMapLoader.viewGeofenceInfo(
                  this.marker,
                  formatted_address,
                  this.GoogleMap,
                  this.map,
                  true,
                  true
                );
              })
            );
        })
      )
      .subscribe({
        error(e) {
          if (!e.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        },
      });
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

  ondrawGeofence(shapes: ShapeDataForm): void {
    //delete drawn shapes
    // if (this.drawnCircle && this.drawnCircle.setMap) {
    // this.drawnCircle.setMap(null);
    // }
    const data = !shapes ? [] : shapes.shapes;

    this.onClearShapes();

    this.addShapesToMap(data);

    this.fitShapeToMap(data);
  }

  private addShapesToMap(shapes: Shape[]): void {
    shapes.forEach(({ code, name, points, radius }, i) => {
      // console.log(name, points[0], "every:", points);

      if (name === ShapeName.rect) {
        this.drawnRectangle[i] = new this.GoogleMap.Rectangle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.35,
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

        //load info window when clicked
        this.gMapLoader.viewGeofenceInfo(
          this.drawnRectangle[i],
          code,
          this.GoogleMap,
          this.map
        );

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
        });
        this.drawnCircle[i].setMap(this.map);

        this.fetchGoogleStreet({
          lat: points[0]["lat"],
          lng: points[0]["lng"],
        });
        // info window
        this.gMapLoader.viewGeofenceInfo(
          this.drawnCircle[i],
          code,
          this.GoogleMap,
          this.map
        );

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
        });
        this.drawnPolygon[i].setMap(this.map);
        this.fetchGoogleStreet({
          lat: points[0]["lat"],
          lng: points[0]["lng"],
        });

        // this.bounds.extend(this.drawnPolygon.getBounds());

        // info window
        this.gMapLoader.viewGeofenceInfo(
          this.drawnPolygon[i],
          code,
          this.GoogleMap,
          this.map
        );

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
}
