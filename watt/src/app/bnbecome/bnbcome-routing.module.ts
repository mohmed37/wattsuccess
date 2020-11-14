import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccueilBnbcomeComponent} from "./accueil-bnbcome/accueil-bnbcome.component";
import {DicoMetiersComponent} from "./dico-metiers/dico-metiers.component";
import {PortefolioComponent} from "./portefolio/portefolio.component";
import {ProfilUComponent} from "./profil-u/profil-u.component";
import {ProjetProComponent} from "./projet-pro/projet-pro.component";
import {FicheMetierComponent} from "./fiche-metier/fiche-metier.component";
import {HandiWattComponent} from "./handi-watt/handi-watt.component";

const routes: Routes = [
  {

    path: '',
    data: {
      breadcrumb: 'Go n Believe'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: AccueilBnbcomeComponent,
      },
      {
        path: 'dicoMetiers',
        data: {
          breadcrumb: 'Dico-Métiers'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: DicoMetiersComponent,
          },
        ],
      },
      {
        path: 'fichesMetiers',
        data: {
          breadcrumb: 'Fiches Métiers'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: FicheMetierComponent,
          },
        ],
      },



      {
        path: 'porteFolio',
        data: {
          breadcrumb: 'Porte-Folio'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component:PortefolioComponent,
          },
        ],
      },
      {
        path: 'profilU',
        data: {
          breadcrumb: 'Profil-U'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: ProfilUComponent,
          },
        ],
      },
      {
        path: 'projetPro',
        data: {
          breadcrumb: 'Projet Professionel'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: ProjetProComponent,
          },
        ],
      },
      {
        path: 'handiWatt',
        data: {
          breadcrumb: 'HandiWatt'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: HandiWattComponent,
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
export class BnbcomeRoutingModule{}
