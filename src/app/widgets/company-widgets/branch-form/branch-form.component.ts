import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyLocation } from 'src/app/data-access/models/company.model';

@Component({
  selector: 'app-branch-form',
  templateUrl: './branch-form.component.html',
  styleUrls: ['./branch-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchFormComponent implements OnInit {

  @Input() branch: CompanyLocation;

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.createForm(this.branch);
  }

  private createForm(branch?: CompanyLocation): FormGroup {
    return this.fb.group({
      locationName: [branch?.locationName, Validators.compose([
        Validators.required
      ])],
      locationAddress: [branch?.locationAddress, Validators.compose([
        Validators.required
      ])],
      locationDes: [null, Validators.compose([
        Validators.required
      ])],
      stateId: [branch?.stateId, Validators.compose([
        Validators.required
      ])],
      cityId: [branch?.cityId, Validators.compose([
        Validators.required
      ])]
    });
  }
}
