import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {ChartsModule} from "ng2-charts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {CvExpertComponent} from "./cv-expert/cv-expert.component";
import {MonCvComponent} from "./mon-cv/mon-cv.component";
import {CvRoutingModule} from "./cv-routing.module";


@NgModule({
  declarations: [CvExpertComponent,MonCvComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    ChartsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatRadioModule,
    MatInputModule,
    Ng2PageScrollModule,
    CvRoutingModule,
    FormsModule
  ]
})
export class CvModule { }
