import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccueilGonbecomeComponent} from "./accueil-gonbecome/accueil-gonbecome.component";
import {AccueilCvComponent} from "../cv/accueil-cv/accueil-cv.component";
import {EntretienComponent} from "./entretien/entretien.component";
import {EstimeComponent} from "./estime/estime.component";
import {OrganisationComponent} from "./organisation/organisation.component";
import {ReseauComponent} from "./reseau/reseau.component";
import {FormationComponent} from "./formation/formation.component";

const routes: Routes = [
  {

    path: '',
    data: {
      breadcrumb: "Go n Become"
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: AccueilGonbecomeComponent,
      },
      {
        path: 'newCv',
        data: {
          breadcrumb: 'Cv et lettre'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: AccueilCvComponent,
          },
        ],
      },
      {
        path: 'entretien',
        data: {
          breadcrumb: 'Réussir un entretien d’embauche '
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: EntretienComponent,
          },
        ],
      },
      {
        path: 'estime',
        data: {
          breadcrumb: 'Estime de soi'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component:EstimeComponent,
          },
        ],
      },
      {
        path: 'organisation',
        data: {
          breadcrumb: "S'organiser"
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: OrganisationComponent,
          },
        ],
      },
      {
        path: 'reseau',
        data: {
          breadcrumb: 'Créer son réseau'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: ReseauComponent,
          },
        ],
      },
      {
        path: 'formation',
        data: {
          breadcrumb: 'Centre de formation'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: FormationComponent,
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
export class GonbecomeRoutingModule{}
