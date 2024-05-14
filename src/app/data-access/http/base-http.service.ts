import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
  Exception,
  Response,
  StatusCode,
  WriteResponsePayload,
  WriteStatusCode,
} from "../models/http.model";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable()
export abstract class BaseHttpService {
  constructor(
    protected readonly httpClient: HttpClient,
    protected errMsg: ErrorMessageService
  ) {}

  /**
   * Builds a full URL using information provided in environment config file
   * @param fragment
   */
  protected buildUrl(fragment: string): string {
    return `${environment.apiServerEndpoint}/${fragment}`;
  }

  /**
   * Builds a full URL using information provided in environment config file
   * @param fragment
   */
  // protected buildGreenBackUrl(fragment: string): string {
  //   return `${environment.apiServerGreenbackEndpoint}/${fragment}`;
  // }

  /**
   * Checks a given response for statuses considered to be errors and throws the necessary exceptions.
   * This method is here to
   * @param response
   * @param successCodes If the call returns any of the status codes passed here, this method will assume that the request succeeded.
   */
  protected check<T>(
    response: Observable<Response<T>>,
    successCodes: StatusCode[] = [StatusCode.OK]
  ): Observable<T> {
    return response.pipe(
      catchError((response: HttpErrorResponse) => {
        console.log(response, typeof response.status, response.status === 400);
        //bad request
        if (response.status === 400) {
          this.errMsg.errorExist("Bad request");
        }

        //no internet connection
        else if (response.name === "HttpErrorResponse") {
          this.errMsg.errorExist("Slow or no internet connection");
        }

        console.log("2nd");

        return throwError(new Error(response.message || response.statusText));
      }),
      map((payload) => {        
        if (!successCodes.includes(payload.statusCode)) {
          throw new Exception(payload.statusCode);
        }
        return payload.response;
      })
    );
  }

  /**
   * Checks a given response for statuses considered to be errors and throws the necessary exceptions.
   * This method is here to
   * @param response
   * @param successCodes If the call returns any of the status codes passed here, this method will assume that the request succeeded.
   */
  protected checkWrite(
    response: Observable<Response<WriteResponsePayload>>,
    successCodes: StatusCode[] = [StatusCode.OK]
  ): Observable<WriteResponsePayload> {
    return this.check(response, successCodes);
    // .pipe(
    //   map((payload) => {
    //     if (payload.status !== WriteStatusCode.SUCCESS) {
    //       console.log(response, "base");
    //       throw new Error(payload.description);
    //     }

    //     return payload;
    //   })
    // );
  }
}
