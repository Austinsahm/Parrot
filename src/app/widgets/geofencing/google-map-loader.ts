import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import {
  DeviceCoordinates,
  Points,
} from "src/app/data-access/models/geofencing.model";

@Injectable({
  providedIn: "root",
})
export class GoogleMapLoader {
  loadGoogleMap(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;

    // do not reload if loaded b4
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }

    return new Promise((resolve, reject) => {
      //  access maps script sdk
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApi}&libraries=geometry,drawing`;
      script.async = true;
      script.defer = false;

      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject("Google maps not loaded");
        }
      };
    });
  }

  updatePolylineAnimation(path: google.maps.Polyline, GoogleMap) {
    GoogleMap.Polyline.prototype.GetPointAtDistance = (metres) => {
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
        dist += GoogleMap.geometry.spherical.computeDistanceBetween(
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
      return new GoogleMap.LatLng(
        p1.lat() + (p2.lat() - p1.lat()) * m,
        p1.lng() + (p2.lng() - p1.lng()) * m
      );
    };
  }

  animation(line, marker: google.maps.Marker, GoogleMap) {
    let count = 0;
    let lineDistance = 0;
    for (let i = 1; i < line.getPath().getLength(); i++) {
      lineDistance += GoogleMap.geometry.spherical.computeDistanceBetween(
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





  arrowPath(deviceCoordinates: DeviceCoordinates[], GoogleMap) {
    const lineSymbol: google.maps.Symbol = {
      path: GoogleMap.SymbolPath.FORWARD_CLOSED_ARROW,
    };

    const arrowLength = deviceCoordinates.length;
    const iconArrow = deviceCoordinates.map((icon, i) => ({
      icon: lineSymbol,
      offset: `${(100 / arrowLength) * (i + 1)}%`,
    }));

    return iconArrow;
  }

  deviceTimeStamp(
    path: google.maps.Polyline,
    coordinates: DeviceCoordinates[],
    GoogleMap,
    deviceInfo,
    panorama,
    map
  ): void {
    GoogleMap.event.addListener(path, "click", (evt) => {
      let minDist = Number.MAX_VALUE;
      let index: number;
      for (let i = 0; i < path.getPath().getLength(); i++) {
        const distance = GoogleMap.geometry.spherical.computeDistanceBetween(
          evt.latLng,
          path.getPath().getAt(i)
        );
        if (distance < minDist) {
          minDist = distance;
          index = i;
        }
      }
      const formatted_data = `<div style="color:black">Time: ${coordinates[index].time}</div`;

      deviceInfo.setContent(formatted_data);
      deviceInfo.setPosition(path.getPath().getAt(index));
      deviceInfo.open(map);
    });
  }

  viewGeofenceInfo(
    anchor,
    desc: string,
    GoogleMap,
    map,
    marker = false,
    open = false
  ) {
    const displayInfo = new GoogleMap.InfoWindow({
      content: desc,
    });

    if (open) {
      displayInfo.open({ anchor, map: map, shouldFocus: false });
    } else if (marker) {
      anchor.addListener("click", () => {
        displayInfo.open({ anchor, map: map, shouldFocus: false });
      });
    } else {
      anchor.addListener("click", (e) => {
        displayInfo.setPosition(e.latLng);
        displayInfo.open(map);
      });
    }

    return displayInfo
  }
}
