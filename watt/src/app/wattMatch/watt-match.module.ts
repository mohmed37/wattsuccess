import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {ChartsModule} from "ng2-charts";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {MatListModule} from "@angular/material/list";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {LayoutModule} from "../share/layout/layout.module";
import {WattMatchRoutingModule} from "./wattMatch.routing.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WattMatchRoutingModule,
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
    BsDropdownModule,
    MatListModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    LayoutModule,

  ]
})
export class WattMatchModule { }
