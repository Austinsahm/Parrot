import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportHeaderComponent implements OnInit {

  // @Output() onPrint: EventEmitter<void>;
  // @Output() onSave: EventEmitter<void>;
  // @Output() onExport: EventEmitter<void>;
  // @Output() onDelete: EventEmitter<void>;

  @Input() reportTitile: string;
  @Input() curPage = 1;
  @Input() totalPages = 1;

  constructor() {
    // this.onPrint = new EventEmitter<void>();
    // this.onSave = new EventEmitter<void>();
    // this.onExport = new EventEmitter<void>();
    // this.onDelete = new EventEmitter<void>();
  }

  ngOnInit(): void { }

}
