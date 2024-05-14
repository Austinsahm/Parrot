import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { TreeNode } from "primeng/api";
import { Observable } from "rxjs";
import { CompanyHttpService } from "src/app/data-access/http/company-http.service";
import { CompanyTypeCode } from "src/app/data-access/models/company.model";
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-company-vertical-organogram",
  templateUrl: "./company-vertical-organogram.component.html",
  styleUrls: ["./company-vertical-organogram.component.scss"],
})
export class CompanyVerticalOrganogramComponent implements OnInit {
  companyOrgData: TreeNode[];
  companyId: string;
  loading: boolean = true;
  formColor: string;
  formBgColor: string;
  formFont: string;
  errorExist:string

  @Output() detailCompany = new EventEmitter<any>();
  @Output() newCompany = new EventEmitter();

  permission$: Observable<PartnerPermissionCategory>;

  constructor(
    private companyHttp: CompanyHttpService,
    private readonly companyInfoService: CompanyInfoService,
    private sessionService: SessionStorageService,
    private readonly cd: ChangeDetectorRef,
    private toastService: ToastrService,
    private errMsg: ErrorMessageService
  ) {
    this.permission$ = this.sessionService.partnerReadPermission();
    this.companyId = this.companyInfoService.getCompanyInfo().companyId;
    this.formColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {
    this.companyHttp.fetchOrganogram(this.companyId).subscribe(
      (data) => {
        if (!data) this.errMsg.errorExist("Company data not available");
        else {
          this.companyOrgData = [
            {
              expanded: data.children.length > 0 ? true : false,
              label: data.companyName,
              type: data.children.length ? "companies" : "company",
              styleClass: "first",
              data: {
                companyName: data.companyName,
                companyAddress: data.companyAddress,
                level: data.level,
                companyId: data.companyId,
                companyType: data.companyTypeId,
                parentCompany: data.parentCompany,
                grandParent: true,
              },
              children: data.children.map((el) => {
                return {
                  label: el.companyName,
                  type: el.level === 2 ? "companies" : "company",
                  expanded: true, // el.children.length > 0 ? true : false,
                  styleClass:
                    el.companyTypeId === CompanyTypeCode.PARTNER
                      ? "partner"
                      : el.companyTypeId === CompanyTypeCode.CORPORATE
                      ? "corporate"
                      : el.companyTypeId === CompanyTypeCode.INDIVIDUAL
                      ? "individual"
                      : "all",
                  data: {
                    companyName: el.companyName,
                    companyAddress: el.companyAddress,
                    level: el.level,
                    companyId: el.companyId,
                    companyType: el.companyTypeId,
                    parentCompany: el.parentCompany,
                  },
                  children:
                    el.children.length > 0 &&
                    el.children.map((c) => {
                      return {
                        label: c.companyName,
                        type: "company",
                        expanded: true, //c.children.length > 0 ? true : false,
                        styleClass:
                          c.companyTypeId === CompanyTypeCode.PARTNER
                            ? "partner"
                            : c.companyTypeId === CompanyTypeCode.CORPORATE
                            ? "corporate"
                            : c.companyTypeId === CompanyTypeCode.INDIVIDUAL
                            ? "individual"
                            : "all",

                        data: {
                          companyName: c.companyName,
                          companyAddress: c.companyAddress,
                          level: c.level,
                          companyId: c.companyId,
                          companyType: c.companyTypeId,
                          parentCompany: c.parentCompany,
                        },
                        children:
                          c.children.length &&
                          c.children.map((g) => {
                            return {
                              label: g.companyName,
                              type: "company",
                              expanded: true,
                              styleClass:
                                g.companyTypeId === CompanyTypeCode.PARTNER
                                  ? "partner"
                                  : g.companyTypeId ===
                                    CompanyTypeCode.CORPORATE
                                  ? "corporate"
                                  : g.companyTypeId ===
                                    CompanyTypeCode.INDIVIDUAL
                                  ? "individual"
                                  : "all",
                              data: {
                                companyName: g.companyName,
                                companyAddress: g.companyAddress,
                                level: g.level,
                                companyId: g.companyId,
                                companyType: g.companyTypeId,
                                parentCompany: g.parentCompany,
                              },
                              children:
                                g.children.length &&
                                g.children.map((gg) => {
                                  return {
                                    label: gg.companyName,
                                    type: "company",
                                    expanded: true,
                                    styleClass:
                                      gg.companyTypeId ===
                                      CompanyTypeCode.PARTNER
                                        ? "partner"
                                        : gg.companyTypeId ===
                                          CompanyTypeCode.CORPORATE
                                        ? "corporate"
                                        : gg.companyTypeId ===
                                          CompanyTypeCode.INDIVIDUAL
                                        ? "individual"
                                        : "all",
                                    data: {
                                      companyName: gg.companyName,
                                      companyAddress: gg.companyAddress,
                                      level: gg.level,
                                      companyId: gg.companyId,
                                      companyType: gg.companyTypeId,
                                      parentCompany: gg.parentCompany,
                                    },
                                  };
                                }),
                            };
                          }),
                      };
                    }),
                };
              }),
            },
          ];
        }
        this.loading = false;
        this.cd.detectChanges();
      },
      () => {}
    );
  }

  showTooltip(data: any): string {
    return `<div style='background-color: #504c4c;color: #f5efef;'><span style='margin-top:0 background-color:1px red solid'>Company Type: ${data.companyType}</span>
<span>Address: ${data.companyAddress}</span></div>
`;
  }

  onNavigateDetails(companyId: string) {
    this.detailCompany.emit(companyId);
  }

  onNavigateNew() {
    this.newCompany.emit();
  }
}
