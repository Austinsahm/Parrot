import { Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserService } from "../services/user.service";
import { StatusCode } from "./models/http.model";

@Injectable({ providedIn: "root" })
export class DomainValidate implements AsyncValidator {
  constructor(private domain: UserService) {}

  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
    const subdomain = control.value;
    return this.domain
      .validateDomain(subdomain, [StatusCode.NOT_FOUND, StatusCode.OK])
      .pipe(
        map((res) => {
          if (res) return { domainExist: true };
        })
      );
  };
}
