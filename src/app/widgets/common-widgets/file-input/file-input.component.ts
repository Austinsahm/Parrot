import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CompanyInfoService } from "src/app/services/company-info.service";

@Component({
  selector: "app-file-input",
  templateUrl: "./file-input.component.html",
  styleUrls: ["./file-input.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent implements OnInit, ControlValueAccessor {
  @ViewChild("fileInput") fileField: ElementRef<HTMLInputElement>;

  @Input() placeholder: string;
  @Input() multiple = false;
  @Input() type = "image";

  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  private _onChange = (value: any) => {};
  _onTouched = () => {};

  values: File[] = [];
  selectedFile: any = null;

  filename: string;

  constructor(protected readonly companyInfoService: CompanyInfoService) {
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
  }

  ngOnInit(): void {}

  selectionHandler(): void {
    this.values = [];
    const values = [];
    for (let i = 0; i < this.fileField.nativeElement.files.length; i++) {
      const file = this.fileField.nativeElement.files.item(i);

      if (file.type.includes(this.type)) values.push(file);
    }

    this.values = values;

    // console.log(values);

    this._onChange(this.multiple ? values : values.length ? values[0] : null);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.filename = file.name;
      this.values = [];
      const values = [];

      if (file.type.includes(this.type)) values.push(file);

      this.values = values;

      // console.log(values);

      this._onChange(this.multiple ? values : values.length ? values[0] : null);
    }
  }

  writeValue(files: File | File[]): void {
    this.values = Array.isArray(files) ? files : [files];
  }

  registerOnChange(fn: any): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}
}
