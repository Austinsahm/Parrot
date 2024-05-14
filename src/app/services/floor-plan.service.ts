import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { BaseHttpService } from "../data-access/http/base-http.service";
import { AssetFloor } from "../data-access/models/asset.model";
import { Response, StatusCode } from "../data-access/models/http.model";
import { FloorPlanDevice } from "../data-access/models/smartHome.model";

@Injectable({
  providedIn: "root",
})
export class FloorPlanService extends BaseHttpService {
  getTempToken() {
    const url = this.buildUrl(`setup/archilogic/get-access-token`);
    return this.checkWrite(
      this.httpClient.post<Response<any>>(
        url,
        JSON.stringify({
          scopes: [
            { resource: "floor", action: "readPrivate" },
            { resource: "floor", action: "readPublic" },
            { resource: "floor", action: "queryPrivate" },
            { resource: "floor", action: "queryPublic" },
            { resource: "floor", action: "archive" },
            { resource: "customFields", action: "readPrivate" },
            { resource: "customFields", action: "readPublic" },
            { resource: "customFields", action: "write" },
          ],
        })
      )
    );
  }

  loadFloorSdk(): Promise<any> {
    const win = window as any;

    // if FloorPlanEngine is available, no need to call the script
    const floorModule = win;
    if (floorModule && floorModule.FloorPlanEngine) {
      return Promise.resolve(floorModule);
    }

    // call Archilogic Floor Plan script
    return new Promise((res, rej) => {
      const script = document.createElement("script");
      script.src = "https://code.archilogic.com/fpe-sdk/v3.1.x/fpe.js";
      script.async = true;
      script.defer = false;

      document.body.appendChild(script);
      script.onload = () => {
        // check if FloorPlanEngine is available
        const floorSdk = win;
        if (floorSdk && floorSdk.FloorPlanEngine) {
          res(floorSdk);
        } else {
          rej("FloorPlanEngine constructor not found");
        }
      };
    });
  }

  getFloorIdsByAsset(assetId: string, authorization: string) {
    let header = {
      headers: new HttpHeaders().set("Authorization", authorization),
    };
    return this.httpClient.get(
      `https://api.archilogic.com/v2/floor?label=${assetId}`,
      header
    );
  }

  addDeviceToRoom(
    deviceId: string,
    roomId: string,
    pos: string,
    authorization: string
  ) {
    let header = {
      headers: new HttpHeaders().set("Authorization", authorization),
    };
    const roomContainsPath = "properties.customFields.contains";
    return this.checkWrite(
      this.httpClient.put<Response<any>>(
        `https://api.archilogic.com/v2/space/${roomId}/custom-field/${roomContainsPath}`,
        { device: deviceId, pos: pos },
        header
      )
    );
  }

  getDeviceIcon(deviceId: string) {
    const url = this.buildUrl(`asset/floor-plan-data/device-id/${deviceId}`);
    return this.check(this.httpClient.get<Response<any>>(url));
  }

  getFloorPlanIcons() {
    const url = this.buildUrl(`asset/floor-plans`);
    return this.check(this.httpClient.get<Response<any>>(url));
  }

  getDesignDevices(floorId: string): Observable<FloorPlanDevice[]> {
    const url = this.buildUrl(`asset/floor-plan-data/floor-id/${floorId}`);
    return this.check(this.httpClient.get<Response<FloorPlanDevice[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
    ]);
  }

  publishFloorDeviceChanges(floorDevices: FloorPlanDevice[]) {
    const url = this.buildUrl(`asset/floor-plan-data`);
    return this.httpClient.post(url, floorDevices);
  }

  getAssetFloors(assetId: string): Observable<AssetFloor[]> {
    const url = this.buildUrl(`asset/floor-plans/asset-id/${assetId}`);
    return this.check(this.httpClient.get<Response<any>>(url));
  }

  postAssetFloors(floors: AssetFloor[]) {
    const url = this.buildUrl(`asset/floor-plans`);
    return this.checkWrite(this.httpClient.post<Response<any>>(url, floors));
  }
}
