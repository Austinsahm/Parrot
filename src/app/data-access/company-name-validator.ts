import { Injectable } from "@angular/core";
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  Validator,
} from "@angular/forms";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { CompanyService } from "../modules/company-management/company.service";

@Injectable({ providedIn: "root" })
export class CompanyNameValidator implements AsyncValidator {
  constructor(private companyService: CompanyService) {}

  validate = (
    control: AbstractControl
  ): Promise<ValidationErrors> | Observable<ValidationErrors> => {
    const name: string = control.value;
    return this.companyService.loadCompanyName().pipe(
      take(1),
      map((values) => {
        const check = values.findIndex(
          (val) => val.companyName.toLowerCase() === name.toLowerCase()
        );
        if (check !== -1) {
          return { companyExist: true };
        }
      })
    );
  };
}
