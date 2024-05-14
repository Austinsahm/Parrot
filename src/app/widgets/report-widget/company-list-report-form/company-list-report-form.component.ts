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
import { SessionStorageService } from "src/app/services/session-storage.service";
@Component({
  selector: "app-company-list-report-form",
  templateUrl: "./company-list-report-form.component.html",
  styleUrls: ["./company-list-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyListReportFormComponent implements OnInit, OnDestroy {
  readonly form: FormGroup;
  today: any;
  companyId: string;
  formFont: string;
  formFontColor: string;
  formBgColor: string;

  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    // private today: DateService,

    private dateHttp: DateHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private sessionService: SessionStorageService,
    private toastService: ToastrService,
    private userStore: UsersStoreService
  ) {
    this.today = new Date();
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.formFontColor = companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = companyInfoService.getCompanyInfo().formColor;

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

    this.userStore.defaultDateParams(this.companyId, true);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          from: data.start_compy_rep_date ,
          to: data.end_date ,
        });
      },
      () => {}
    );
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
