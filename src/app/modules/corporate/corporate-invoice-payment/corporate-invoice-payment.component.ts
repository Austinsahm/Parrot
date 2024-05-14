import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CompanyInfoService } from "src/app/services/company-info.service";


@Component({
  selector: "app-corporate-invoice-payment",
  templateUrl: "./corporate-invoice-payment.component.html",
  styleUrls: ["./corporate-invoice-payment.component.scss"],
})


export class CorporateInvoicePaymentComponent implements OnInit {
  companyId: string;
  invoiceForm: FormGroup;
  companyName: string;
  primaryColour: string;
  secondaryColour: string;
  subdomain: string;

  constructor(
    protected readonly companyInfoService: CompanyInfoService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
    this.invoiceForm = this.formBuilder.group({
      invoice: ["", [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.subdomain = this.companyInfoService.getCompanyInfo().companyId;

    this.companyName = this.companyInfoService.getCompanyInfo().companyName;
  }

  cancel() {
    if (this.invoiceForm.touched) {
      this.reloadComponent();
    }
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = "reload";
    this.router.navigate([currentUrl]);
  }
}

