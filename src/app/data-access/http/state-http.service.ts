import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserInfoService } from "src/app/services/user-info.service";
import { Response } from "../models/http.model";
import { State, StateDirectory } from "../models/location.model";
import { BaseHttpService } from "./base-http.service";
import { ErrorMessageService } from "src/app/services/error-message.service";

@Injectable()
export class StateHttpService extends BaseHttpService {
  countryId: string;

  constructor(
    protected readonly httpClient: HttpClient,
    private userInfoService: UserInfoService,
    protected errMsg: ErrorMessageService
  ) {
    super(httpClient, errMsg);
    this.countryId = userInfoService.getUserInfo()?.countryId;
  }

  /**
   * Fetches all states from the server
   */
  fetch(): Observable<State[]> {
    const url = this.buildUrl(`setup/states/countryId/${this.countryId}`);
    return this.check(this.httpClient.get<Response<State[]>>(url));
  }

  fetchToState(fromState: string): Observable<State[]> {
    const url = this.buildUrl(
      `setup/states-parts/countryId/${this.countryId}/stateName/${fromState}`
    );
    return this.check(this.httpClient.get<Response<State[]>>(url));
  }

  /**
   * Fetches all states from the server
   */
  fetchDirectory(): Observable<StateDirectory[]> {
    const url = this.buildUrl("setup/state-directory");
    return this.check(this.httpClient.get<Response<StateDirectory[]>>(url));
  }

  /**
   * Finds a single state by Id
   * @param stateId
   */
  findDirectoryById(stateId: string): Observable<StateDirectory> {
    const url = this.buildUrl(`setup/state-specific/stateId/${stateId}`);
    return this.check(this.httpClient.get<Response<StateDirectory>>(url));
  }
}
