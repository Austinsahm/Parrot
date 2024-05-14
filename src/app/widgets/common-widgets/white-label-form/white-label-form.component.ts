import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  WhiteLabel,
  WhiteLabelDirectory,
  WhiteLabelFormData,
} from "src/app/data-access/models/white-label.model";
import { CompanyInfoService } from "src/app/services/company-info.service";
import { SessionStorageService } from "src/app/services/session-storage.service";
import { ComboBoxOption } from "../types";

@Component({
  selector: "app-white-label-form",
  templateUrl: "./white-label-form.component.html",
  styleUrls: ["./white-label-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteLabelFormComponent implements OnInit {
  formFontColor: string;
  formBgColor: string;
  formFont: string;
  primaryColour: string;

  @Output() onSave: EventEmitter<WhiteLabelFormData>;
  @Output() onClose: EventEmitter<void>;
  @Output() onUpload: EventEmitter<FormData>;
  @Output() onDefault: EventEmitter<WhiteLabelFormData>;

  @Input() set editable(value: boolean) {
    this.editing = value;
  }

  @Input() company: WhiteLabel & WhiteLabelDirectory;

  editing = false;

  fontStyles: ComboBoxOption<string>[];
  fontStyle: string;

  form: FormGroup;
  selectedFile: any = null;
  filename: string;

  title: string;

  constructor(
    private readonly fb: FormBuilder,
    protected readonly companyInfoService: CompanyInfoService
  ) {
    this.primaryColour = this.companyInfoService.getCompanyInfo().primaryColour;
    this.formFontColor = this.companyInfoService.getCompanyInfo().formFontColor;
    this.formBgColor = this.companyInfoService.getCompanyInfo().formColor;
    this.formFont = this.companyInfoService.getCompanyInfo().formFontType;
    this.onSave = new EventEmitter<WhiteLabelFormData>();
    this.onClose = new EventEmitter<void>();
    this.onUpload = new EventEmitter<FormData>();
    this.onDefault = new EventEmitter<WhiteLabelFormData>();

    this.form = this.fb.group({
      visionStatement: ["", Validators.compose([])],
      missionStatement: ["", Validators.compose([])],
      logo: ["", Validators.compose([])],
      backgroundGraphics: ["", Validators.compose([])],
      productInformation: ["", Validators.compose([])],

      bodyColour: ["", Validators.compose([])],
      sideBarColor: ["", Validators.compose([])],
      footerColour: ["", Validators.compose([])],
      headerColour: ["", Validators.compose([])],
      companyUrl: ["", Validators.compose([])],
      formFontType: [""],
      formColor: [""],
      footerFontColour: [""],
      headerFontColour: [""],
      formFontColor: [""],
    });

    this.fontStyles = [
      {
        value: "  Abadi MT Condensed Light",
        key: "Abadi MT Condensed Light",
        label: "Abadi MT Condensed Light",
      },
      {
        key: "Albertus Extra Bold",
        label: "Albertus Extra Bold",
        value: "Albertus Extra Bold",
      },
      {
        key: "Albertus Medium",
        label: "Albertus Medium",
        value: "Albertus Medium",
      },
      { key: "Antique Olive", value: "Antique Olive", label: "Antique Olive" },
      { key: "Arial", value: "Arial", label: "Arial" },
      { key: "Arial Black", value: "Arial Black", label: "Arial Black" },
      { key: "Arial MT", value: "Arial MT", label: "Arial MT" },
      { key: "Arial Narrow", value: "Arial Narrow", label: "Arial Narrow" },
      { key: "Bazooka", value: "Bazooka", label: "Bazooka" },
      { key: "Book Antiqua", value: "Book Antiqua", label: "Book Antiqua" },
      {
        key: "Bookman Old Style",
        value: "Bookman Old Style",
        label: "Bookman Old Style",
      },
      { key: "Boulder", value: "Boulder", label: "Boulder" },
      { key: "Calisto MT", value: "Calisto MT", label: "Calisto MT" },
      {
        key: "Times New Roman",
        value: "Times New Roman",
        label: "Times New Roman",
      },
      { key: "Comic Sans MS", value: "Comic Sans MS", label: "Comic Sans MS" },
    ];
  }

  ngOnInit(): void {
    this._updateForm(this.company);
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.filename = file.name;

      this.form.patchValue({
        logo: file,
      });
    }
  }
  private _updateForm(company: WhiteLabel & WhiteLabelDirectory): void {
    this.form.patchValue({
      bodyColour: company?.bodyColour ? company.bodyColour : "",
      sideBarColor: company?.sideBarColor ? company.sideBarColor : "",
      footerColour: company?.footerColour ? company.footerColour : "",
      headerColour: company?.headerColour ? company.headerColour : "",
      formColor: company?.formColor ? company.formColor : "",
      footerFontColour: company?.footerFontColour
        ? company.footerFontColour
        : "",
      formFontType: company?.formFontType ? company.formFontType : "",
      formFontColor: company?.formFontColor ? company.formFontColor : "",
      headerFontColour: company?.headerFontColour
        ? company.headerFontColour
        : "",
      companyUrl: company?.companyUrl,
    });
    this.fontStyle = company?.formFontType ? company.formFontType : "";
  }

  saveHandler(): void {
    // if (this.form.invalid || this.form.pristine) {
    //   return;
    // }

    const value = ({ ...this.form.value, formFontType: this.fontStyle } ||
      {}) as WhiteLabelFormData;
    [
      // "bodyColour",
      // "footerColour",
      // "headerColour",
      // "sideBarColor",
      // "headerFontColour",
      // "footerFontColour",
      // "formColor",
      // "formFontColor",
    ].forEach((colorField) => {
      value[colorField] = (value[colorField] as string).replace("#", "");
    });
    this.onSave.emit(value);
  }

  uploadLogo() {
    const formData = new FormData();
    formData.append("companyId", this.company.companyId);
    formData.append("logoFile", this.form.get("logo").value);

    this.onUpload.emit(formData);
  }

  onSelectFontStyle(e) {
    this.fontStyle = e.value;
  }

  defaultColor() {
    const value = {
      bodyColour: "#FFFFFF",
      footerColour: "#FFFFFF",
      headerColour: "#FFFFFF",
      sideBarColor: "#FFFFFF",
      headerFontColour: "#000000",
      footerFontColour: "#000000",
      formColor: "#ffffff",
      formFontColor: "#000000",
      formFontType: "Times New Roman",
    };
    this.onSave.emit(value);
  }
}
