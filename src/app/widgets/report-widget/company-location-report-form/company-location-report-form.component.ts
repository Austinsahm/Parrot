import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { DateService } from "src/app/services/date.service";

@Component({
  selector: "app-company-location-report-form",
  templateUrl: "./company-location-report-form.component.html",
  styleUrls: ["./company-location-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyLocationReportFormComponent implements OnInit, OnDestroy {
  readonly form: FormGroup;

  fromState: string;

  toState: string;

  fromCity: string;

  companyId: string;

  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private today: DateService,
    private dateHttp: DateHttpService,
    private toastService: ToastrService,
    private readonly companyInfoService: CompanyInfoService,
    private userStore: UsersStoreService
  ) {
    this.form = this.fb.group({
      from: [""],
      to: [""],
      fromState: [""],
      toState: [""],
      fromCity: [""],
      toCity: [""],
      statusId: [""],
      format: ["XLS", Validators.compose([Validators.required])],
      typeId: [""],
    });
  }

  ngOnInit(): void {
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    // this.dateHttp.defaultDatesParams(this.companyId).subscribe(
    //   (data) => {
    //     this.form.patchValue({
    //       from: data[0].start_compy_rep_date,
    //       to: data[0].end_date,
    //     });
    //   },
    //   (error) => {
    //     if (!error.status)
    //       this.toastService.error("You might be offline", "Request Failed");
    //     else this.toastService.error("Unknown Error", "");
    //   }
    // );

    this.userStore.defaultDateParams(this.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          from: data.start_compy_rep_date,
          to: data.end_date,
        });
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  fromStateFn($event) {
    this.fromState =
      $event.target.options[$event.target.options.selectedIndex].text;
  }

  toStateFn($event) {
    this.toState =
      $event.target.options[$event.target.options.selectedIndex].text;
  }

  fromCityFn($event) {
    this.fromCity =
      $event.target.options[$event.target.options.selectedIndex].text;
  }
}
