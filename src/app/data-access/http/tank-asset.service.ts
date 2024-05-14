import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { environment } from "src/environments/environment";
import { BaseHttpService } from "./base-http.service";
import { BehaviorSubject, Observable, Subject, of } from "rxjs";
import { Response, StatusCode } from "../models/http.model";
import { TankAssetResp } from "../models/asset.model";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";

interface Tank {
  device: string;
  level: number;
}

@Injectable({
  providedIn: "root",
})
export class TankAssetService extends BaseHttpService {
  private tankUrl = `${environment.apiServerEndpoint}/asset/tanks/company-id`;
  private companyId: string;
  private tankLevel = new BehaviorSubject<Tank[]>([]);
  private tankLevelSubjects: { [deviceId: string]: Subject<number> } = {};

  tankLevel$ = this.tankLevel.asObservable();

  constructor(
    private http: HttpClient,
    private companyInfo: CompanyInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(http, errMsg);
    this.companyId = companyInfo.getCompanyInfo().companyId;
  }

  loadComapnyTankAssest(): Observable<TankAssetResp[]> {
    return this.check(
      this.http.get<Response<TankAssetResp[]>>(
        `${this.tankUrl}/${this.companyId}`
      ),
      [StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  updateTankLevel(deviceId: string) {
    const client = new Client({
      // brokerURL: ``,
      // connectHeaders: {
      //   deviceId,
      // },
      debug: function (str) {},
      webSocketFactory() {
        return new SockJS(
          `${environment.apiServerEndpoint}/tank-level?tankDeviceId=${deviceId}`
        );
      },
      onConnect: function () {
        client.subscribe(
          `/ws/asset/tank-level/device-id/${deviceId}`,
          (content: any) => {
            const level = +content.body.split("=")[1];
            const tank = { device: deviceId, level };
            const tanks = this.tankLevel.value;
            const findTank = tanks.findIndex((el) => el.device === tank.device);
            if (findTank !== -1) tanks.splice(findTank, 1, tank);
            else tanks.push(tank);
            this.tankLevel.next(tanks);
          },
          { "device-id": deviceId }
        );
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    // console.log(typeof WebSocket)
    // Fallback code
    if (typeof WebSocket !== "function") {
      // For SockJS you need to set a factory that creates a new SockJS instance
      // to be used for each (re)connect
      client.subscribe(
        `/ws/asset/tank-level/device-id/${deviceId}`,
        (content: any) => {
          const level = +content.body.split("=")[1];
          const tank = { device: deviceId, level };
          const tanks = this.tankLevel.value;
          const findTank = tanks.findIndex((el) => el.device === tank.device);
          if (findTank !== -1) tanks.splice(findTank, 1, tank);
          else tanks.push(tank);

          this.tankLevel.next(tanks);
        },
        { "device-id": deviceId }
      );
    }

    client.onConnect = (frame) => {
      // "creditBalance":"4498.80"
      // console.log(frame)
      // Do something, all subscribes must be done is this callback
      // This is needed because this will be executed after a (re)connect
      client.subscribe(
        `/ws/tank-level/new-level/device-id/${deviceId}`,
        (content: any) => {
          const level = +content.body.split("=")[1];
          const tank = { device: deviceId, level };
          const tanks = this.tankLevel.value;
          const findTank = tanks.findIndex((el) => el.device === tank.device);
          if (findTank !== -1) tanks.splice(findTank, 1, tank);
          else tanks.push(tank);

          console.log(tanks);

          this.tankLevel.next(tanks);
        },
        { tankDeviceId: deviceId }
      );
    };

    client.onStompError = function (frame) {
      // Will be invoked in case of error encountered at Broker
      // Bad login/passcode typically will cause an error
      // Complaint brokers will set `message` header with a brief message. Body may contain details.
      // Compliant brokers will terminate the connection after any error
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    client.activate();
  }

  updateTankLevelAnimation(deviceId: string) {
    if (!this.tankLevelSubjects[deviceId]) {
      this.tankLevelSubjects[deviceId] = new Subject<number>();
      const client = new Client({
        debug: function (str) {},
        webSocketFactory() {
          return new SockJS(
            `${environment.apiServerEndpoint}/tank-level?tankDeviceId=${deviceId}`
          );
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // console.log(typeof WebSocket)
      // Fallback code
      if (typeof WebSocket !== "function") {
        // For SockJS you need to set a factory that creates a new SockJS instance
        // to be used for each (re)connect
        client.subscribe(
          `/ws/asset/tank-level/device-id/${deviceId}`,
          (content: any) => {
            const level = +content.body.split("=")[1];
            const tank = { device: deviceId, level };
            // const tanks = this.tankLevel.value;
            this.tankLevelSubjects[deviceId].next(level);
            console.log(this.tankLevelSubjects[deviceId].next(level));

            // const findTank = tanks.findIndex((el) => el.device === tank.device);
            // if (findTank !== -1) tanks.splice(findTank, 1, tank);
            // else tanks.push(tank);

            // this.tankLevel.next(tanks);
          },
          { "device-id": deviceId }
        );
      }

      client.onConnect = (frame) => {
        client.subscribe(
          `/ws/tank-level/new-level/device-id/${deviceId}`,
          (content: any) => {
            const level = +content.body.split("=")[1];
            this.tankLevelSubjects[deviceId].next(level);
            this.tankLevelSubjects[deviceId].asObservable().subscribe((res) => {
              console.log(res);
            });
            // const tank = { device: deviceId, level };
            // const tanks = this.tankLevel.value;
            // const findTank = tanks.findIndex((el) => el.device === tank.device);
            // if (findTank !== -1) tanks.splice(findTank, 1, tank);
            // else tanks.push(tank);

            // this.tankLevel.next(tanks);
            // return of(level);
          },
          { tankDeviceId: deviceId }
        );
      };

      client.onStompError = function (frame) {
        // Will be invoked in case of error encountered at Broker
        // Bad login/passcode typically will cause an error
        // Complaint brokers will set `message` header with a brief message. Body may contain details.
        // Compliant brokers will terminate the connection after any error
        console.log("Broker reported error: " + frame.headers["message"]);
        console.log("Additional details: " + frame.body);
      };

      client.activate();
    }
    return this.tankLevelSubjects[deviceId].asObservable();
  }

  tankLevelObs(tankId: string): Observable<string> {
    return of("");
  }
}
