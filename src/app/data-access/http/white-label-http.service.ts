import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import {
  Response,
  StatusCode,
  WriteResponsePayload,
} from "../models/http.model";
import {
  WhiteLabelDirectory,
  WhiteLabelFormData,
} from "../models/white-label.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable()
export class WhiteLabelHttpService extends BaseHttpService {
  userId: string;

  constructor(
    private userInfoService: UserInfoService,
    protected readonly httpClient: HttpClient,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.userId = userInfoService.getUserInfo()?.userId;
  }

  /**
   * Returns white labels for a given subdomain
   * @param subdomain
   */
  fetch(subdomain: string): Observable<WhiteLabelDirectory[]> {
    const url = this.buildUrl(
      `whitelabel/list/directory/companyId/${subdomain}`
    );
    // const url = this.buildUrl(`whitelabel/list/directory/companyId/${subdomain}/userId/${this.userId}`);
    return this.check(
      this.httpClient.get<Response<WhiteLabelDirectory[]>>(url)
    );
  }

  /**
   * Updates white label information
   * @param subdomain
   * @param attributes
   */
  update(
    subdomain: string,
    attributes: WhiteLabelFormData
  ): Observable<WriteResponsePayload> {
    const {
      bodyColour,
      footerColour,
      headerColour,
      sideBarColor,
      formColor,
      footerFontColour,
      headerFontColour,
      formFontType,
      formFontColor,
    } = attributes;
    const url = this.buildUrl("whitelabel/update-colors");
    return this.checkWrite(
      this.httpClient.put<Response<WriteResponsePayload>>(url, {
        headerColour,
        sideBarColor,
        bodyColour,
        footerColour,
        companyId: subdomain,
        formColor,
        footerFontColour,
        headerFontColour,
        formFontType,
        formFontColor,
      }),
      [StatusCode.OK, StatusCode.CREATED]
    );
  }

  updateLogo(formData: FormData): Observable<WriteResponsePayload> {
    const url = this.buildUrl(`whitelabel/upload-logo`);
    return this.checkWrite(
      this.httpClient.put<Response<WriteResponsePayload>>(url, formData),
      [StatusCode.OK, StatusCode.CREATED]
    );
  }
}
