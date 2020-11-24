import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {NewClientComponent} from "./new-client/new-client.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {DefinitionComponent} from "./definition/definition.component";
import {AdministrateurComponent} from "./administrateur/administrateur.component";
import {ConfirmationComponent} from "./auth/confirmation/confirmation.component";
import {LoginComponent} from "./login/login.component";
import {CguWattComponent} from "./cgu-watt/cgu-watt.component";




const routes: Routes = [

  {

    path: 'admin',
    component: AdministrateurComponent
  },

  {
    path: 'EnSavoirPlus',
    component: DefinitionComponent
  },

  {
    path: 'cgu',
    component: CguWattComponent
  },


  {
    path: '',
    children: [
      {path: '', redirectTo: '/home', pathMatch: 'full'},
      {
        path: 'home', loadChildren: () => import('./home/homepage.module').then(m=>m.HomepageModule)
      },
      {
        path: 'bndream', loadChildren: () => import('./bndream/bndream.module').then(m=>m.BndreamModule)
      },
      {
        path: 'gonBelieve', loadChildren: () => import('./bnbecome/bnbcome.module').then(m=>m.BnbcomeModule)
      },
      {
        path: 'newCv', loadChildren: () => import('./cv/cv.module').then(m=>m.CvModule)
      },
      {
        path: 'gonbecome', loadChildren: () => import('./gonbecome/gonbecome.module').then(m=>m.GonbecomeModule)

      },
      {
        path: 'personalinfo', loadChildren: () => import('./compte-client/compte-client.module').then(m=>m.CompteClientModule)

      },
      {
        path: 'wattMatch', loadChildren: () => import('./wattMatch/watt-match.module').then(m=>m.WattMatchModule)

      }

      ]
  },
  {
    path: "listClient",
    component: NewClientComponent
  },

  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "signin",
    component: SigninComponent
  },

  {
    path: "client",
    component: HeaderComponent
  },

  {
    path:"login", component:SigninComponent
  },
  {
    path: 'confirm-account/:token',
    component: ConfirmationComponent
  },
  {
    path: "new-client",
    component: SignupComponent
  },
  {
    path:"flooter",
    component:FooterComponent
  },
  {
    path:"testpage", component:LoginComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
