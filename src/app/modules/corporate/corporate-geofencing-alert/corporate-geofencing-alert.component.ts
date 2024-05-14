import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from "@angular/core";
import { Observable, of } from "rxjs";
import { CorporatePermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { SessionStorageService } from "src/app/services/session-storage.service";
import {
  GeofenceDataSource,
  Shape,
  ShapeName,
} from "src/app/data-access/models/geofencing.model";
// import * as L from "leaflet";
import "leaflet-draw";
import "leaflet-polylinedecorator";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ComboBoxOption } from "src/app/widgets/common-widgets/types";
import { concatMap, map, mergeMap } from "rxjs/operators";
import { UserInfoService } from "src/app/services/user-info.service";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { ToastrService } from "ngx-toastr";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import * as _moment from "moment";
import { Moment } from "moment";
import { WriteStatusCode } from "src/app/data-access/models/http.model";
declare let L;

@Component({
  selector: "app-corporate-geofencing-alert",
  templateUrl: "./corporate-geofencing-alert.component.html",
  styleUrls: ["./corporate-geofencing-alert.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateGeofencingAlertComponent implements OnInit {
  permission$: Observable<CorporatePermissionCategory>;
  map: L.Map;
  marker: L.Marker;
  form: FormGroup;
  today: any;
  selectable: boolean = true;
  companyId: string;
  userId: string;
  geofencing: Shape[] = [];
  enableGeofence: boolean = false;
  deviceId: string;
  geofenceName: string;
  geodatSource: string;
  geodataDisplay: string;
  locationResponse: string;
  geofenceSourceResult: GeofenceDataSource[];
  markerIcon: string;
  markerSpeed = 200;
  markersArray = [];

  dataScope: ComboBoxOption<string>[];
  geodataDisplayOptions: ComboBoxOption<string>[];
  sourceOptions: ComboBoxOption<string>[];
  taskOptions: ComboBoxOption<string>[];
  deviceIdOptions$: Observable<ComboBoxOption<string>[]>;
  geofenceNameOptions$: Observable<ComboBoxOption<string>[]>;
  markerIconOptions: ComboBoxOption<string>[];
  markerSpeeedOptions: ComboBoxOption<string>[];

  devCat: string;
  geofencingTask: string;
  geofenceCount: number = 0;

  moment = _moment;
  formColor: string;
  formBgColor: string;
  formFont: string;

  tracingData: [number, number][] = [];
  timeData: [string?] = [];
  polylineData: { latitude: number; longitude: number }[] = [];

  constructor(
    private sessionService: SessionStorageService,
    private readonly fb: FormBuilder,
    private readonly companyInfoService: CompanyInfoService,
    private readonly cd: ChangeDetectorRef,
    private userInfoService: UserInfoService,
    private readonly dashboard: DashboardHttpService,
    private toastService: ToastrService,
    private readonly dateService: DateHttpService
  ) {
    this.today = new Date();

    this.dataScope = [
      { key: "historical", label: "Historical", value: "historical" },
      { key: "recent", label: "Recent", value: "recent" },
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

    this.markerIconOptions = [
      { key: "1", label: "Car", value: "1" },
      { key: "2", label: "Bus", value: "2" },
      { key: "3", label: "Trailer", value: "3" },
      { key: "4", label: "Aeroplane", value: "4" },
      { key: "5", label: "Ship", value: "5" },
    ];

    this.markerSpeeedOptions = [
      { key: "500", label: "Slower", value: "500" },
      { key: "300", label: "Slow", value: "300" },
      { key: "200", label: "Normal", value: "200" },
      { key: "100", label: "Fast", value: "100" },
      { key: "50", label: "Faster", value: "50" },
      // { key: "1", label: "Fast", value: 300 },
    ];

    this.sourceOptions = [
      { key: "SIGFOX", label: "Sigfox", value: "SIGFOX" },
      { key: "WIFI", label: "Wifi", value: "WIFI" },
      { key: "GPS", label: "GPS", value: "GPS" },
      { key: "ALL", label: "ALL", value: "ALL" },
    ];

    this.taskOptions = [
      { key: "search", label: "Device Search", value: "search" },
      { key: "tracing", label: "Device Tracing", value: "tracing" },
      { key: "create", label: "Create Geofence", value: "create" },
    ];

    const iconRetinaUrl = "assets/marker-icon-2x.png";
    const iconUrl = "assets/marker-icon.png";
    const shadowUrl = "assets/marker-shadow.png";
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    L.Marker.prototype.options.icon = iconDefault;
  }

  // static Point(x, y, round?) {
  //   x = round ? Math.round(x) : x;
  //   y = round ? Math.round(y) : y;
  // }
  ngOnInit(): void {
    this.form = this.fb.group({
      startDate: [""],
      endDate: [""],
      newGeofence: ["", Validators.required],
    });

    this.geofencingTask = "search";
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.userId = this.userInfoService.getUserInfo().userId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.permission$ = this.sessionService.readPermission();

    setTimeout(() => {
      this.onGeofencingView();
    }, 200);
  }

  onGeofencingView() {
    this.map = L.map("map").setView([7.37, 3.94], 14);
    const t_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution = "Savipro-Iot";
    const tiles = L.tileLayer(t_url, { attribution, maxZoom: 18, minZoom: 3 });
    tiles.addTo(this.map);

    // this.marker = L.marker([7.37, 3.94]);

    // this.marker.addTo(this.map);
  }

  viewGeofencingShapes() {
    let drawnItems = new L.FeatureGroup();
    drawnItems.addTo(this.map);
    this.map.addLayer(drawnItems);

    let drawControl = new L.Control.Draw({
      draw: {
        polygon: {},
        polyline: false,
        rectangle: <any>{ showArea: false },
        circle: {},
        marker: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        edit: false,
        remove: false,
      },
    });
    this.map.addControl(drawControl);

    this.map.on(L.Draw.Event.CREATED, (e: any) => {
      let type = e.layerType,
        layer = e.layer;

      drawnItems.addLayer(layer);

      let code = this.geofenceCode();
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

      if (type === "circle") {
        const value: Shape = {
          points: [layer.getLatLng()],
          name: type.toUpperCase(),
          radius: layer.getRadius(),
          code,
        };

        this.geofencing.push(value);
      } else {
        const latlng = layer.getLatLngs()[0];
        const points = latlng.map((pos, i) => ({
          lat: pos.lat,
          lng: pos.lng,
          index: i,
        }));

        const value: Shape = {
          points,
          name: type.toUpperCase(),
          code,
        };
        // edit points and update with index while mapping and uopdate
        this.geofencing.push(value);
      }

      this.map.addLayer(layer);
    });
  }

  ondrawGeofence(data: Shape[]) {
    let drawnItems = new L.FeatureGroup();
    this.map.eachLayer(function (layer) {
      if (
        layer instanceof L.Polygon ||
        layer instanceof L.Rectangle ||
        layer instanceof L.Circle
      ) {
        layer.remove();
      }
    });
    data.forEach(({ name, radius, points, code }) => {
      if (name === ShapeName.rect) {
        L.rectangle(points, {
          color: "#FF0000",
          opacity: 0.6,
          fillOpacity: 0.2,
        }).addTo(drawnItems);
        drawnItems.addTo(this.map).bindPopup(code);
        this.map.fitBounds(drawnItems.getBounds());
      } else if (name === ShapeName.polygon || name === ShapeName.triangle) {
        L.polygon(points, {
          color: "#FF0000",
          opacity: 0.6,
          fillOpacity: 0.2,
        }).addTo(drawnItems);
        drawnItems.addTo(this.map).bindPopup(code);
        this.map.fitBounds(drawnItems.getBounds());
      } else {
        let bounds //= { lat: points[0].lat, lng: points[0].lng };
        L.circle(bounds, {
          color: "#FF0000",
          opacity: 0.6,
          fillOpacity: 0.2,
          radius: radius,
        }).addTo(drawnItems);
        drawnItems.addTo(this.map).bindPopup(code);
        this.map.fitBounds(drawnItems.getBounds());
      }
    });
  }

  saveGeofence() {
    const geofenceName = this.form.get("newGeofence").value;
    const formdata = {
      headerName: geofenceName,
      categoryId: this.devCat,
      shapes: this.geofencing,
    };
    this.dashboard
      .saveGeofencing(formdata)
      // .pipe(
      //   this.toast.observe({
      //     loading: "Saving, please wait...",
      //     success: "Record updated successfully.",
      //     error: "Error saving information.",
      //   })
      // )
      .subscribe(
        (res) => {
          if (res.status === WriteStatusCode.SUCCESS) {
            this.toastService.success("New Geofence Created", "Geofencing");
            this.onGeofencingTask({ value: "search" });
            this.cd.markForCheck();
          } else {
            this.toastService.error("Error creating Geofence", "");
          }
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }

  geofenceCode() {
    this.geofenceCount = this.geofenceCount + 1;
    if (this.geofenceCount >= 1) {
      this.enableGeofence = true;
      this.cd.markForCheck();
    }
    let code = prompt("Please, enter the geofencing code");
    return code;
  }

  changeDeviceCategoryId(event) {
    this.devCat = event.value;

    if (this.geofencingTask === "search" || this.geofencingTask === "tracing") {
      this.deviceIdOptions$ = this.dashboard
        .deviceDetailsList(this.companyId, this.userId)
        .pipe(
          map((devices) => {
            let foundDevices = devices.filter(
              (u) => u.clientDeviceCategId === this.devCat
            );
            return foundDevices.map((device) => ({
              key: device.deviceId,
              value: device.deviceId,
              label: device.manufDeviceId,
            }));
          })
        );

      this.geofenceNameOptions$ = this.dashboard
        .geofencingHeader(this.devCat)
        .pipe(
          map((names) => {
            return names.map((data) => ({
              key: data.geofencing_hder_id,
              value: data.geofencing_hder_id,
              label: data.geofencing_hder_name,
            }));
          })
        );
    }
  }

  changeDeviceId(e) {
    this.deviceId = e.value;
  }

  changeGeofencing(e) {
    this.geofenceName = e.value;
    this.dashboard
      .generateGeofenceData(this.companyId, this.devCat, this.geofenceName)
      .subscribe(
        (data) => {
          if (!data) return this.toastService.error("No data found");
          this.ondrawGeofence(data.shapes);
        },
        (error) => {
          if (!error.status)
            this.toastService.error("You might be offline", "Request Failed");
          else this.toastService.error("Unknown Error", "");
        }
      );
  }

  changeSource(e) {
    this.geodatSource = e.value;
  }

  changeDisplay(e) {
    this.geodataDisplay = e.value;
  }

  changeMarkerIcon(e) {
    this.markerIcon = e.value;
  }

  changeMarkerSpeed(e) {
    this.markerSpeed = +e.value;
  }

  searchTracing(event?: string) {
    let startDate = this.moment(this.form.get("startDate").value).format(
      "YYYY-MM-DD HH:MM:SS"
    );
    let endDate = this.moment(this.form.get("endDate").value).format(
      "YYYY-MM-DD HH:MM:SS"
    );

    if (this.geodatSource !== "ALL" && this.geodataDisplay === "points") {
      this.dashboard
        .geofenceDataSource(
          this.deviceId,
          this.geodatSource,
          startDate,
          endDate
        )
        .subscribe(
          (data) => {
            if (data === null || data.length === 0) {
              this.toastService.error("Data not available");
            } else {
              this.geofenceSourceResult = data;
              this.geofenceDataSourceCategory();
            }
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
    }

    if (this.geodatSource === "ALL" && this.geodataDisplay === "points") {
      this.dashboard
        .geofenceAllDataSource(this.deviceId, startDate, endDate)
        .subscribe(
          (data) => {
            if (data === null || data.length === 0) {
              this.toastService.error("Data not available");
            } else {
              this.geofenceSourceResult = data;
              this.geofenceDataSourceCategory();
            }
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
    }

    if (
      this.geodataDisplay === "static_tracker" ||
      this.geodataDisplay === "motion_tracker" ||
      event
    ) {
      // remove every marker for tracing
      if (this.markersArray.length === 1) {
        this.map.removeLayer(this.markersArray[0]);
        this.markersArray.pop();
      }

      this.map.eachLayer(function (layer) {
        if (
          layer instanceof L.Polyline ||
          layer instanceof L.PolylineDecorator
        ) {
          layer.remove();
        }
      });
      let featureGroup = new L.FeatureGroup();
      this.dashboard
        .geofenceTracing(this.deviceId, startDate, endDate)
        .subscribe(
          (data) => {
            if (!data.length)
              return this.toastService.error("No location data available");
            for (var i = 0; i < data.length; i++) {
              var input = data[i];
              // this.tracingData.push([input.latitude, input.longitude]);
              this.tracingData.push([input.lat, input.lng]);
              this.timeData.push(input.time);
              this.polylineData.push({
                latitude: input.lat,
                longitude: input.lng,
              });
            }
            if (this.geodataDisplay === "static_tracker" || event) {
              const tracing = [this.tracingData];
              let datas = [];
              for (var i = 0; i < tracing.length; i++) {
                datas.push(
                  L.polyline(tracing[i], { weight: 1 })
                    .addTo(this.map)
                    .bindPopup(this.timeData[i])
                );
              }

              L.polylineDecorator(tracing, {
                patterns: [
                  {
                    offset: 25,
                    repeat: 100,
                    symbol: L.Symbol.arrowHead({
                      pixelSize: 10,
                      pathOptions: {
                        fillOpacity: 0.5,
                        weight: 0,
                      },
                    }),
                  },
                ],
              }).addTo(featureGroup);
              featureGroup.addTo(this.map);
              this.map.fitBounds(featureGroup.getBounds());
            } else {
              this.dashboard.getSpecificMarkerIcon(this.markerIcon).subscribe(
                (icon) => {
                  let marker;
                  if (!icon) {
                    marker = L.marker([
                      this.polylineData[0].latitude,
                      this.polylineData[0].longitude,
                    ]); //.addTo(this.map);
                  } else {
                    const ico = L.icon({
                      iconUrl: icon?.iconImage,
                      iconSize: [30, 40],
                    });
                    marker = L.marker(
                      [
                        this.polylineData[0].latitude,
                        this.polylineData[0].longitude,
                      ],
                      {
                        icon: ico,
                      }
                    ); //.addTo(this.map);
                  }

                  this.map.addLayer(marker);
                  this.markersArray.push(marker);

                  let polyline = L.polyline(this.tracingData, {
                    color: "red",
                    lineCap: "round",
                  }).addTo(this.map);

                  this.map.fitBounds(polyline.getBounds());

                  this.polylineData.forEach((coord, index) => {
                    setTimeout(() => {
                      marker.setLatLng([coord.latitude, coord.longitude]);
                    }, this.markerSpeed * index);
                  });
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
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
    }
  }

  search() {
    // if (this.map != undefined) {
    //   this.map.remove();
    // }
    // setTimeout(() => {
    //   this.onGeofencingView();
    // if (this.devCat && this.geofenceName) {
    //   this.dashboard
    //     .generateGeofenceData(this.companyId, this.devCat, this.geofenceName)
    //     .subscribe(
    //       (data) => {
    //         if (!data) return this.toastService.error("No data found");
    //         this.ondrawGeofence(data.shapes);
    //       },
    //       () => {
    //         this.toastService.error("Request Timed Out");
    //       }
    //     );
    //   this.geofenceName = "";
    // } else
    // {
    //   this.dashboard
    //     .geofenceSearchPoint(this.deviceId)
    //     .pipe(
    //       concatMap((bound) => {
    //         if (bound.latitude === 0 && bound.longitude == 0) {
    //           return of(this.toastService.error("No data found"));
    //         } else {
    //           return this.dashboard
    //             .geofenceDetail(bound.latitude, bound.longitude)
    //             .pipe(
    //               map((add) => {
    //                 let markerFeature = new L.FeatureGroup();
    //                 L.marker([bound.latitude, bound.longitude])
    //                   .addTo(markerFeature)
    //                   .bindPopup(add.display_name);
    //                 markerFeature.addTo(this.map);
    //                 this.map.panTo(markerFeature.getBounds().getCenter());
    //               })
    //             );
    //         }
    //       })
    //     )
    //     .subscribe({
    //       error(e) {
    //         if (!e.status)
    //           this.toastService.error("You might be offline", "Request Failed");
    //         else this.toastService.error("Unknown Error", "");
    //       },
    //     });
    // }
    // }, 200);
  }

  geofenceDataSourceCategory() {
    this.dashboard.getSpecificMarkerIcon(this.markerIcon).subscribe(
      (marker) => {
        let zoomIcon = new L.featureGroup();
        this.geofenceSourceResult.map((geofenceSourceResult) => {
          if (geofenceSourceResult?.dataSource === "WIFI") {
            L.marker([7.37, 3.94], {
              icon: L.divIcon({
                className: "wifi-count",
                html: geofenceSourceResult.sourceCount,
              }),
            })
              .addEventListener("click", () => this.searchTracing("point"))
              .addTo(zoomIcon);
            zoomIcon.addTo(this.map);
            // this.map.fitBounds([7.37, 3.94]);
          }
          if (geofenceSourceResult?.dataSource === "SIGFOX") {
            L.marker([26.8206, 30.8025], {
              icon: L.divIcon({
                className: "sigfox-count",
                html: geofenceSourceResult.sourceCount,
              }),
            })
              .addEventListener("click", () => this.searchTracing("point"))
              .addTo(zoomIcon);
            zoomIcon.addTo(this.map);
            // this.map.fitBounds(zoomIcon.getBounds());
          }
          if (geofenceSourceResult?.dataSource === "GPS") {
            L.marker([46.2276, 46.2276], {
              icon: L.divIcon({
                className: "gps-count",
                html: geofenceSourceResult.sourceCount,
              }),
            })
              .addEventListener("click", () => this.searchTracing("point"))
              .addTo(zoomIcon);
            zoomIcon.addTo(this.map);
            // this.map.fitBounds(zoomIcon.getBounds());
          }
        });
        if (this.geofenceSourceResult.length === 1) {
          this.map.panTo(zoomIcon.getBounds().getCenter());
        } else {
          this.map.fitBounds(zoomIcon.getBounds());
        }
        this.cd.markForCheck();
      },
      (error) => {
        if (!error.status)
          this.toastService.error("You might be offline", "Request Failed");
        else this.toastService.error("Unknown Error", "");
      }
    );
  }

  onGeofencingTask(event) {
    this.geofencingTask = event.value;
    if (this.geofencingTask === "create") {
      this.devCat = "";
      if (this.map != undefined) {
        this.map.remove();
      }
      setTimeout(() => {
        this.onGeofencingView();
        this.geofencing = [];
        this.viewGeofencingShapes();
      }, 200);
    } else {
      this.devCat = "";
      this.geofenceName = "";
      if (this.geofencingTask === "tracing") {
        this.dateService.defaultDatesParams(this.companyId).subscribe(
          (data) => {
            this.form.patchValue({
              startDate: data[0].start_dashbd_date,
              endDate: data[0].end_date,
            });
          },
          (error) => {
            if (!error.status)
              this.toastService.error("You might be offline", "Request Failed");
            else this.toastService.error("Unknown Error", "");
          }
        );
      }
      if (this.map != undefined) {
        this.map.remove();
      }
      setTimeout(() => {
        this.onGeofencingView();
      }, 200);
    }
  }

  // getArrows(arrLatlngs, color, arrowCount, mapObj) {
  //   if (
  //     typeof arrLatlngs === undefined ||
  //     arrLatlngs == null ||
  //     !arrLatlngs.length ||
  //     arrLatlngs.length < 2
  //   )
  //     return [];

  //   if (typeof arrowCount === "undefined" || arrowCount == null) arrowCount = 1;

  //   if (typeof color === "undefined" || color == null) color = "";
  //   else color = "color:" + color;

  //   var result = [];
  //   for (var i = 1; i < arrLatlngs.length; i++) {
  //     var icon = L.divIcon({
  //       className: "arrow-icon",
  //       bgPos: [5, 5],
  //       html:
  //         '<div style="' +
  //         color +
  //         ";transform: rotate(" +
  //         this.getAngle(arrLatlngs[i - 1], arrLatlngs[i], -1).toString() +
  //         'deg)">▶</div>',
  //     });
  //     for (var c = 1; c <= arrowCount; c++) {
  //       result.push(
  //         L.marker(
  //           this.myMidPoint(
  //             arrLatlngs[i],
  //             arrLatlngs[i - 1],
  //             c / (arrowCount + 1),
  //             mapObj
  //           ),
  //           { icon: icon }
  //         )
  //       );
  //     }
  //   }
  //   return result;
  // }

  // getAngle(latLng1, latlng2, coef) {
  //   var dy = latlng2[0] - latLng1[0];
  //   var dx = Math.cos((Math.PI / 180) * latLng1[0]) * (latlng2[1] - latLng1[1]);
  //   var ang = (Math.atan2(dy, dx) / Math.PI) * 180 * coef;
  //   return ang.toFixed(2);
  // }

  // myMidPoint(latlng1, latlng2, per, mapObj) {
  //   console.log(mapObj);

  //   if (!mapObj) throw new Error("map is not defined");

  //   var halfDist,
  //     segDist,
  //     dist,
  //     p1,
  //     p2,
  //     ratio,
  //     points = [];

  //   p1 = mapObj.project(new L.latLng(latlng1));
  //   p2 = mapObj.project(new L.latLng(latlng2));

  //   halfDist = this.distanceTo(p1, p2) * per;

  //   if (halfDist === 0) return mapObj.unproject(p1);

  //   dist = this.distanceTo(p1, p2);

  //   if (dist > halfDist) {
  //     ratio = (dist - halfDist) / dist;
  //     var res = mapObj.unproject(
  //       new this.Point(
  //         p2.x - ratio * (p2.x - p1.x),
  //         p2.y - ratio * (p2.y - p1.y)
  //       )
  //     );
  //     return [res.lat, res.lng];
  //   }
  // }

  // distanceTo(p1, p2) {
  //   var x = p2.x - p1.x,
  //     y = p2.y - p1.y;

  //   return Math.sqrt(x * x + y * y);
  // }

  // toPoint(x, y, round) {
  //   if (x instanceof this.Point) {
  //     return x;
  //   }
  //   if (Array.isArray(x)) {
  //     return new this.Point(x[0], x[1]);
  //   }
  //   if (x === undefined || x === null) {
  //     return x;
  //   }
  //   if (typeof x === "object" && "x" in x && "y" in x) {
  //     return new this.Point(x.x, x.y);
  //   }
  //   return new this.Point(x, y, round);
  // }
}
