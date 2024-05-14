import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PageLayoutComponent } from "./page-layout/page-layout.component";
import { PageLayoutHeaderComponent } from "./page-layout-header/page-layout-header.component";
import { PageLayoutFooterComponent } from "./page-layout-footer/page-layout-footer.component";
import { CommonWidgetsModule } from "../common-widgets/common-widgets.module";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatDividerModule } from "@angular/material/divider";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    PageLayoutComponent,
    PageLayoutHeaderComponent,
    PageLayoutFooterComponent,
  ],
  imports: [
    CommonModule,
    CommonWidgetsModule,
    MatListModule,
    MatToolbarModule,
    MatDividerModule,
    MatSidenavModule,
    RouterModule,
    CommonWidgetsModule,
  ],
  exports: [
    CommonWidgetsModule,
    PageLayoutComponent,
    PageLayoutHeaderComponent,
    PageLayoutFooterComponent,
  ],
})
export class LayoutModule {}
