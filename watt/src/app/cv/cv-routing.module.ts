import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {AccueilCvComponent} from "./accueil-cv/accueil-cv.component";
import {MonCvComponent} from "./mon-cv/mon-cv.component";
import {CvExpertComponent} from "./cv-expert/cv-expert.component";

const routes: Routes = [
  {

    path: '',
    data: {
      breadcrumb: 'newCv'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component:AccueilCvComponent
      },
      {
        path: 'monCv',
        data: {
          breadcrumb: 'Mon Cv'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component:MonCvComponent
          },
        ],
      },
      {
        path: 'CvExpert',
        data: {
          breadcrumb: 'Cv Expert'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component:CvExpertComponent ,
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
export class CvRoutingModule {
}
