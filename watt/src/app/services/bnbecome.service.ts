import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ListMetierClientModel} from "../model/listMetierClient.model";
import {ProfilUModel} from "../model/profilU.model";
import {ResultatRaModel} from "../model/resultatRa.model";
import {RestitutionProfilUModel} from "../model/restitutionProfilU.model";
import {ListCompetencesModel} from "../model/listCompetences.model";
import {ListCompetencesClientModel} from "../model/listCompetencesClient.model";
import {FicheMetierService} from "./fiche-metier.service";
import {ApiService} from "./api.service";
import {JwtTokenModel} from "../model/jwt-token.model";
import {HandiWattModel} from "../model/handiWatt.model";

@Injectable({
  providedIn: 'root'
})
export class Bnbecome{
  public hostTest: string;
  constructor(private htttpClient: HttpClient,private userConnect:AuthenticationService,private hostTestService:ApiService) {
    this.hostTest=hostTestService.TEST_MICRO_APP;
    this.initToken();
  }

  public jwtToken: BehaviorSubject<JwtTokenModel> = new BehaviorSubject({
    isAuthenticated: null,
    token:null

  });

  private initToken():void {
    const token = sessionStorage.getItem('token');
    if (token){
      this.jwtToken.next({
        isAuthenticated:true,
        token:token
      });
    }else {
      this.jwtToken.next({
        isAuthenticated:false,
        token:null
      });
    }
  }




  public saveListMetierClient(data):Observable<ListMetierClientModel>{
    this.initToken();
    return this.htttpClient.post<ListMetierClientModel>(this.hostTest+ "/saveMetierByClient/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  public modifListMetierClient(data):Observable<ListMetierClientModel>{
    this.initToken();
    return this.htttpClient.put<ListMetierClientModel>(this.hostTest+ "/modifMetierByClient/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  getFicheMetierClient():Observable<ListMetierClientModel>{
    this.initToken();
    return this.htttpClient.get<ListMetierClientModel>(this.hostTest + "/getMetierByClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getQuestionnaireProfileU():Observable<ProfilUModel[]>{
    this.initToken();
    return this.htttpClient.get<ProfilUModel[]>(this.hostTest + "/listQuestion/",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  public saveProfilU(data):Observable<ResultatRaModel>{
    this.initToken();
    return this.htttpClient.post<ResultatRaModel>(this.hostTest + "/saveClientRa/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  getResultatProfileU():Observable<ResultatRaModel>{
    this.initToken();
    return this.htttpClient.get<ResultatRaModel>(this.hostTest + "/questionClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getRestitusionProfilU():Observable<RestitutionProfilUModel[]>{
    this.initToken();
    return this.htttpClient.get<RestitutionProfilUModel[]>(this.hostTest + "/restitusionAll/",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getRestitusionProfilUByPosAndDim(dimension:string,position:number):Observable<RestitutionProfilUModel>{
    this.initToken();
    return this.htttpClient.get<RestitutionProfilUModel>(this.hostTest + "/restitusionByDimAndPos/"+dimension+"/"+position,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }

  public saveCompetence(data):Observable<ListCompetencesModel>{
    this.initToken();
    return this.htttpClient.post<ListCompetencesModel>(this.hostTest + "/saveListCompetences/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getCompetence():Observable<ListCompetencesModel[]>{
    this.initToken();
    return this.htttpClient.get<ListCompetencesModel[]>(this.hostTest + "/listCompetences/",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getCompetenceById(id:number):Observable<ListCompetencesModel>{
    this.initToken();
    return this.htttpClient.get<ListCompetencesModel>(this.hostTest + "/getCompetenceById/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }
  getCompetenceByCompetence(competence:string):Observable<ListCompetencesModel>{
    this.initToken();
    return this.htttpClient.get<ListCompetencesModel>(this.hostTest + "/getCompetenceByCompetence/"+competence,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public saveCompetenceClient(data):Observable<ListCompetencesClientModel>{
    this.initToken();
    return this.htttpClient.post<ListCompetencesClientModel>(this.hostTest + "/saveListCompetencesClient/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getCompetenceClient():Observable<ListCompetencesClientModel>{
    this.initToken();
    return this.htttpClient.get<ListCompetencesClientModel>(this.hostTest + "/getCompetenceClientByIdClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  public saveHandiWatt(data):Observable<HandiWattModel>{
    this.initToken();
    return this.htttpClient.post<HandiWattModel>(this.hostTest + "/saveHandiWatt/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  getHandiWattClient():Observable<HandiWattModel>{
    this.initToken();
    return this.htttpClient.get<HandiWattModel>(this.hostTest + "/getHandiWattByIdClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }


}
