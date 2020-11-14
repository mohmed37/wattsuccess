import {RouterModule, Routes} from "@angular/router";
import {AccueilBnbcomeComponent} from "../bnbecome/accueil-bnbcome/accueil-bnbcome.component";
import {DicoMetiersComponent} from "../bnbecome/dico-metiers/dico-metiers.component";
import {FicheMetierComponent} from "../bnbecome/fiche-metier/fiche-metier.component";
import {PortefolioComponent} from "../bnbecome/portefolio/portefolio.component";
import {ProfilUComponent} from "../bnbecome/profil-u/profil-u.component";
import {ProjetProComponent} from "../bnbecome/projet-pro/projet-pro.component";
import {NgModule} from "@angular/core";
import {CompteClientComponent} from "./compte-client/compte-client.component";
import {ModifClientComponent} from "./modif-client/modif-client.component";

const routes: Routes = [
  {

    path: '',
    data: {
      breadcrumb: 'Informations personnelles'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: CompteClientComponent,
      },
      {
        path: 'modifPassword',
        data: {
          breadcrumb: 'Modification du mot de passe'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: ModifClientComponent,
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
export class CompteClientRoutingModule{}
