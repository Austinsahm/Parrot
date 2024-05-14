import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Observable } from "rxjs";
import { Domain } from "src/app/data-access/models/domain.model";
import { CreditBalanceService } from "src/app/data-access/credit-balance.service";
import {
  UserService,
  UserSessionInformation,
} from "src/app/services/user.service";
// import { Client } from "stompjs";

@Component({
  selector: "app-page-layout-header",
  templateUrl: "./page-layout-header.component.html",
  styleUrls: ["./page-layout-header.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutHeaderComponent implements OnInit {
  @Output() onLogin: EventEmitter<void>;
  @Output() onLogout: EventEmitter<void>;

  @Input() domain: Domain;
  @Input() user: UserSessionInformation;
  @Input() loggedIn: boolean;
  @Input() loginDate: Date;
  balance$: Observable<number>;
  // balance$: Client;

  constructor(
    private userService: UserService,
    private balance: CreditBalanceService
  ) {
    this.onLogin = new EventEmitter<void>();
    this.onLogout = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.balance.updateCreditBalance(this.domain?.companyId);

    this.balance$ = this.balance.balance$;
  }

  checkBalance(credit: number): string {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    if (isNaN(credit)) return formatter.format(0);
    return formatter.format(credit);
  }
}
