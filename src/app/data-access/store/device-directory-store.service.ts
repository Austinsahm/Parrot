import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { DeviceCategoryDataAccessService } from "../device-category-data-access.service";
import { DeviceDataAccessService } from "../device-data-access.service";
import {
  DeviceCategory,
  DeviceCategoryDirectory,
  DeviceConfigurationDirectory,
} from "../models/device.model";
import { searchByField } from "../utilities/collection.util";

/**
 * device direcory store
 *  store for accessing only device category directory information
 */
@Injectable({
  providedIn: "root",
})
export class DeviceDirectoryStoreService {
  private deviceCategoryDirectory = new BehaviorSubject<
    DeviceCategoryDirectory[]
  >([]);
  private deviceConfigDir = new BehaviorSubject<DeviceConfigurationDirectory[]>(
    []
  );

  deviceCategoryDirectory$: Observable<DeviceCategoryDirectory[]> =
    this.deviceCategoryDirectory.asObservable();
  deviceConfigDir$ = this.deviceConfigDir.asObservable();

  constructor(
    private deviceCategoryAccessor: DeviceCategoryDataAccessService,
    private errMsgService: ErrorMessageService,
    private readonly deviceDataAccessor: DeviceDataAccessService
  ) {}

  getDeviceCategoryDirectory(
    subdomain: string,
    deviceCategName?: string,
    refresh?: boolean
  ) {
    //check for param changes or behavior subject =0 before making new request
    if (
      refresh ||
      deviceCategName ||
      this.deviceCategoryDirectory.getValue().length === 0
    )
      this.deviceCategoryAccessor
        .getAccessor(subdomain, deviceCategName)
        .directory.fetch()
        .pipe(
          catchError((err) => {
            if (!err.status) {
              this.errMsgService.errorExist("You're probably offline");
            } else this.errMsgService.errorExist("Unknown Error occured");
            return of([]);
          }),
          tap((deviceCatDir) => this.deviceCategoryDirectory.next(deviceCatDir))
        )
        .subscribe({ error: () => {} });
  }

  searchDeviceCategory(
    keywords: string
  ): Observable<DeviceCategoryDirectory[]> {
    return this.deviceCategoryDirectory.pipe(
      map((categories) =>
        searchByField(
          categories,
          (category) => category.deviceCategName,
          keywords
        )
      ),
      tap((devices) => {
        if (!devices.length) {
          return this.errMsgService.errorExist(
            "Your search do not return any result"
          );
        }
        this.errMsgService.clearError();
      })
    );
  }

  getAllDeviceConfigDir(subdomain: string, userId: string, refresh?: boolean) {
    if (!this.deviceConfigDir.getValue().length || !refresh) {
      this.deviceDataAccessor
        .getAccessor(subdomain, userId)
        .fetchDirectory()
        .pipe(
          catchError((err) => {
            if (!err.status) {
              this.errMsgService.errorExist("You're probably offline");
            } else this.errMsgService.errorExist("Unknown Error occured");
            return of([]);
          }),
          tap((configDir) => this.deviceConfigDir.next(configDir))
        )
        .subscribe({ error: () => {} });
    }
  }

  searchDeviceConfigDir(
    keywords: string
  ): Observable<DeviceConfigurationDirectory[]> {
    return this.deviceConfigDir.pipe(
      map((directories) =>
        searchByField(
          directories,
          (directory) => directory.deviceName,
          keywords
        )
      ),
      tap((devices) => {
        if (!devices.length) {
          return this.errMsgService.errorExist(
            "Your search do not return any directory"
          );
        }
        this.errMsgService.clearError();
      })
    );
  }
}
