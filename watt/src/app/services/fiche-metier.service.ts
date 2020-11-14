import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {BehaviorSubject, Observable} from "rxjs";
import {QuestionnairesModel} from "../model/questionnaires.model";
import {RoueDeLaVieModel} from "../model/roueDeLaVie.model";
import {FicheMetier} from "../model/ficheMetier.model";
import {ApiService} from "./api.service";
import {JwtTokenModel} from "../model/jwt-token.model";

@Injectable({
  providedIn: 'root'
})
export class FicheMetierService {
  public jwtToken: BehaviorSubject<JwtTokenModel> = new BehaviorSubject({
    isAuthenticated: null,
    token:null

  });

  constructor(private htttpClient: HttpClient,private userConnect:AuthenticationService,private hostTestService:ApiService) {
    this.hostTest=hostTestService.TEST_MICRO_APP;
    this.initToken();
  }

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

  public hostTest: string;

  ficheMetier(id:number):Observable<FicheMetier>{
    this.initToken();
    return this.htttpClient.get<FicheMetier>(this.hostTest + "/getFicheMetier/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
 ficheMetierAll():Observable<[]>{
   this.initToken();
   return this.htttpClient.get<[]>(this.hostTest + "/getPhotoFicheMetierAll",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
 }
  ficheMetierByImage(id:number):Observable<FicheMetier>{
    this.initToken();
    return this.htttpClient.get<FicheMetier>(this.hostTest + "/getPhotoFicheMetier/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  getFicheMetierClient():Observable<FicheMetier[]>{
    this.initToken();
    return this.htttpClient.get<FicheMetier[]>(this.hostTest + "/getFicheMetierClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  ficheMetierByPhotoId(id:number):Observable<FicheMetier[]>{
    this.initToken();
    return this.htttpClient.get<FicheMetier[]>(this.hostTest + "/getFicheMetierByPhotoId/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  ficheMetierByMetier(metier:string):Observable<FicheMetier>{
    this.initToken();
    return this.htttpClient.get<FicheMetier>(this.hostTest + "/getFicheMetierByMetier/"+metier,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
}
