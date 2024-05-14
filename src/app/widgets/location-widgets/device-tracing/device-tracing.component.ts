import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import "leaflet-polylinedecorator";
import { ToastrService } from "ngx-toastr";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { DefaultDate } from "src/app/data-access/models/date.model";
import {
  GeofenceDataSource,
  GeofenceSource,
} from "src/app/data-access/models/geofencing.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
declare let L;

@Component({
  selector: "app-device-tracing",
  templateUrl: "./device-tracing.component.html",
  styleUrls: ["./device-tracing.component.scss"],
})
export class DeviceTracingComponent implements OnInit {
  map: L.Map;
  marker: L.Marker;
  @Input() companyId: string; //pass as child to handle partner portal
  @Input() deviceId: string; //pass as child
  @Input() longitude;
  @Input() latitude;

  date: DefaultDate[];
  tracingData: [number, number][] = [];
  timeData: [string?] = [];
  polylineData: { latitude: number; longitude: number }[] = [];

  constructor(
    private dashboard: DashboardHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private dateService: DateHttpService,
    private toastService: ToastrService,
    private readonly cd: ChangeDetectorRef
  ) {
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
  }

  ngOnInit(): void {
    if (this.longitude != 0 && this.latitude != 0) {
      setTimeout(() => {
        this.viewMap();
        this.loadSources();
      }, 200);
    }
  }

  viewMap() {
    this.map = L.map("map").setView([7.37, 3.94], 14);
    const t_url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
    const attribution = "Savipro-Iot";
    const tiles = L.tileLayer(t_url, { attribution, maxZoom: 18, minZoom: 3 });
    tiles.addTo(this.map);

    this.marker = L.marker([7.37, 3.94]);

    this.marker.addTo(this.map);
  }

  loadSources() {
    this.dateService.defaultDatesParams(this.companyId).subscribe(
      (data) => {
        this.date = data;
        this.dashboard
          .geofenceAllDataSource(
            this.deviceId,
            data[0].start_dashbd_date,
            data[0].end_date
          )
          .subscribe(
            (el) => {
              if (el === null || el.length === 0) {
                this.toastService.error("Data not available");
              } else {
                this.showDataSources(el);
              }
            },
            () => this.toastService.error("Request Timed Out")
          );
      },
      () => this.toastService.error("Request Timed Out")
    );
  }

  showDataSources(data: GeofenceDataSource[]) {
    let zoomIcon = new L.featureGroup();
    data.map((source) => {
      if (source?.dataSource === GeofenceSource.WIFI) {
        L.marker([7.37, 3.94], {
          icon: L.divIcon({
            className: "wifi-count",
            html: source?.sourceCount,
          }),
        })
          .addEventListener("click", () => this.tracing())
          .addTo(zoomIcon);
        zoomIcon.addTo(this.map);
      }
      if (source?.dataSource === GeofenceSource.SIGFOX) {
        L.marker([26.8206, 30.8025], {
          icon: L.divIcon({
            className: "sigfox-count",
            html: source.sourceCount,
          }),
        })
          .addEventListener("click", () => this.tracing())
          .addTo(zoomIcon);
        zoomIcon.addTo(this.map);
      }
      if (source?.dataSource === GeofenceSource.GPS) {
        L.marker([46.2276, 46.2276], {
          icon: L.divIcon({
            className: "gps-count",
            html: source?.sourceCount,
          }),
        })
          .addEventListener("click", () => this.tracing())
          .addTo(zoomIcon);
        zoomIcon.addTo(this.map);
      }
    });
    if (data.length === 1) {
      this.map.panTo(zoomIcon.getBounds().getCenter());
    } else {
      this.map.fitBounds(zoomIcon.getBounds());
    }
    this.cd.markForCheck();
  }

  tracing() {
    this.map.eachLayer(function (layer) {
      if (layer instanceof L.Polyline || layer instanceof L.PolylineDecorator) {
        layer.remove();
      }
    });
    let featureGroup = new L.FeatureGroup();
    this.dashboard
      .geofenceTracing(
        this.deviceId,
        this.date[0]?.start_dashbd_date,
        this.date[0]?.end_date
      )
      .subscribe(
        (data) => {
          for (var i = 0; i < data.length; i++) {
            var input = data[i];
            this.tracingData.push([input.lat, input.lng]);
            this.timeData.push(input.time);
            this.polylineData.push({
              latitude: input.lat,
              longitude: input.lng,
            });
          }
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
                repeat: 50,
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
        },
        () => this.toastService.error("Request Timed Out")
      );
  }
}
