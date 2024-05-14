import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUser } from 'src/app/data-access/models/company.model';

@Component({
  selector: 'app-company-contact-create-modal',
  templateUrl: './company-contact-create-modal.component.html',
  styleUrls: ['./company-contact-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyContactCreateModalComponent implements OnInit {

  @Input() subdomain: string;
  @Input() duplicateEmails: string[] = [];

  constructor(
    private readonly modal: NgbActiveModal
  ) { }

  ngOnInit(): void { }

  saveHander(contact: CompanyUser): void {
    this.modal.close(contact);
  }

  closeHandler(): void {
    this.modal.close();
  }
}
