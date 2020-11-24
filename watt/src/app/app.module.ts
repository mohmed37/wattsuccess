import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { FooterComponent } from './footer/footer.component';
import { NewClientComponent } from './new-client/new-client.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {MatInputModule} from "@angular/material/input";
import {CommonModule} from "@angular/common";
import {EditorModule} from "@progress/kendo-angular-editor";
import { LoginComponent } from './login/login.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {LayoutModule} from "./share/layout/layout.module";
import {ClientService} from "./services/client.service";
import {LogoutComponent} from "./auth/logout/logout.component";
import {MatIconModule} from "@angular/material/icon";
import { DefinitionComponent } from './definition/definition.component';
import { BndreamComponent } from './bndream/accueilBndream/bndream.component';
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { AdministrateurComponent } from './administrateur/administrateur.component';
import {ChartsModule} from "ng2-charts";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatRadioModule} from "@angular/material/radio";
import {BreadcrumbModule} from "primeng";
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import {AccueilCvComponent} from "./cv/accueil-cv/accueil-cv.component";
import {AuthenticationService} from "./services/authentication.service";
import { AccueilBnbcomeComponent } from './bnbecome/accueil-bnbcome/accueil-bnbcome.component';
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import { DialogModalComponent } from './dialog-modal/dialog-modal.component';
import {MatDialogModule} from "@angular/material/dialog";
import { AccueilGonbecomeComponent } from './gonbecome/accueil-gonbecome/accueil-gonbecome.component';
import { ConfirmationComponent } from './auth/confirmation/confirmation.component';
import {BasicAuthHtppInterceptorService} from "./services/basic-auth-htpp-interceptor.service";
import { WattMatchComponent } from './wattMatch/watt-match/watt-match.component';
import { OffreEmploiComponent } from './wattMatch/offre-emploi/offre-emploi.component';
import {MatSelectModule} from "@angular/material/select";
import {CguWattComponent} from "./cgu-watt/cgu-watt.component";
import {AngularEditorModule} from "@kolkov/angular-editor";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NewClientComponent,
    LoginComponent,
    SigninComponent,
    LogoutComponent,
    SignupComponent,
    DefinitionComponent,
    BndreamComponent,
    AdministrateurComponent,
    BreadcrumbComponent,
    AccueilCvComponent,
    AccueilBnbcomeComponent,
    DialogModalComponent,
    AccueilGonbecomeComponent,
    ConfirmationComponent,
    WattMatchComponent,
    OffreEmploiComponent,
    CguWattComponent


  ],
  imports: [
    CKEditorModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    EditorModule,
    FlexLayoutModule,
    LayoutModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    ChartsModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    MatRadioModule,
    BreadcrumbModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    MatDialogModule,
    MatSelectModule,
    AngularEditorModule,

  ],
  providers: [
    ClientService,
    AuthenticationService,
    HeaderComponent,
    {
      provide:HTTP_INTERCEPTORS, useClass:BasicAuthHtppInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
