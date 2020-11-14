import {NgModule} from "@angular/core";
import {BndreamRoutingModule} from "./bndream-routing.module";
import {CommonModule} from "@angular/common";
import {AutoportraitComponent} from "./autoportrait/autoportrait.component";
import {HeroComponent} from "./hero/hero.component";
import {PhotolangageComponent} from "./photolangage/photolangage.component";
import {PraicoComponent} from "./praico/praico.component";
import {RoueVieComponent} from "./roue-vie/roue-vie.component";
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import {ChartsModule} from "ng2-charts";
import {ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatRadioModule} from "@angular/material/radio";
import {MatInputModule} from "@angular/material/input";
import {Ng2PageScrollModule} from "ng2-page-scroll";
import {ArdoiseComponent} from "../ardoise/ardoise.component";
import {LayoutModule} from "../share/layout/layout.module";


@NgModule({
  declarations: [AutoportraitComponent,HeroComponent,PhotolangageComponent,PraicoComponent,RoueVieComponent,ArdoiseComponent],
  imports: [
    CommonModule,
    BndreamRoutingModule,
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
    LayoutModule
  ]
})
export class BndreamModule { }
