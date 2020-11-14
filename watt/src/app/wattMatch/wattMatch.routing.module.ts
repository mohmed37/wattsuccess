import {RouterModule, Routes} from "@angular/router";
import {AccueilCvComponent} from "../cv/accueil-cv/accueil-cv.component";
import {NgModule} from "@angular/core";
import {WattMatchComponent} from "./watt-match/watt-match.component";
import {OffreEmploiComponent} from "./offre-emploi/offre-emploi.component";

const routes: Routes = [
  {

    path: '',
    data: {
      breadcrumb: "Watt match"
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: WattMatchComponent,
      },
      {
        path: 'offreEmploi',
        data: {
          breadcrumb: 'Publier votre offre d’emploi'
        },
        children: [

          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: OffreEmploiComponent,
          },
        ],
      },

    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WattMatchRoutingModule{}
