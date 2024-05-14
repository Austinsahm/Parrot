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
import { PartnerPermissionCategory } from "src/app/data-access/models/role-authorization.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { ErrorMessageService } from "src/app/services/error-message.service";
import { SessionStorageService } from "src/app/services/session-storage.service";

@Component({
  selector: "app-company-organogram",
  templateUrl: "./company-organogram.component.html",
  styleUrls: ["./company-organogram.component.scss"],
})
export class CompanyOrganogramComponent implements OnInit {
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
              type: "companies",
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
                  type: "companies",
                  expanded: el.children.length > 0 ? true : false,
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
                        type: "companies",
                        expanded: c.children.length > 0 ? true : false,
                        data: {
                          companyName: c.companyName,
                          companyAddress: c.companyAddress,
                          level: c.level,
                          companyId: c.companyId,
                          companyType: c.companyTypeId,
                          parentCompany: c.parentCompany,
                        },
                        children:
                          c.children.length > 0 &&
                          c.children.map((g) => {
                            return {
                              label: g.companyName,
                              type: "companies",
                              expanded: g.children.length > 0 ? true : false,
                              data: {
                                companyName: g.companyName,
                                companyAddress: g.companyAddress,
                                level: g.level,
                                companyId: g.companyId,
                                companyType: g.companyTypeId,
                                parentCompany: g.parentCompany,
                              },
                              children:
                                g.children.length > 0 &&
                                g.children.map((gg) => {
                                  return {
                                    label: gg.companyName,
                                    type: "companies",
                                    expanded:
                                      gg.children.length > 0 ? true : false,
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

        // console.log(this.companyOrgData);

        // let res = data.children.map((el, i) => {
        //   if (data.children[i].children.length > 0) {
        //     return {
        //       ...el,
        //       label: el.companyName,
        //       expanded: true,
        //       type: el.companyTypeId,
        //       data: {
        //         companyName: el.companyName,
        //         companyAddress: el.companyAddress,
        //         level: el.level,
        //         parent: el.parentCompanyId,
        //       },
        //     };        }
        //   return {
        //     ...el,
        //     label: el.companyName,
        //     expanded: true,
        //     type: el.companyTypeId,
        //     data: {
        //       companyName: el.companyName,
        //       companyAddress: el.companyAddress,
        //       level: el.level,
        //       parent: el.parentCompanyId,
        //     },
        //   };
        // });

        // console.log(res, "res");

        // const child = [];
        // for (let i = 0; i < data.children.length; i++) {
        //   if (data.children[i].children.length > 0) {
        //   }
        // }
      },
      () => {}
    );
  }

  showTooltip(data: any): string {
    return `<div style='background-color: #504c4c;color: #f5efef; padding:.2em !important font-size:12px'><span style='margin-top:0 background-color:1px red solid'>Company Type: ${data.companyType}</span>
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
