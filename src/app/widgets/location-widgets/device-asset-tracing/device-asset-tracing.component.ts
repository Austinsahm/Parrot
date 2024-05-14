import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";
import { GoogleMapLoader } from "../../geofencing/google-map-loader";
import {} from "@angular/google-maps";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { concatMap, map, mergeMap, switchMap } from "rxjs/operators";
import { DeviceCoordinates } from "src/app/data-access/models/geofencing.model";

@Component({
  selector: "app-device-asset-tracing",
  templateUrl: "./device-asset-tracing.component.html",
  styleUrls: ["./device-asset-tracing.component.scss"],
})
export class DeviceAssetTracingComponent implements OnInit, AfterViewInit {
  @ViewChild("map") mapElementRef: ElementRef;
  @Input() locationData: DeviceCoordinates[]; //dashboard data
  @Input() markerIcon: string;
  @Input() companyId: string; //pass as child to handle partner portal
  @Input() deviceId: string; //pass as child

  marker: google.maps.Marker;
  GoogleMap;
  bounds: google.maps.LatLngBounds;
  animatingPath: google.maps.Polyline;
  map: google.maps.Map;

  constructor(
    private gMapLoader: GoogleMapLoader,
    private readonly dashboard: DashboardHttpService,
    private renderer: Renderer2,
    private toastService: ToastrService,
    private readonly dateService: DateHttpService
  ) {}

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

        this.bounds = new this.GoogleMap.LatLngBounds();

        // this.fetchGoogleStreet(mapControls.center);

        if (this.locationData.length) {
          this.animatingMarker(this.locationData, this.markerIcon);
        } else {
          this.loadDeviceTracing();
        }
      })
      .catch((e) => this.toastService.error("Map cannot be loaded", ""));
  }

  loadDeviceTracing() {
    this.dateService
      .defaultDatesParams(this.companyId)
      .pipe(
        switchMap((date) => {
          const startDate = date[0].start_dashbd_date;
          const endDate = date[0].end_date;
          return this.dashboard
            .geofenceTracing(this.deviceId, startDate, endDate)
            .pipe(
              map((data) => {
                if (!data.length)
                  return this.toastService.error("No location data available");
                this.animatingMarker(data);
              })
            );
        })
      )
      .subscribe({ error: () => {} });
  }

  animatingMarker(data: DeviceCoordinates[], icon?: string): void {
    this.animatingPath = new this.GoogleMap.Polyline({
      path: data,
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 1,
      map: this.map,
    });

    // "http://maps.google.com/mapfiles/ms/icons/red-dot.png"

    this.marker = new this.GoogleMap.Marker({
      icon: {
        url: icon ?? "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        anchor: new this.GoogleMap.Point(12, 12),
        scaledSize: new this.GoogleMap.Size(48, 48),
      },
      position: this.animatingPath.getPath().getAt(0),
      map: this.map,
    });

    this.updatePolylineAnimation(this.animatingPath);

    const bounds = new this.GoogleMap.LatLngBounds();
    for (let i = 0; i < this.animatingPath.getPath().getLength(); i++) {
      bounds.extend(this.animatingPath.getPath().getAt(i));
    }

    this.map.fitBounds(bounds);
    this.animation(this.animatingPath, this.marker);
    // this.deviceTimeStamp(this.animatingPath, data);
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
      const p1 = path.getPath().getAt(i - 1);
      const p2 = path.getPath().getAt(i - 2);
      const m = (metres - olddist) / (dist - olddist);
      return new this.GoogleMap.LatLng(
        p1.lat() + (p2.lat() - p1.lat()) * m,
        p1.lng() + (p2.lng() - p1.lng()) * m
      );
    };
  }

  private animation(line, marker: google.maps.Marker) {
    let count = 0;
    let lineDistance = 0;
    for (let i = 1; i < line.getPath().getLength(); i++) {
      lineDistance += this.GoogleMap.geometry.spherical.computeDistanceBetween(
        line.getPath().getAt(i - 1),
        line.getPath().getAt(i)
      );
    }

    const id = window.setInterval(() => {
      count = (count + 1) % 200;

      marker.setPosition(
        line.GetPointAtDistance(lineDistance - (lineDistance * count) / 200)
      );
      if (count === 199) {
        window.clearInterval(id);
      }
    }, 200);
  }
}
