import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
} from "@angular/core";
import * as L from "leaflet";
import { DashboardHttpService } from "src/app/data-access/http/dashboard-http.service";

@Component({
  selector: "app-device-asset-tracker",
  templateUrl: "./device-asset-tracker.component.html",
  styleUrls: ["./device-asset-tracker.component.scss"],
})
export class DeviceAssetTrackerComponent implements AfterViewInit {
  @Input() locationData: { lat: number; lng: number }[];
  @Input() markerIcon: string;

  finalAddress: string;

  private map: L.Map;
  private mapMarker: L.Marker;
  private finalMapMarker: L.Marker;

  private Icon = L.icon({
    iconUrl:
      "https://res.cloudinary.com/bash/image/upload/v1632604030/marker-car.3248a550.svg",
    iconSize: [30, 40],
  });
  // private finalLocationIcon = L.icon({iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png", iconSize: [20, 30],});
  public polyline;

  constructor(
    private readonly cd: ChangeDetectorRef,
    private readonly dashboardHttpService: DashboardHttpService
  ) {}

  private initMap(): void {
    this.map = L.map("map");

    if (this.markerIcon)
      this.Icon = L.icon({ iconUrl: this.markerIcon, iconSize: [30, 40] });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution: "Savipro-Iot",
      }
    );

    // this.getFinalLocationAddress()

    tiles.addTo(this.map);

    this.mapMarker = L.marker(
      [this.locationData[0].lat, this.locationData[0].lng],
      { icon: this.Icon }
    );

    // this.finalMapMarker = L.marker([this.locationData[this.locationData.length-1].lat, this.locationData[this.locationData.length-1].lng], {icon: this.finalLocationIcon});

    this.mapMarker.addTo(this.map);

    // this.finalMapMarker.addTo(this.map).bindPopup(`Latitude: ${this.locationData[this.locationData.length-1].lat}, Longitude: ${this.locationData[this.locationData.length-1].lng} Address: ${this.finalAddress}`).openPopup()

    this.polyline = L.polyline(this.locationData, {
      color: "red",
      lineCap: "round",
    }).addTo(this.map);

    this.map.fitBounds(this.polyline.getBounds());

    this.locationData.forEach((coord, index) => {
      setTimeout(() => {
        this.mapMarker.setLatLng([coord.lat, coord.lng]);
      }, 200 * index);
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges() {
    if (this.map) {
      this.polyline = L.polyline(this.locationData, { color: "red" }).addTo(
        this.map
      );

      this.map.fitBounds(this.polyline.getBounds());

      this.cd.detectChanges();
    }
  }

  getFinalLocationAddress() {
    this.dashboardHttpService
      .fetchDeviceGeolocationAddress(
        this.locationData[this.locationData.length - 1].lat,
        this.locationData[this.locationData.length - 1].lng
      )
      .subscribe(
        (result) => {
          let addressResponse = result.results[0].locations[0];
          this.finalAddress = `${addressResponse.street}, ${addressResponse.adminArea5}, ${addressResponse.adminArea1}.`;
          this.cd.detectChanges();
        },
        () => {}
      );
  }
}
