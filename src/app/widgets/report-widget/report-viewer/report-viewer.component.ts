import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CompanyInfoService } from 'src/app/services/company-info.service';
import { Report } from '../types/common.types';

@Component({
  selector: 'app-report-viewer',
  templateUrl: './report-viewer.component.html',
  styleUrls: ['./report-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportViewerComponent<T> implements OnInit {
  formFont: string;

  @Output() onPrint: EventEmitter<void>;
  @Output() onSave: EventEmitter<void>;
  // @Output() onExport: EventEmitter<void>;
  @Output() onDelete: EventEmitter<void>;

  @Input() reportTitile: string;

  @Input() report: Report<T>
  @Input() limit = 10;

  get pages(): number {
    return this.report?.rows?.length ? Math.ceil(this.report.rows.length / this.limit) : 1;
  }

  constructor(
    private readonly companyInfoService: CompanyInfoService,
  ) {
    this.onPrint = new EventEmitter<void>();
    this.onSave = new EventEmitter<void>();
    // this.onExport = new EventEmitter<void>();
    this.onDelete = new EventEmitter<void>();
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void { }

}
