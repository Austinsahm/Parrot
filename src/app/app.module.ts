import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { TabsComponent } from "./tabs/tabs.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginComponent } from "./login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ToastNoAnimationModule } from "ngx-toastr";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { LandingComponent } from "./landing/landing.component";
import { LoadingBarHttpClientModule } from "@ngx-loading-bar/http-client";
import { LoadingBarRouterModule } from "@ngx-loading-bar/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TabcorporateComponent } from "./tabcorporate/tabcorporate.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { SystemErrorHandlerService } from "./services/system-error-handler.service";
import { NotFoundComponent } from "./error-pages/not-found/not-found.component";
import { DataAccessModule } from "./data-access/data-access.module";
import { CommonWidgetsModule } from "./widgets/common-widgets/common-widgets.module";
import { HotToastModule } from "@ngneat/hot-toast";
import { IndexComponent } from "./index/index.component";
import { LayoutModule } from "./widgets/layout/layout.module";
import { PartnerPageComponent } from "./partner-page/partner-page.component";
import { ChartsModule } from "ng2-charts";

import {
  FaIconLibrary,
  FontAwesomeModule,
} from "@fortawesome/angular-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { MatListModule } from "@angular/material/list";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ChartsWidgetsModule } from "./widgets/charts-widgets/charts-widgets.module";
import { ErrorMessageService } from "./services/error-message.service";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatTableModule } from "@angular/material/table";
import { MatInputModule } from "@angular/material/input";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TabsComponent,
    LayoutComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    LandingComponent,
    DashboardComponent,
    TabcorporateComponent,
    NotFoundComponent,
    IndexComponent,
    PartnerPageComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastNoAnimationModule.forRoot(),
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DataAccessModule,
    CommonWidgetsModule,
    LayoutModule,
    ChartsModule,
    HotToastModule.forRoot(),
    FontAwesomeModule,
    MatExpansionModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatCardModule,
    MatFormFieldModule,
    MatMenuModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    ChartsWidgetsModule,
    NgbModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useExisting: SystemErrorHandlerService,
    },
    ErrorMessageService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faUser, faLock, faEnvelope, faAddressCard);
  }
}
