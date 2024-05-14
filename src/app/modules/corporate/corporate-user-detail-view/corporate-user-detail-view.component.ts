import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { CompanyUser } from "src/app/data-access/models/company.model";
import { UserGroup } from "src/app/data-access/models/group.model";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-corporate-user-detail-view",
  templateUrl: "./corporate-user-detail-view.component.html",
  styleUrls: ["./corporate-user-detail-view.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorporateUserDetailViewComponent implements OnInit {
  @Output() onClose: EventEmitter<void>;

  @Input() user: CompanyUser;
  @Input() groups: UserGroup[] = [];

  primaryColour: string;
  secondaryColour: string;

  constructor(private readonly companyInfoService: CompanyInfoService) {
    this.onClose = new EventEmitter<void>();
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.secondaryColour =
      this.companyInfoService.getCompanyInfo().secondaryColour;
  }

  ngOnInit(): void {}
}
