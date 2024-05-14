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
import { DateService } from "src/app/services/date.service";

@Component({
  selector: "app-device-message-report-form",
  templateUrl: "./device-message-report-form.component.html",
  styleUrls: ["./device-message-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceMessageReportFormComponent implements OnInit, OnDestroy {
  @Input() company: Domain;

  readonly form: FormGroup;

  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private today: DateService,
    private dateHttp: DateHttpService,
    private toastService: ToastrService,
    private userStore: UsersStoreService
  ) {
    this.form = this.fb.group({
      from: [""],
      to: [""],
      fromCompany: [""],
      toCompany: [""],
      statusId: [""],
      format: ["XLS", Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    //   this.dateHttp.defaultDatesParams(this.company.companyId).subscribe(
    //     (data) => {
    //       this.form.patchValue({
    //         from: data[0].start_mess_rep_date,
    //         to: data[0].end_date,
    //       });
    //     },
    //     (error) => {
    //       if (!error.status)
    //         this.toastService.error("You might be offline", "Request Failed");
    //       else this.toastService.error("Unknown Error", "");
    //     }
    //   );

    this.userStore.defaultDateParams(this.company.companyId);

    this.subscription = this.userStore.defaultDate$.subscribe(
      (data) => {
        this.form.patchValue({
          from: data.start_mess_rep_date,
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
