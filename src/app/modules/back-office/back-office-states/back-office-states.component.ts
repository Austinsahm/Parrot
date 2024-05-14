import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateDirectory } from 'src/app/data-access/models/location.model';
import { StateDataAccessService } from 'src/app/data-access/state-data-access.service';
import { attachProgress } from 'src/app/widgets/common-widgets/functions';
import { ProgressOutput } from 'src/app/widgets/common-widgets/types';

@Component({
  selector: 'app-back-office-states',
  templateUrl: './back-office-states.component.html',
  styleUrls: ['./back-office-states.component.scss']
})
export class BackOfficeStatesComponent implements OnInit {

  states$: Observable<ProgressOutput<StateDirectory[]>>;
  
  constructor(
    private readonly dataAccessor: StateDataAccessService
  ) { }

  ngOnInit(): void {
    this.states$ = attachProgress(this.dataAccessor.fetchDirectory());
  }

  addStateHandler(): void {}
}
