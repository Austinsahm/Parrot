import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { State } from 'src/app/data-access/models/location.model';

@Component({
  selector: 'app-state-list-table',
  templateUrl: './state-list-table.component.html',
  styleUrls: ['./state-list-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StateListTableComponent implements OnInit {

  @Output() onRowSelected: EventEmitter<State>;
  @Output() onRowDeleted: EventEmitter<State>;

  @Input() states: State[] = [];
  @Input() editable = false;

  constructor() {
    this.onRowSelected = new EventEmitter<State>();
    this.onRowDeleted = new EventEmitter<State>();
  }

  ngOnInit(): void {}

}
