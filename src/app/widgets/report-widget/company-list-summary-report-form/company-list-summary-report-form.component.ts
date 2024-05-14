import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { Domain } from "src/app/data-access/models/domain.model";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { DateService } from "src/app/services/date.service";

@Component({
  selector: "app-company-list-summary-report-form",
  templateUrl: "./company-list-summary-report-form.component.html",
  styleUrls: ["./company-list-summary-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListSummaryReportFormComponent
  implements OnInit, OnDestroy
{
  @Input() company: Domain;
  today: any;
  formFont: string;
  formFontColor: string;

  readonly form: FormGroup;

  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly companyInfoService: CompanyInfoService,
    private toastService: ToastrService,
    private dateHttp: DateHttpService,
    private userStore: UsersStoreService
  ) {
    this.today = new Date();
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = companyInfoService.getCompanyInfo().formFontColor;

    this.form = this.fb.group({
      from: [""],
      to: [""],
      // startDate: [''],
      // endDate: [''],
      statusId: [""],
      format: ["XLS", Validators.compose([Validators.required])],
      typeId: [""],
    });
  }

  ngOnInit(): void {
    // this.dateHttp.defaultDatesParams(this.company.companyId).subscribe(
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

    this.userStore.defaultDateParams(this.company.companyId);

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
}
