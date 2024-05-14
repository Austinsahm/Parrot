import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { CompanyUser } from 'src/app/data-access/models/company.model';

@Component({
  selector: 'app-company-contact-update-modal',
  templateUrl: './company-contact-update-modal.component.html',
  styleUrls: ['./company-contact-update-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyContactUpdateModalComponent implements OnInit {

  @Input() contact: Observable<CompanyUser>;

  @Input() subdomain: string;

  constructor(
    private readonly modal: NgbActiveModal
  ) {
   }

  ngOnInit(): void { }

  saveHandler(contact: CompanyUser): void {
    this.modal.close(contact);

  }

  closeHandler(): void {
    this.modal.close();
  }

}
