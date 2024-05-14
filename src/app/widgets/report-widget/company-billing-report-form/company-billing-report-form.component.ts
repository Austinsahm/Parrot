import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { Domain } from "src/app/data-access/models/domain.model";
import { DateService } from "src/app/services/date.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ToastrService } from "ngx-toastr";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-company-billing-report-form",
  templateUrl: "./company-billing-report-form.component.html",
  styleUrls: ["./company-billing-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyBillingReportFormComponent implements OnInit, OnDestroy {
  @Input() company: Domain;
  formFont: string;
  formFontColor: string;
  today: any;

  readonly form: FormGroup;

  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly companyInfoService: CompanyInfoService,
    private toastService: ToastrService,
    // private today: DateService,
    private dateHttp: DateHttpService,
    private userStore: UsersStoreService
  ) {
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.form = this.fb.group({
      from: [""],
      to: [""],
      // startDate: [''],
      // endDate: [''],
      fromCompany: [""],
      toCompany: [""],
      statusId: [""],
      format: ["XLS", Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    // this.dateHttp.defaultDatesParams(this.company.companyId).subscribe(
    // (data) => {
    //   this.form.patchValue({
    //     from: data[0].start_billing_rep_date,
    //     to: data[0].end_date,
    //   });
    // },
    //   (error) => {
    //     if (!error.status)
    //       this.toastService.error("You might be offline", "Request Failed");
    //     else this.toastService.error("Unknown Error", "");
    //   }
    // );

    this.userStore.defaultDateParams(this.company.companyId, true);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          from: data.start_billing_rep_date,
          to: data.end_date,
        });
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
}
