import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Domain } from 'src/app/data-access/models/domain.model';
import { UserSessionInformation } from 'src/app/services/user.service';

@Component({
  selector: 'app-page-layout-footer',
  templateUrl: './page-layout-footer.component.html',
  styleUrls: ['./page-layout-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageLayoutFooterComponent implements OnInit {

  @Input() domain: Domain;
  @Input() user: UserSessionInformation;

  constructor() { }

  ngOnInit(): void {
  }

}
