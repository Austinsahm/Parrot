import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DateHttpService } from "src/app/data-access/http/date-http.service";
import { Domain } from "src/app/data-access/models/domain.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import * as _moment from "moment";
import { ToastrService } from "ngx-toastr";
import { MatSelectChange } from "@angular/material/select";
import { UsersStoreService } from "src/app/data-access/store/users-store.service";
import { Subscription } from "rxjs";
// import { DateService } from 'src/app/services/date.service';

@Component({
  selector: "app-corporate-device-list-report-form",
  templateUrl: "./corporate-device-list-report-form.component.html",
  styleUrls: ["./corporate-device-list-report-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateDeviceListReportFormComponent
  implements OnInit, OnDestroy
{
  @Input() company: Domain;

  readonly form: FormGroup;

  fromCateg: string;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  today: any;
  devStatus: string;
  statusList = [
    { key: "ACTIVE", value: "ACTIVE", label: "Active" },
    { key: "INACTIVE", value: "INACTIVE", label: "Inactive" },
    { key: "ALL", value: "ALL", label: "All" },
  ];
  devNetw: string;

  selectable: boolean = true;
  moment = _moment;
  subscription: Subscription;

  constructor(
    private readonly fb: FormBuilder,
    private readonly cd: ChangeDetectorRef,
    private dateHttp: DateHttpService,
    private companyInfoService: CompanyInfoService,
    private toastService: ToastrService,
    private userStore: UsersStoreService
  ) {
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.today = new Date();

    this.form = this.fb.group({
      // from: ['', Validators.compose([Validators.required])],
      // to: ['', Validators.compose([Validators.required])],
      // fromCategory: ['', Validators.compose([Validators.required])],
      // toCatogery: ['', Validators.compose([Validators.required])],
      // statusId: ['', Validators.compose([Validators.required])],
      from: [""],
      to: [""],
      fromCategory: [""],
      toCategory: [""],
      statusId: [""],
      networkId: [""],
      format: ["XLS", Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    // this.dateHttp.defaultDatesParams(this.company.companyId).subscribe(
    //   (data) => {
    //     this.form.patchValue({
    //       from: this.moment(data[0].start_device_rep_date).format("YYYY-MM-DD"),
    //       to: this.moment(data[0].end_date).format("YYYY-MM-DD"),
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
          from: data.start_device_rep_date,
          to: data.end_date,
        });
      },
      () => {}
    );
  }

  fromCategFn($event) {
    // let category =
    //   $event.target.options[$event.target.options.selectedIndex].text;
    this.fromCateg = $event.value; //category.split("-")[0];
    // console.log(category, 'categ');
    this.form.patchValue({ fromCategory: this.fromCateg });
  }

  toCategFn(e: MatSelectChange) {
    this.form.patchValue({ toCategory: e.value });
  }

  changeStatus(e) {
    this.devStatus = e.value;
    this.form.patchValue({ statusId: e.value });
  }

  changeNetwork(e) {
    this.devNetw = e.value;
    this.form.patchValue({
      networkId: this.devNetw,
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
