import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProgressPipe } from "./progress.pipe";
import { ComboBoxFieldComponent } from "./combo-box-field/combo-box-field.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StatusFieldComponent } from "./status-field/status-field.component";
import { DataAccessModule } from "src/app/data-access/data-access.module";
import { ControlErrorComponent } from "./control-error/control-error.component";
import { ModalLayoutComponent } from "./modal-layout/modal-layout.component";
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { FileInputComponent } from "./file-input/file-input.component";
import {
  NgbDateParserFormatter,
  NgbDatepickerModule,
} from "@ng-bootstrap/ng-bootstrap";
import { DateFieldComponent } from "./date-field/date-field.component";
import { DateFormatterService } from "./date-formatter.service";
import { PasswordChangeComponent } from "./password-change/password-change.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { MatCardModule } from "@angular/material/card";
import { CardComponent } from "./card/card.component";
import { WhiteLabelFormComponent } from "./white-label-form/white-label-form.component";
import { WhiteLabelDetailComponent } from "./white-label-detail/white-label-detail.component";
import { ComboSelectFieldComponent } from "./combo-select-field/combo-select-field.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { DatePickerComponent } from "./date-picker/date-picker.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatExpansionModule } from "@angular/material/expansion";
import { DeviceLastStatusComponent } from "./device-last-status/device-last-status.component";
import { DeviceHistoryComponent } from "./device-history/device-history.component";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { EmptyDataComponent } from "./empty-data/empty-data.component";
import { NgxColorsModule } from "ngx-colors";
import { ButtonComponent } from "./button/button.component";
import { TitleComponent } from "./title/title.component";
import { SpinnerComponent } from "./spinner/spinner.component";
import { QrScannerComponent } from "./qr-scanner/qr-scanner.component";
import { NgxScannerQrcodeModule } from "ngx-scanner-qrcode";
import { QrResultDirective } from "./qr-result.directive";
import { ErrorMessageComponent } from "./error-message/error-message.component";
import { CurrencyDirective } from "./currency.directive";
import { TextInputComponent } from "./text-input/text-input.component";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    ProgressPipe,
    ComboBoxFieldComponent,
    StatusFieldComponent,
    ControlErrorComponent,
    ModalLayoutComponent,
    FileInputComponent,
    DateFieldComponent,
    PasswordChangeComponent,
    CardComponent,
    WhiteLabelFormComponent,
    WhiteLabelDetailComponent,
    ComboSelectFieldComponent,
    DatePickerComponent,
    DeviceLastStatusComponent,
    DeviceHistoryComponent,
    EmptyDataComponent,
    ButtonComponent,
    TitleComponent,
    SpinnerComponent,
    QrScannerComponent,
    QrResultDirective,
    ErrorMessageComponent,
    CurrencyDirective,
    TextInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataAccessModule,
    NgxSkeletonLoaderModule,
    NgxDatatableModule,
    NgbDatepickerModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatExpansionModule,
    NgxDatatableModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    NgxColorsModule,
    NgxScannerQrcodeModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DataAccessModule,
    NgxDatatableModule,
    ProgressPipe,
    ComboBoxFieldComponent,
    StatusFieldComponent,
    ControlErrorComponent,
    FileInputComponent,
    DateFieldComponent,
    ModalLayoutComponent,
    NgxSkeletonLoaderModule,
    PasswordChangeComponent,
    CardComponent,
    WhiteLabelFormComponent,
    WhiteLabelDetailComponent,
    ComboSelectFieldComponent,
    DatePickerComponent,
    DeviceLastStatusComponent,
    DeviceHistoryComponent,
    EmptyDataComponent,
    ButtonComponent,
    TitleComponent,
    SpinnerComponent,
    QrScannerComponent,
    ErrorMessageComponent,
    CurrencyDirective,
    TextInputComponent,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: DateFormatterService },
  ],
})
export class CommonWidgetsModule {}
