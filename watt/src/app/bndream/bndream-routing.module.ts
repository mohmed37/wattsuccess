import {RouterModule, Routes} from "@angular/router";
import {BndreamComponent} from "./accueilBndream/bndream.component";
import {AutoportraitComponent} from "./autoportrait/autoportrait.component";
import {NgModule} from "@angular/core";
import {HeroComponent} from "./hero/hero.component";
import {PhotolangageComponent} from "./photolangage/photolangage.component";
import {PraicoComponent} from "./praico/praico.component";
import {RoueVieComponent} from "./roue-vie/roue-vie.component";

const routes: Routes = [
  {

    path: '',
    data: {
      breadcrumb: 'B n Dream'
    },
    children: [
      {
        path: '',
        data: {
          breadcrumb: null
        },
        component: BndreamComponent,
      },
      {
        path: 'autoPortrait',
        data: {
          breadcrumb: 'Auto-Portrait'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: AutoportraitComponent,
          },
        ],
      },
      {
        path: 'photolangage',
        data: {
          breadcrumb: 'Photolangage'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component:PhotolangageComponent ,
          },
        ],
      },
      {
        path: 'heros',
        data: {
          breadcrumb: 'Heros'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: HeroComponent ,
          },
        ],
      },
      {
        path: 'praico',
        data: {
          breadcrumb: 'Praico'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: PraicoComponent,
          },
        ],
      },
      {
        path: 'roue-de-la-vie',
        data: {
          breadcrumb: 'Roue de la vie'
        },
        children: [
          {
            path: '',
            data: {
              breadcrumb: null
            },
            component: RoueVieComponent,
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
export class BndreamRoutingModule {
}
