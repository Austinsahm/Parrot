import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserHttpService } from 'src/app/data-access/http/user-http.service';
import { CompanyUser } from 'src/app/data-access/models/company.model';
import { Domain } from 'src/app/data-access/models/domain.model';
import { StatusCode } from 'src/app/data-access/models/http.model';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { UserInfoService } from 'src/app/services/user-info.service';
// import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserModalComponent implements OnInit {

  @Input() requireCredentials = true;

  company: Domain;

  form: FormGroup;
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  redirect: () => void;
  companyType: string;
  subdomain: string;

  constructor(
    private readonly fb: FormBuilder,
    public readonly modalRef: NgbActiveModal,
    private userInfoService: UserInfoService,
    private userHttpService: UserHttpService,
    private toastService: ToastrService,
    private readonly companyInfoService: CompanyInfoService,
    // private route: ActivatedRoute,
    // private router: Router,

  ) {

    this.companyType = this.companyInfoService.getCompanyInfo().companyType;

    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.form = this._createForm();
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
  }

  ngOnInit(): void {
  }

  saveHandler(): void {

    // this.form.patchValue({ 'userLoginName': this.form.get('loginId').value })

    let userData: CompanyUser = this.form.value;

    this.userHttpService.createUser(userData).subscribe((res) => {
      if (res.status === StatusCode.SUCCESS) {
        this.toastService.success('Created User successful', 'Create User');
        this.redirect();
      } else {
        this.toastService.error('Error while creating', '');
      }
    }, (error) => {
      if (!error.status)
        this.toastService.error(
          "You can't make the request, You are offline",
          ""
        );
      else this.toastService.error("Unknown errors", "");
    });

  }


  private _createForm(): FormGroup {
    const form = this.fb.group({
      userId: 'new-record',
      password: 'admin',
      // userLoginName: '',
      companyId: this.userInfoService.getUserInfo().userCompanyId,
      createdBy: "admin",
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])],
      emailAddress: ['', Validators.compose([Validators.required])],
      locationId: ['', Validators.compose([Validators.required])],
      userTypeId: ['', Validators.compose([Validators.required])],
      statusId: ['', Validators.compose([Validators.required])],
      loginId: ['', Validators.compose([Validators.required])],
      pryPhoneNo: ['', Validators.compose([Validators.required])],
      altPhoneNo: ['',]
    });

    // if (this.requireCredentials) {
    //   form.addControl('loginId', new FormControl('', Validators.compose([Validators.required])));
    //   form.addControl('password', new FormControl('', Validators.compose([Validators.required])))
    // }

    return form;
  }

}
