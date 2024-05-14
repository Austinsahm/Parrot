import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { UserService } from "../services/user.service";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { UserInfoService } from "../services/user-info.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CompanyTypeCode } from "../data-access/models/company.model";
import { finalize } from "rxjs/operators";
import { Domain } from "../data-access/models/domain.model";
import { CompanyInfoService } from "../services/company-info.service";

// import { CompanyInfoService } from '../services/company-info.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  public showPassword: boolean = false;

  loginForm: FormGroup;

  isLoading: boolean;

  domain: Domain;
  formBgColor: string;
  formFontColor: string;
  formFont: string;

  constructor(
    private userService: UserService,
    private userInfoService: UserInfoService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private readonly route: ActivatedRoute,
    private router: Router,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.domain = this.route.parent.snapshot.data.companyInitData;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;

    this.isLoading = false;

    this.loginForm = this.formBuilder.group({
      userCompanyId: [this.domain.companyId, [Validators.required]],
      userId: ["", [Validators.required]],
      password: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this.userInfoService.isAuthenticated()) {
      if (
        [CompanyTypeCode.CORPORATE, CompanyTypeCode.INDIVIDUAL].includes(
          this.domain.companyType
        )
      ) {
        this.router.navigateByUrl("corporate");
      } else {
        this.router.navigateByUrl("partner");
      }
      return;
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.isLoading = true;
    this.userService
      .login(this.loginForm.value)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (state) => {
          if (!state.passed) {
            this.toastrService.error(state.error?.message, "");
            return;
          }

          this.userInfoService.setUserInfo(state.session);

          switch (this.domain.companyType) {
            case CompanyTypeCode.CORPORATE:
            case CompanyTypeCode.INDIVIDUAL:
              this.router.navigateByUrl("corporate");
              break;

            default:
              this.router.navigateByUrl("partner");
              break;
          }
        },
        (error) => {
          if (error.name === "HttpErrorResponse")
            this.toastrService.error("Network Error", "Error");
        }
      );
  }
}
