import { Component, AfterViewInit, Input, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-device-geolocation",
  templateUrl: "./device-geolocation.component.html",
  styleUrls: ["./device-geolocation.component.scss"],
})
export class DeviceGeolocationComponent implements OnInit, AfterViewInit {
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() address?: string;
  @Input() container: string;

  private map: L.Map;
  private mapMarker: L.Marker;

  mapContainer: string;

  private Icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconSize: [25, 35],
  });

  constructor() {}

  ngOnInit() {
    this.mapContainer = "mapGeo" + this.container;
  }

  private initMap(): void {
    this.mapContainer = "mapGeo" + this.container;
    this.map = L.map(this.mapContainer, {
      center: [this.latitude, this.longitude],
      zoom: 15,
    });

    const tiles = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        maxZoom: 18,
        minZoom: 3,
        attribution: "Savipro-Iot",
      }
    );

    tiles.addTo(this.map);

    this.mapMarker = L.marker([this.latitude, this.longitude], {
      icon: this.Icon,
    });

    this.mapMarker
      .addTo(this.map)
      .bindPopup(
        `Latitude: ${this.latitude}, Longitude: ${this.longitude} Address: ${this.address}`
      )
      .openPopup();
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges() {
    if (this.map) {
      this.map.setView({ lat: this.latitude, lng: this.longitude });
      this.mapMarker
        .setLatLng({ lat: this.latitude, lng: this.longitude })
        .bindPopup(
          `Latitude: ${this.latitude}, Longitude: ${this.longitude} Address: ${this.address}`
        )
        .openPopup();
    }
  }
}
