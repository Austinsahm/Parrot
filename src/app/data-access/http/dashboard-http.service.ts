import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import { environment } from "src/environments/environment";
import {
  AssetTracker,
  ChartTypeModel,
  DashboardDevice,
  DashboardDirectory,
  DashboardForm,
  DashboardOwner,
  DeviceGeolocation,
  MarkerIcon,
  SpecificDashboard,
  StaticChart,
  TimeSeriesChart,
} from "../models/dashboard.model";
import { DevicesLogResponse, LogMessages } from "../models/device-logs.model";
import { DeviceDetail } from "../models/device.model";
import {
  AddressData,
  DeviceCoordinates,
  GeofenceDataSource,
  GeofencingHeaderResponse,
  Shape,
  ShapeDataForm,
} from "../models/geofencing.model";
import {
  Response,
  StatusCode,
  WriteResponsePayload,
} from "../models/http.model";
import { DeviceNetwork } from "../models/network.model";
import { SmartHomeDashboard } from "../models/smartHome.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable({
  providedIn: "root",
})
export class DashboardHttpService extends BaseHttpService {
  userId: string;

  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  fetchDashboardList(
    subdomain: string,
    day = 3
  ): Observable<DashboardDirectory[]> {
    const url = this.buildUrl(
      `charts/dashboard-directory/companyId/${subdomain}/day/${day}/userId/${this.userId}`
    );
    return this.check(
      this.httpClient.get<Response<DashboardDirectory[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  specificDashboard(
    dashboardId: string,
    day = 2
  ): Observable<SpecificDashboard> {
    const url = this.buildUrl(
      `charts/specific-dashboard/dashboardId/${dashboardId}/day/${day}`
    );
    return this.check(this.httpClient.get<Response<SpecificDashboard>>(url), [
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  specificGeolocation(
    dashboardId: string,
    day = 2
  ): Observable<SpecificDashboard> {
    const url = this.buildUrl(
      `charts/specific-geolocation/dashboardId/${dashboardId}/day/${day}`
    );
    return this.check(this.httpClient.get<Response<SpecificDashboard>>(url), [
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchGeolocationDirectory(
    subdomain: string,
    userId?: string,
    day = 5
  ): Observable<DashboardDirectory[]> {
    const url = this.buildUrl(
      `charts/geolocation-directory/companyId/${subdomain}/day/${day}/userId/${this.userId}`
    );
    return this.check(
      this.httpClient.get<Response<DashboardDirectory[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  fetchMarkerIcon(): Observable<MarkerIcon[]> {
    const url = this.buildUrl(`charts/list-marker-icon`);
    return this.check(this.httpClient.get<Response<MarkerIcon[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchStaticChartType(): Observable<ChartTypeModel[]> {
    const url = this.buildUrl(`charts/list-static-chart-type`);
    return this.check(this.httpClient.get<Response<ChartTypeModel[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchTimeSeriesChartType(): Observable<ChartTypeModel[]> {
    const url = this.buildUrl(`charts/list-time-series-chart-type`);
    return this.check(this.httpClient.get<Response<ChartTypeModel[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchStaticChart(
    deviceId: string,
    companyId: string
  ): Observable<StaticChart[]> {
    const url = this.buildUrl(
      `charts/static-charts/deviceId/${deviceId}/companyId/${companyId}`
    );
    return this.check(this.httpClient.get<Response<StaticChart[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchTimeSeriesChart(
    deviceId: string,
    companyId: string,
    startTime: string,
    stopTIme: string
  ): Observable<TimeSeriesChart[]> {
    const url = this.buildUrl(
      `charts/time-series/deviceId/${deviceId}/companyId/${companyId}/startDevNetwkTime/${startTime}/stopDevNetwkTime/${stopTIme}`
    );
    return this.check(this.httpClient.get<Response<TimeSeriesChart[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchDeviceGeolocation(
    deviceId: string,
    companyId: string
  ): Observable<DeviceGeolocation> {
    const url = this.buildUrl(
      `charts/geolocation/deviceId/${deviceId}/companyId/${companyId}`
    );
    return this.check(this.httpClient.get<Response<DeviceGeolocation>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  fetchDeviceGeolocationAddress(lat: number, lng: number): Observable<any> {
    const url =
      "http://open.mapquestapi.com/geocoding/v1/reverse?key=yqG7s22PK7ErgxE5cL35kqAZ3GbLfMqv";
    let data = {
      location: {
        latLng: {
          lat: lat,
          lng: lng,
        },
      },
    };
    return this.httpClient.post<any>(url, data);

    // const url = `https://nominatim.openstreetmap.org/reverse.php?lat=${lat}&lon=${lng}&zoom=21&format=jsonv2`;
    // return this.httpClient.get<Response<any>>(url);
  }

  fetchAssetTracker(
    deviceId: string,
    startTime: string,
    stopTIme: string
  ): Observable<AssetTracker> {
    const url = this.buildUrl(
      `charts/asset-tracker/deviceId/${deviceId}/startDevNetwkTime/${startTime}/stopDevNetwkTime/${stopTIme}`
    );
    return this.check(this.httpClient.get<Response<AssetTracker>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  dashboardOwnerList(companyId: string): Observable<DashboardOwner[]> {
    const url = this.buildUrl(
      `charts/dashboard-owner-list/companyId/${companyId}`
    );
    return this.check(this.httpClient.get<Response<DashboardOwner[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  dashboardDeviceList(companyId: string): Observable<DashboardDevice[]> {
    const url = this.buildUrl(
      `charts/dashboard-device-list/companyId/${companyId}`
    );
    return this.check(this.httpClient.get<Response<DashboardDevice[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  deviceDetailsList(
    companyId: string,
    userId: string
  ): Observable<DeviceDetail[]> {
    const url = this.buildUrl(
      `device/device-directory/list/companyId/${companyId}/userId/${userId}`
    );
    return this.check(this.httpClient.get<Response<DeviceDetail[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  saveDashboard(dashboardForm: DashboardForm): Observable<any> {
    const url = this.buildUrl(`setup/create-dashboard`);
    return this.check(this.httpClient.post<Response<any>>(url, dashboardForm), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  updateDashboard(dashboardForm: DashboardForm): Observable<any> {
    const url = this.buildUrl(`setup/update-dashboard`);
    return this.check(this.httpClient.put<Response<any>>(url, dashboardForm), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  getSpecificMarkerIcon(markerIconId: string): Observable<MarkerIcon> {
    const url = this.buildUrl(
      `charts/specific-marker-icon/markerIconId/${markerIconId}`
    );
    return this.check(this.httpClient.get<Response<MarkerIcon>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  generateGeofenceData(
    subdomain: string,
    deviceCatId: string,
    headerId: string
  ): Observable<ShapeDataForm> {
    const url = this.buildUrl(
      `reports/geofencing-specific/companyId/${subdomain}/clientDeviceCategId/${deviceCatId}/geoFencingHeaderId/${headerId}`
    );
    return this.check(this.httpClient.get<Response<ShapeDataForm>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  saveGeofencing(data: ShapeDataForm): Observable<WriteResponsePayload> {
    const url = this.buildUrl("geofencing/save");
    return this.checkWrite(
      this.httpClient.post<Response<WriteResponsePayload>>(url, data),
      [StatusCode.OK, StatusCode.CREATED]
    );
  }

  geofencingHeader(deviceId: string): Observable<GeofencingHeaderResponse[]> {
    const url = this.buildUrl(
      `geofencing/list-of-saved-geofencing/client_device_categ_id/${deviceId}`
    );
    return this.check(
      this.httpClient.get<Response<GeofencingHeaderResponse[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  geofenceSearchPoint(deviceId: string): Observable<any> {
    const url = this.buildUrl(
      `geofencing/device-location-search/deviceId/${deviceId}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  geofenceTracing(
    deviceId: string,
    startDate: string,
    endDate: string
  ): Observable<DeviceCoordinates[]> {
    const url = this.buildUrl(
      `geofencing/device-tracing/deviceId/${deviceId}/startDate/${startDate}/endDate/${endDate}`
    );
    return this.check(this.httpClient.get<Response<DeviceCoordinates[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  geofenceDataSource(
    deviceId: string,
    dataSource: string,
    startDate: string,
    endDate: string
  ): Observable<GeofenceDataSource[]> {
    const url = this.buildUrl(
      `geofencing/device-data-source-count/deviceId/${deviceId}/dataSource/${dataSource}/startDate/${startDate}/endDate/${endDate}`
    );
    return this.check(
      this.httpClient.get<Response<GeofenceDataSource[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  /**
   *
   * @param lat
   * @param lng
   * @returns
   */
  geofenceDetail(lat: string, lng: string): Observable<AddressData> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsApi}`;
    return this.httpClient.get<AddressData>(url);
  }

  geofenceAllDataSource(
    deviceId: string,
    startDate: string,
    endDate: string
  ): Observable<GeofenceDataSource[]> {
    const url = this.buildUrl(
      `geofencing/device-data-source-count-all/deviceId/${deviceId}/startDate/${startDate}/endDate/${endDate}`
    );
    return this.check(
      this.httpClient.get<Response<GeofenceDataSource[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  latestDeviceLog(deviceId: string): Observable<DevicesLogResponse> {
    const url = this.buildUrl(`device/deviceLogLatest/deviceId/${deviceId}`);

    return this.check(this.httpClient.get<Response<DevicesLogResponse>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  DeviceLogHstory(
    deviceId: string,
    startDate: string,
    endDate: string
  ): Observable<DevicesLogResponse> {
    const url = this.buildUrl(
      `device/deviceLogHistory/deviceId/${deviceId}/startDate/${startDate}/endDate/${endDate}`
    );

    return this.check(this.httpClient.get<Response<DevicesLogResponse>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  staticCharts(deviceId: string, companyId: string): Observable<any> {
    const url = this.buildUrl(
      `charts/static-charts/deviceId/${deviceId}/companyId/${companyId}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  singleTimeChart(
    deviceId: string,
    companyId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const url = this.buildUrl(
      `charts/time-series/deviceId/${deviceId}/companyId/${companyId}/startDevNetwkTime/${startDate}/stopDevNetwkTime/${endDate}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  multiTimeChart(
    deviceId: string,
    startDate: string,
    endDate: string
  ): Observable<any> {
    const url = this.buildUrl(
      `charts/combined-chart/deviceId/${deviceId}/startDevNetwkTime/${startDate}/stopDevNetwkTime/${endDate}`
    );
    return this.check(this.httpClient.get<Response<any>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  deviceNetworks(): Observable<DeviceNetwork[]> {
    const url = this.buildUrl(`device/device-networks`);
    return this.check(this.httpClient.get<Response<DeviceNetwork[]>>(url), [
      StatusCode.NOT_FOUND,
      StatusCode.OK,
      StatusCode.SUCCESS,
    ]);
  }

  smartHomeDevice(
    companyId: string,
    assetId: string
  ): Observable<SmartHomeDashboard[]> {
    const url = this.buildUrl(
      `device/smart-home-dashboard/companyid/${companyId}/assetid/${assetId}`
    );
    return this.check(
      this.httpClient.get<Response<SmartHomeDashboard[]>>(url),
      [StatusCode.NOT_FOUND, StatusCode.OK, StatusCode.SUCCESS]
    );
  }
}
