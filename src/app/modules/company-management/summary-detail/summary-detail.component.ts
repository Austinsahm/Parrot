import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { map } from 'rxjs/operators';

@Component({
  selector: 'app-summary-detail',
  templateUrl: './summary-detail.component.html',
  styleUrls: ['./summary-detail.component.scss']
})
export class SummaryDetailComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {

    let companyId = this.route.snapshot.paramMap.get('companyId');

    this.router.navigate([`./details`], { relativeTo: this.route, state:{companyId: companyId} });
  }

}
