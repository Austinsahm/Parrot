import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Renderer2,
} from "@angular/core";
import { Router } from "@angular/router";
import { combineLatest, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { Domain } from "src/app/data-access/models/domain.model";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { UserInfoService } from "src/app/services/user-info.service";
import { UserService, UserSessionInformation } from "src/app/services/user.service";

@Component({
  selector: "app-page-layout",
  templateUrl: "./page-layout.component.html",
  styleUrls: ["./page-layout.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent implements OnInit {
  page$: Observable<{
    user: UserSessionInformation;
    company: Domain;
    loggedIn: boolean;
  }>;
  loggedDate: Date;

  constructor(
    private readonly session: SessionStorageService,
    private readonly userInfoService: UserInfoService,
    private readonly router: Router,
    private readonly renderer: Renderer2,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.page$ = combineLatest([
      this.session.domain$,
      this.session.user$,
      this.session.loggedIn$,
    ]).pipe(
      map(([domain, user, loggedIn]) => {
        // this.renderer.setStyle(
        //   document.body,
        //   "background-color",
        //   "#" + (domain?.bodyColour || "a7dce3")
        // );
        this.loggedDate = new Date();
        this.userService.balance.next(user.creditBalance);                
        return { company: domain, user, loggedIn };
      })
    );
  }

  login() {
    this.router.navigateByUrl("login");
  }

  logout() {
    // this.session.deleteUser().subscribe(()=>{});
    // this.session.deletePermission().subscribe();
    this.session.deleteStorage().subscribe(() => {
      this.router.navigateByUrl("login");
      this.userInfoService.deleteUserInfo();
      // this.session.deleteDomain().subscribe();
    });
  }
}
