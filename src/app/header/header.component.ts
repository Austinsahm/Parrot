import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { Router } from '@angular/router';
import { Domain } from '../data-access/models/domain.model';
import { UserSessionInformation } from '../services/user.service';
import { SessionStorageService } from '../services/session-storage.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  page$: Observable<{ user: UserSessionInformation; company: Domain; loggedIn: boolean }>;
  loggedDate: Date;

  constructor(
    private readonly session: SessionStorageService,
    private userInfoService: UserInfoService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    this.page$ = combineLatest([
      this.session.domain$, this.session.user$, this.session.loggedIn$
    ]).pipe(
      map(([domain, user, loggedIn]) => {
        this.loggedDate = new Date();
        return { company: domain, user, loggedIn };
      })
    );
  }

  login() {
    this.router.navigateByUrl('login');
  }

  logout() {
    this.session.deleteUser().subscribe();
    this.userInfoService.deleteUserInfo();
    // this.session.deleteStorage().subscribe()
    this.router.navigateByUrl('');
  }
}
