import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BulkDevice } from "../models/device.model";
import { BaseHttpService } from "./base-http.service";

@Injectable({
  providedIn: "root",
})
export class UtilityHttpService extends BaseHttpService {
  buildTemplateUrl(url: string) {
    const templateUrl = this.buildUrl(url);
    return templateUrl;
  }

  bulkDeviceUpload(reqBody: FormData): Observable<any> {
    const url = this.buildUrl(`utility/bulk-upload-device`);
    const response = this.httpClient.post(url, reqBody, {
      responseType: "arraybuffer",
    });

    console.log(response);

    return response;
  }

  viewTemplate({ companyId, networkId }): Observable<any> {
    const url = this.buildUrl(
      `utility/bulk-upload-device-template/companyId/${companyId}/networkId/${networkId}`
    );
    const response = (this.httpClient.get(url, { responseType: "arraybuffer" }));

    return response;
  }

  /**
   * Method is use to download file.
   * @param data - Array Buffer data
   * @param type - type of the document.
   */
  downLoadFile(data: any, type: string) {
    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // the filename you want
    a.download = "upload-status.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  }
}
