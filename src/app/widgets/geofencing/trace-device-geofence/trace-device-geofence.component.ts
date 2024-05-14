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
  OnDestroy,
} from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { ComboBoxOption } from "../../common-widgets/types";
import {} from "@angular/google-maps";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { GoogleMapLoader } from "../google-map-loader";
import { ToastrService } from "ngx-toastr";
import { MatSelectChange } from "@angular/material/select";
import { FormBuilder, FormGroup } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import * as _moment from "moment";
import {
  DeviceCoordinates,
  GeofenceDataSource,
  Points,
} from "src/app/data-access/models/geofencing.model";
import { WirelessStatus } from "src/app/data-access/models/device.model";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-trace-device-geofence",
  templateUrl: "./trace-device-geofence.component.html",
  styleUrls: ["./trace-device-geofence.component.scss"],
})
export class TraceDeviceGeofenceComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild("map") mapElementRef: ElementRef;
  @Input() taskOptions: ComboBoxOption<string>[];
  @Input() companyId: string;
  @Input() isDeviceCategory: string;
  @Input() isDeviceId: string;
  @Input() deviceIdOptions$: Observable<ComboBoxOption<string>[]>;

  @Output() selectedDeviceId = new EventEmitter<string>();
  @Output() selectedDeviceCategory = new EventEmitter<string>();
  @Output() selectedTask = new EventEmitter<string>();

  geodataSourceOptions: ComboBoxOption<string>[];
  geodataDisplayOptions: ComboBoxOption<string>[];
  markerSpeeedOptions: ComboBoxOption<string>[];
  markerIconOptions: ComboBoxOption<string>[];

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  form: FormGroup;

  geodataSource: string;
  geodataDisplay: string;
  markerSpeed: string;
  markerIcon: string;
  today: Date;
  moment = _moment;

  map: google.maps.Map;
  deviceInfo: google.maps.InfoWindow;
  marker: google.maps.Marker;
  GoogleMap;
  // bounds: google.maps.LatLngBounds;
  animatingPath: google.maps.Polyline;

  showPanorama = false;
  panorama;
  togglePanoramaState = false;

  geofenceSourceResult: GeofenceDataSource[];
  IconOverlay;
  customMarkers = [];

  subscription: Subscription;

  constructor(
    private readonly dashboard: DashboardHttpService,
    private renderer: Renderer2,
    private readonly fb: FormBuilder,
    private gMapLoader: GoogleMapLoader,
    private readonly dateService: DateHttpService,
    private toastService: ToastrService,
    private readonly cd: ChangeDetectorRef,
    private userStore: UsersStoreService,
    private readonly companyInfoService: CompanyInfoService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.today = new Date();

    this.geodataSourceOptions = [
      { key: "SIGFOX", label: "Sigfox", value: "SIGFOX" },
      { key: "WIFI", label: "Wifi", value: "WIFI" },
      { key: "GPS", label: "GPS", value: "GPS" },
      { key: "ALL", label: "ALL", value: "ALL" },
    ];

    this.geodataDisplayOptions = [
      { key: "points", label: "Points", value: "points" },
      {
        key: "static_tracker",
        label: "line Tracker",
        value: "static_tracker",
      },
      {
        key: "motion_tracker",
        label: "Motional Tracker",
        value: "motion_tracker",
      },
    ];

    this.markerSpeeedOptions = [
      { key: "500", label: "Slower", value: "500" },
      { key: "300", label: "Slow", value: "300" },
      { key: "200", label: "Normal", value: "200" },
      { key: "100", label: "Fast", value: "100" },
      { key: "50", label: "Faster", value: "50" },
      // { key: "1", label: "Fast", value: 300 },
    ];

    this.markerIconOptions = [
      { key: "1", label: "Car", value: "1" },
      { key: "2", label: "Bus", value: "2" },
      { key: "3", label: "Trailer", value: "3" },
      { key: "4", label: "Aeroplane", value: "4" },
      { key: "5", label: "Ship", value: "5" },
    ];

    this.form = this.fb.group({
      startDate: [""],
      endDate: [""],
    });
  }

  ngOnInit(): void {
    // this.dateService.defaultDatesParams(this.companyId).subscribe(
    //   (data) => {
    //     this.form.patchValue({
    //       startDate: data[0].start_dashbd_date,
    //       endDate: data[0].end_date,
    //     });
    //   },
    //   (error) => {
    //     if (!error.status)
    //       this.toastService.error("You might be offline", "Request Failed");
    //     else this.toastService.error("Unknown Error", "");
    //   }
    // );

    this.userStore.defaultDateParams(this.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          startDate: data.start_dashbd_date,
          endDate: data.end_date,
        });
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

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

        this.IconOverlay = class extends google.maps.OverlayView {
          // loadCustomIcon(latLng: any, count: string, type: string){  }
          private div?: HTMLElement;
          /**icon location */
          private latLng;
          /**the current count */
          private count: string;
          /**the type of data */
          private color: string;

          constructor(latLng: Points, count: string, color: string, map) {
            super();
            this.latLng = latLng;
            this.count = count;
            this.color = color;
            this.setMap(map);
          }

          onAdd() {
            let self = this;

            this.div = document.createElement("div");
            this.div.style.borderStyle = "none";
            this.div.style.borderWidth = "0px";
            this.div.style.position = "absolute";
            this.div.style.backgroundColor = this.color;
            this.div.style.height = "20px";
            this.div.style.width = "20px";
            this.div.style.borderRadius = "50%";
            this.div.style.textAlign = "center";
            this.div.style.display = "flex";
            this.div.style.justifyContent = "center";
            this.div.style.pointerEvents = "auto";

            // Create the span element and attach it to the div.
            var span = document.createElement("span");
            span.style.color = "#000000";
            span.style.fontWeight = "bolder";
            span.style.fontSize = "1em";
            span.style.position = "relative";
            span.style.alignSelf = "center";

            span.appendChild(document.createTextNode(this.count));
            this.div.appendChild(span);

            // Add the element to the "overlayLayer" pane.
            const panes = this.getPanes();

            panes.overlayMouseTarget.appendChild(this.div);

            // Add a listener - we'll accept clicks anywhere on this div,
            googleMaps.event.addDomListener(this.div, "click", (event) => {
              // stop click reaction on another layers
              event.stopPropagation();

              // add also event to 3rd parameter for catching
              googleMaps.event.trigger(self, "click", event);
            });
          }

          draw() {
            // We use the south-west and north-east
            // coordinates of the overlay to peg it to the correct position and size.
            // To do this, we need to retrieve the projection from the overlay.
            const overlayProjection = this.getProjection();
            // Retrieve the south-west and north-east coordinates of this overlay
            // in LatLngs and convert them to pixel coordinates.
            // We'll use these coordinates to resize the div.
            const point = overlayProjection.fromLatLngToDivPixel(this.latLng);

            // Resize the image's div to fit the indicated dimensions.
            if (this.div) {
              this.div.style.left = point.x + "px";
              this.div.style.top = point.y + "px";
            }
          }

          onRemove() {
            if (this.div) {
              this.div.parentNode.removeChild(this.div);
              delete this.div;
            }
          }

          /**
           *  Set the visibility to 'hidden' or 'visible'.
           */
          hide() {
            if (this.div) {
              this.div.style.visibility = "hidden";
            }
          }

          show() {
            if (this.div) {
              this.div.style.visibility = "visible";
            }
          }
        };
      })
      .catch((e) => this.toastService.error("Map cannot be loaded", ""));
  }

  onGeofencingTask(e: MatSelectChange): void {
    this.selectedTask.emit(e.value);
  }

  onDeviceCategory(deviceCateforyId: MatSelectChange) {
    this.selectedDeviceCategory.emit(deviceCateforyId.value);
  }

  onDeviceId(deviceId: MatSelectChange): void {
    this.selectedDeviceId.emit(deviceId.value);
  }

  onGeodataSource(el: MatSelectChange): void {
    this.geodataSource = el.value;
  }

  onGeodataDisplay(el: MatSelectChange): void {
    this.geodataDisplay = el.value;
  }

  onMarkerIcon(icon: MatSelectChange): void {
    this.markerIcon = icon.value;
  }

  onMarkerSpeed(spped: MatSelectChange): void {
    this.markerSpeed = spped.value;
  }

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

  search(tracing?: string): void {
    let startDate = this.moment(this.form.get("startDate").value).format(
      "YYYY-MM-DD HH:MM:SS"
    );
    let endDate = this.moment(this.form.get("endDate").value).format(
      "YYYY-MM-DD HH:MM:SS"
    );

    //block for only point search
    if (!tracing) {
      if (this.geodataSource !== "ALL" && this.geodataDisplay === "points") {
        this.removeCustomMarker();

        this.dashboard
          .geofenceDataSource(
            this.isDeviceId,
            this.geodataSource,
            startDate,
            endDate
          )
          .subscribe(
            (data) => {
              if (data === null || data.length === 0) {
                this.toastService.error("Data not available");
              } else {
                this.geofenceDataSourceResult(data);
                this.geofenceSourceResult = data;

                const bounds = new this.GoogleMap.LatLngBounds();

                //fit bound
                bounds.extend(this.customMarkers[0].latLng);
                this.map.fitBounds(bounds);

                //get zoom to fit bound
                const zoom = this.map.getZoom();
                this.map.setZoom(zoom > 6 ? 8 : zoom);
              }
            },
            (error) => {
              if (!error.status)
                this.toastService.error(
                  "You might be offline",
                  "Request Failed"
                );
              else this.toastService.error("Unknown Error", "");
            }
          );
      }

      if (this.geodataSource === "ALL" && this.geodataDisplay === "points") {
        this.removeCustomMarker();
        this.dashboard
          .geofenceAllDataSource(this.isDeviceId, startDate, endDate)
          .subscribe(
            (data) => {
              if (data === null || data.length === 0) {
                this.toastService.error("Data not available");
              } else {
                this.geofenceDataSourceResult(data);
                this.geofenceSourceResult = data;

                //adding bounds to all marker
                const bounds = new this.GoogleMap.LatLngBounds();
                for (let i = 0; i < this.customMarkers.length; i++) {
                  bounds.extend(this.customMarkers[i].latLng);
                }
                this.map.fitBounds(bounds);
              }
            },
            (error) => {
              if (!error.status)
                this.toastService.error(
                  "You might be offline",
                  "Request Failed"
                );
              else this.toastService.error("Unknown Error", "");
            }
          );
      }
    } 

    //device trace and animation and on point click from count
    if (
      this.geodataDisplay === "static_tracker" ||
      this.geodataDisplay === "motion_tracker" ||
      tracing
    ) {
      this.removeCustomMarker();

      //tracing
      this.dashboard
        .geofenceTracing(this.isDeviceId, startDate, endDate)
        .subscribe(
          (data) => {
            if (!data.length)
              return this.toastService.error("No location data available");

            if (this.geodataDisplay === "static_tracker" || tracing) {
              const iconArrow = this.arrowPath(data);
              this.animatingPath = new this.GoogleMap.Polyline({
                path: data,
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 1,
                icons: iconArrow,
              });

              this.animatingPath.setMap(this.map);

              this.deviceTimeStamp(this.animatingPath, data);

              this.fitPathToBound(this.animatingPath);
            } else {
              if (this.markerIcon) {
                this.dashboard.getSpecificMarkerIcon(this.markerIcon).subscribe(
                  (icon) => {
                    const datas: DeviceCoordinates[] = [
                      {
                        lng: 3.8810354902675783,
                        lat: 7.391831146028238,
                        time: "2022-12-10 13:07:57.0",
                        seqNumber: 7896,
                      },
                      {
                        lng: 3.896475747814918,
                        lat: 7.401547672194951,
                        time: "2022-12-10 13:08:57.0",
                        seqNumber: 7897,
                      },
                      {
                        lng: 3.922161845173491,
                        lat: 7.4208708898549105,
                        time: "2022-12-10 13:09:57.0",
                        seqNumber: 7898,
                      },
                      {
                        lng: 3.936333485096469,
                        lat: 7.427897304135712,
                        time: "2022-12-10 13:09:57.0",
                        seqNumber: 7899,
                      },
                    ];

                    // const datas = [
                    //   {
                    //     lat: 25.774266,
                    //     lng: -80.193659,
                    //     time: "2022-12-10 13:09:57.0",
                    //     seqNumber: 7899,
                    //   },
                    //   {
                    //     lat: 25.83333,
                    //     lng: 25.83333 - 77.8999964,
                    //     time: "2022-12-10 13:09:57.0",
                    //     seqNumber: 7899,
                    //   },
                    //   {
                    //     lat: 28.411413,
                    //     lng: -16.5449611,
                    // time: "2022-12-10 13:09:57.0",
                    // seqNumber: 7899,
                    //   },
                    // ];

                    // const datas = [
                    //   {
                    //     lng: 7.458140017025983,
                    //     lat: 8.033788507926914,
                    //     time: "2022-12-10 13:09:57.0",
                    //     seqNumber: 7899,
                    //   },
                    //   {
                    //     lng: 11.323565488210932,
                    //     lat: 8.033788507926914,
                    //     time: "2022-12-10 13:09:57.0",
                    //     seqNumber: 7899,
                    //   },
                    //   {
                    //     lng: 13.644692647664328,
                    //     lat: 8.043055931162542,
                    //     time: "2022-12-10 13:09:57.0",
                    //     seqNumber: 7899,
                    //   },
                    // ];
                    this.animatingMarker(data, icon.iconImage);
                  },
                  (error) => {
                    if (!error.status)
                      this.toastService.error(
                        "You might be offline",
                        "Request Failed"
                      );
                    else this.toastService.error("Unknown Error", "");
                  }
                );
              } else {
                this.animatingMarker(data);
              }
            }
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
    }
  }

  fitPathToBound(path: google.maps.Polyline): void {
    const bounds = new this.GoogleMap.LatLngBounds();
    const points = path.getPath().getArray();
    for (let n = 0; n < points.length; n++) {
      bounds.extend(points[n]);
    }
    this.map.fitBounds(bounds);
  }

  removeCustomMarker(): void {
    if (this.customMarkers.length) {
      for (let i = 0; i < this.customMarkers.length; i++) {
        this.customMarkers[i].setMap(null);
      }
      this.customMarkers = [];
    }

    //remove any map path
    if (this.animatingPath && this.animatingPath.setMap) {
      this.animatingPath.setMap(null);
    }

    if (this.marker && this.marker.setMap) {
      this.marker.setMap(null);
    }
  }

  animatingMarker(data: DeviceCoordinates[], icon?: string): void {
    // this.updatePolylineAnimation(this.animatingPath);

    const lineSymbol = {
      path: "M75.29,11.08c-3.08-3.34-11.75-3.14-11.75-3.14,0,0-39.16,.47-44.65,.57-4.3,.07-10.82,.64-14.15,1.19-1.3,.22-2.12,.8-2.62,1.84C-.07,15.9,0,23.97,0,23.97,0,23.97-.07,32.03,2.09,36.41c.51,1.02,1.32,1.62,2.62,1.84,3.35,.55,9.85,1.11,14.15,1.19,5.49,.09,44.65,.57,44.65,.57,0,0,8.68,.18,11.75-3.15,1.03-1.11,2.75-3.54,3.04-6.82v-12.11c-.27-3.28-2.01-5.72-3.02-6.84Zm4.8-4.65c-3.11-3.34-11.88-3.15-11.88-3.15,0,0-39.56,.47-45.11,.57-4.36,.07-10.93,.64-14.3,1.19-1.32,.22-2.14,.8-2.65,1.84-2.18,4.38-2.11,12.43-2.11,12.43,0,0-.07,8.06,2.11,12.43,.51,1.02,1.34,1.62,2.65,1.84,3.39,.55,9.94,1.11,14.3,1.19,5.55,.09,45.11,.57,45.11,.57,0,0,8.77,.18,11.88-3.15,1.03-1.11,2.78-3.54,3.06-6.82V13.25c-.27-3.28-2.03-5.71-3.06-6.82ZM27.3,3.79c-1.96,.02-3.42,.05-4.21,.05-4.36,.07-10.93,.64-14.3,1.19-1.32,.22-2.14,.8-2.65,1.84-2.18,4.38-2.11,12.43-2.11,12.43,0,0-.07,8.06,2.11,12.43,.51,1.02,1.34,1.62,2.65,1.84,3.39,.55,9.94,1.11,14.3,1.19,.77,.02,2.22,.04,4.12,.05l-6.61-6.58V10.46l6.7-6.67ZM8.86,31.7c-2.18-4.36-2.11-12.4-2.11-12.4,0,0-.07-8.04,2.11-12.4,.35-.69,.86-1.19,1.56-1.49-.62,.07-1.17,.15-1.63,.22-1.32,.2-2.14,.78-2.65,1.75-2.18,4.19-2.11,11.92-2.11,11.92,0,0-.07,7.73,2.11,11.92,.51,.98,1.34,1.55,2.65,1.75,.46,.07,1.01,.15,1.63,.22-.7-.31-1.21-.78-1.56-1.49ZM60.97,5.05h-19.81c-1.9,0-3.81,.07-5.69,.24l-11.7,.95c-.29,.02-.59,.11-.84,.27-.4,.26-.35,.88,.51,1.19,1.96,.67,14.12,1.57,23.18,.38,6.41-.84,11.77-1.99,14.39-2.61,.26-.07,.22-.42-.04-.42ZM5.42,11.27s.79-3.97,2.25-5c1.46-1.02,5.49-1.08,5.49-1.08l-.38,1.19s-3.52,.02-4.76,.91c-1.12,.8-2.2,3.63-2.2,3.63l-.4,.35ZM80.08,6.44c-3.11-3.34-11.88-3.15-11.88-3.15,0,0-.77,.02-2.11,.02l-1.89,1.99c9.8,1.26,16.15,4.34,17.5,5.58,1.17,1.08,1.17,15.79,0,16.88-1.35,1.24-7.71,4.32-17.5,5.58l1.89,1.99c1.34,.02,2.11,.02,2.11,.02,0,0,8.77,.18,11.88-3.15,1.03-1.11,2.78-3.54,3.06-6.82V13.25c-.27-3.28-2.03-5.71-3.06-6.82Zm-56.13,2.77c-6.44-.67-8.53-1.15-8.53-1.15-1.43,4.78-1.24,11.25-1.24,11.25,0,0-.18,6.49,1.24,11.25,0,0,2.16-.46,8.53-1.15,0,0-.77-5.16-.77-10.12s.77-10.08,.77-10.08Zm43.1-1.15c-1.06-2.48-4.3-1.71-4.3-1.71l-11.41,2.39,.31,4.39c.29,4.14,.29,8.28,0,12.4l-.31,4.39,11.41,2.39s3.26,.77,4.3-1.71c0,0,2.58-4.87,2.58-11.25s-2.58-11.29-2.58-11.29Zm-6.08,25.51h-19.81c-1.9,0-3.81-.07-5.69-.24l-11.7-.95c-.29-.02-.59-.11-.84-.27-.4-.26-.35-.88,.51-1.18,1.96-.67,14.12-1.57,23.18-.38,6.41,.84,11.77,1.99,14.39,2.61,.26,.07,.22,.42-.04,.42ZM5.42,27.35s.79,3.97,2.25,5c1.46,1.02,5.49,1.08,5.49,1.08l-.38-1.19s-3.52-.02-4.76-.91c-1.12-.8-2.2-3.63-2.2-3.63l-.4-.35ZM83.84,14.49c-.05-1.19-.46-2.3-1.12-3.1l-.05-.07c.51,3.81,.51,12.18,0,15.99l.05-.07c.66-.8,1.04-1.91,1.12-3.1,.07-1.49,.16-3.54,.16-4.81s-.09-3.35-.16-4.83Zm-4.34,16.94c-1.04,1.04-2.22,1.73-3.72,1.97-1.45,.18-2.45-.55-2.56-1-.31-1.15,.31-.89,2.87-1.84,2.6-.97,4.03-1.68,5.38-2.59-.7,1.66-1.19,2.68-1.98,3.46Zm0-24.23c-1.04-1.04-2.22-1.73-3.72-1.97-1.45-.18-2.45,.55-2.56,1-.31,1.15,.31,.89,2.87,1.84,2.6,.97,4.03,1.68,5.38,2.59-.7-1.68-1.19-2.68-1.98-3.46Zm0,24.23c-1.04,1.04-2.22,1.73-3.72,1.97-1.45,.18-2.45-.55-2.56-1-.31-1.15,.31-.89,2.87-1.84,2.6-.97,4.03-1.68,5.38-2.59-.7,1.66-1.19,2.68-1.98,3.46ZM58.17,4.05s1.68,.24,1.63-.84c-.02-1.06-2.07-3.21-3.26-3.21s-.88,.57-.88,.57c0,0,1.35,3.1,1.83,3.34s.68,.15,.68,.15Zm.22-.11c-.42-.22-1.24-1.99-1.72-3.03-.31-.66-1.01-.36-1.01-.36,0,0,1.35,3.1,1.83,3.34,.48,.24,.68,.16,.68,.16,0,0,.24,.04,.55,.02-.09-.02-.2-.07-.33-.13Zm-.22,30.63s1.68-.24,1.63,.84c-.04,1.08-2.07,3.23-3.28,3.23s-.88-.57-.88-.57c0,0,1.35-3.1,1.83-3.34,.49-.24,.7-.16,.7-.16Zm.22,.13c-.42,.22-1.24,1.99-1.72,3.03-.31,.66-1.01,.36-1.01,.36,0,0,1.35-3.1,1.83-3.34s.68-.16,.68-.16c0,0,.24-.04,.55-.02-.09,.02-.2,.05-.33,.13Z",
      scale: 1,
      strokeColor: "#313131",
      fillColor: "#f3f3f3",
      fillOpacity: 1,
      rotation: -90,
      anchor: new google.maps.Point(24, 24),
    };

    this.animatingPath = new this.GoogleMap.Polyline({
      path: data,
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 1,
      map: this.map,
      icons: [{ icon: lineSymbol, offset: "100%" }],
    });
    // const line = new this.GoogleMap.Polyline({
    //   path:data.reverse(),
    // icons: [{ icon: lineSymbol, offset: "100%" }],
    // });

    this.animatingSvg(this.animatingPath);

    const bounds = new this.GoogleMap.LatLngBounds();
    for (let i = 0; i < this.animatingPath.getPath().getLength(); i++) {
      bounds.extend(this.animatingPath.getPath().getAt(i));
    }

    this.map.fitBounds(bounds);
    this.deviceTimeStamp(this.animatingPath, data);

    //  const newPoint = this.animatingPath.
    // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

    // this.marker = new this.GoogleMap.Marker({
    //   icon: {
    //     url: icon ?? "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    //     anchor: new this.GoogleMap.Point(12, 12),
    //     scaledSize: new this.GoogleMap.Size(48, 48),
    //   },
    //   position: this.animatingPath.getPath().getAt(0),
    //   map: this.map,
    // });

    //load image before animating
    // const image = new Image();
    // const mapIcon =
    //   icon ?? "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
    // image.onload = () => {
    //   this.marker = new this.GoogleMap.Marker({
    //     icon: {
    //       url: mapIcon,
    //       anchor: new this.GoogleMap.Point(24, 24),
    //       scaledSize: new this.GoogleMap.Size(48, 48),
    //       rotation: 90,
    //     },
    //     // position: this.animatingPath.getPath().getAt(0),
    //     map: this.map,
    //     draggable: true,
    //   });

    //   const el = data.reverse();
    //   // const lastPos = this.marker.getPosition();

    //   // console.log(newPoint);

    //   const bounds = new this.GoogleMap.LatLngBounds();
    //   for (let i = 0; i < this.animatingPath.getPath().getLength(); i++) {
    //     bounds.extend(this.animatingPath.getPath().getAt(i));

    //     // const heading = this.GoogleMap.geometry.spherical.computeHeading(
    //     //   el[i - 1],
    //     //   el[i]
    //     // );
    //     // console.log(heading);
    //   }

    //   this.map.fitBounds(bounds);
    // this.animation(this.animatingPath, this.marker, data.reverse());
    //   this.deviceTimeStamp(this.animatingPath, data);
    // };
    // image.onerror = () => {
    //   console.error("error exist");
    // };

    // image.src = mapIcon;

    // this.updatePolylineAnimation(this.animatingPath);

    // const bounds = new this.GoogleMap.LatLngBounds();
    // for (let i = 0; i < this.animatingPath.getPath().getLength(); i++) {
    //   bounds.extend(this.animatingPath.getPath().getAt(i));
    // }

    // this.map.fitBounds(bounds);
    // this.animation(this.animatingPath, this.marker);
    // this.deviceTimeStamp(this.animatingPath, data);
  }

  geofenceDataSourceResult(dataSources: GeofenceDataSource[]): void {
    dataSources.map((dataSource) => {
      if (dataSource?.dataSource === WirelessStatus.WiFi.toUpperCase()) {
        //show custom div
        const overlay = new this.IconOverlay(
          { lat: 7.37, lng: 3.94 },
          dataSource.sourceCount,
          "#0000ff",
          this.map
        );
        //push custom markers to array
        this.customMarkers.push(overlay);
        //attach click listener to the map
        this.GoogleMap.event.addListener(overlay, "click", () =>
          this.search("wifi")
        );
      }

      if (dataSource?.dataSource === "GPS") {
        const overlay = new this.IconOverlay(
          { lat: 26.2276, lng: 46.2276 },
          dataSource.sourceCount,
          "#ff0000",
          this.map
        );
        this.customMarkers.push(overlay);
        this.GoogleMap.event.addListener(overlay, "click", () =>
          this.search("gps")
        );
      }

      if (dataSource?.dataSource === WirelessStatus.SIGFOX.toUpperCase()) {
        const overlay = new this.IconOverlay(
          { lat: 26.8206, lng: 30.8205 },
          dataSource.sourceCount,
          "#ff0000",
          this.map
        );
        this.customMarkers.push(overlay);
        this.GoogleMap.event.addListener(overlay, "click", () =>
          this.search("sigfox")
        );
      }
      this.cd.markForCheck();
    });
  }

  private arrowPath(deviceCoordinates: DeviceCoordinates[]) {
    const lineSymbol: google.maps.Symbol = {
      path: this.GoogleMap.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    const arrowLength = deviceCoordinates.length;
    const iconArrow = deviceCoordinates.map((icon, i) => ({
      icon: lineSymbol,
      offset: `${(100 / arrowLength) * (i + 1)}%`,
    }));

    return iconArrow;
  }

  private updatePolylineAnimation(path: google.maps.Polyline) {
    this.GoogleMap.Polyline.prototype.GetPointAtDistance = (metres) => {
      if (metres === 0) {
        return path.getPath().getAt(0);
      }
      if (metres < 0) {
        return null;
      }
      if (path.getPath().getLength() < 2) {
        return null;
      }

      let dist = 0;
      let olddist = 0;
      for (var i = 1; i < path.getPath().getLength() && dist < metres; i++) {
        olddist = dist;
        dist += this.GoogleMap.geometry.spherical.computeDistanceBetween(
          path.getPath().getAt(i),
          path.getPath().getAt(i - 1)
        );
      }
      if (dist < metres) {
        return null;
      }
      const p1 = path.getPath().getAt(i - 2);
      const p2 = path.getPath().getAt(i - 1);
      const m = (metres - olddist) / (dist - olddist);
      return new this.GoogleMap.LatLng(
        p1.lat() + (p2.lat() - p1.lat()) * m,
        p1.lng() + (p2.lng() - p1.lng()) * m
      );
    };
  }

  private animation(line, marker: google.maps.Marker, data) {
    let count = 0;
    let lineDistance = 0;
    for (let i = 1; i < line.getPath().getLength(); i++) {
      lineDistance += this.GoogleMap.geometry.spherical.computeDistanceBetween(
        line.getPath().getAt(i),
        line.getPath().getAt(i - 1)
      );

      const heading = this.GoogleMap.geometry.spherical.computeHeading(
        data[i - 1],
        data[i]
      );
      marker.setIcon = heading;
    }

    const id = window.setInterval(
      () => {
        count = (count + 1) % 200;

        marker.setPosition(
          line.GetPointAtDistance(lineDistance - (lineDistance * count) / 200)
        );
        // line.setPath([
        //   [
        //     data[0],
        //     this.GoogleMap.geometry.spherical.interpolate(
        //       data[0],
        //       data[(line.getPath().getLength() - 1, count)]
        //     ),
        //   ],
        // ]);

        if (count === 199) {
          window.clearInterval(id);
        }
      },
      this.markerSpeed ? +this.markerSpeed : 200
    );
  }

  private deviceTimeStamp(
    path: google.maps.Polyline,
    coordinates: DeviceCoordinates[]
  ): void {
    this.deviceInfo = new this.GoogleMap.InfoWindow();
    this.GoogleMap.event.addListener(path, "click", (evt) => {
      let minDist = Number.MAX_VALUE;
      let index: number;
      for (let i = 0; i < path.getPath().getLength(); i++) {
        const distance =
          this.GoogleMap.geometry.spherical.computeDistanceBetween(
            evt.latLng,
            path.getPath().getAt(i)
          );
        if (distance < minDist) {
          minDist = distance;
          index = i;
        }
      }
      const formatted_data = `<div style="color:black">Time: ${coordinates[index].time}</div`;

      this.fetchGoogleStreet({
        lat: coordinates[index].lat,
        lng: coordinates[index].lng,
      });

      this.deviceInfo.setContent(formatted_data);
      this.deviceInfo.setPosition(path.getPath().getAt(index));
      this.deviceInfo.open(this.map);
    });
  }

  private animatingSvg(line) {
    let count = 0;
    const id = window.setInterval(
      () => {
        count = (count + 1) % 200;

        let icons = line.get("icons");
        icons[0].offset = count / 2 + "%";
        line.set("icons", icons);

        if (count === 199) {
          window.clearInterval(id);
        }
      },
      this.markerSpeed ? +this.markerSpeed : 200
    );
  }
}
