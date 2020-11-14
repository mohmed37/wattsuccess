import {Injectable, Input} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {FicheMetier} from "../model/ficheMetier.model";
import {PhotoLangageModel} from "../model/photoLangage.model";
import {AuthenticationService} from "./authentication.service";
import {RoueDeLaVieModel} from "../model/roueDeLaVie.model";
import {ChoixAutoPortraitModel} from "../model/choixAutoPortrait.model";
import {Questionnaire1Model} from "../model/questionnaire1.model";
import {ResultatPraicoModel} from "../model/resultatPraico.model";
import {Questionnaire2Model} from "../model/questionnaire2.model";
import {Questionnaire4Model} from "../model/questionnaire4.model";
import {ListHeroModel} from "../model/listHero.model";
import {ResultatHeroModel} from "../model/resultatHero.model";
import {ApiService} from "./api.service";
import {JwtTokenModel} from "../model/jwt-token.model";

@Injectable({
  providedIn: 'root'
})
export class BndreamService {
  @Input() private allPhotoFicheMetier:any;
  public hostTest: string;
  base64Data: any;
  retrieveResonse1: any;
  public resultroueDeLaVie: RoueDeLaVieModel;

  constructor(private htttpClient: HttpClient,private userConnect:AuthenticationService,private hostTestService:ApiService ) {
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



public getPhoto() {
  this.initToken();
  return this.htttpClient.get(this.hostTest + "/upload",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
}

  public saveFicheMetier(data):Observable<FicheMetier>{
    this.initToken();
    return this.htttpClient.post<FicheMetier>(this.hostTest+ "/saveFicheMetier/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }

  public savePhotLangage(data):Observable<PhotoLangageModel>{
    this.initToken();
    return this.htttpClient.post<PhotoLangageModel>(this.hostTest+ "/saveResultPhotoLangage/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }

  photoClientChoix(data){
    this.initToken();
    return this.htttpClient.get(this.hostTest +"/getId/"+data,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getImageList(data){
    this.initToken();
    return this.htttpClient.get(this.hostTest +"/getAll/"+data,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  imageClientChoix(data){
    this.initToken();
    return this.htttpClient.get(this.hostTest +"/getId/"+data,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public saveRoueDeLaVie(data):Observable<RoueDeLaVieModel>{
    this.initToken();
    return this.htttpClient.post<RoueDeLaVieModel>(this.hostTest + "/saveRoueVieClient/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }
  public saveAutoPortrait(data):Observable<ChoixAutoPortraitModel> {
    this.initToken();
    return this.htttpClient.post<ChoixAutoPortraitModel>(this.hostTest+ "/saveAutoPortraitClient/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public savepraico(data):Observable<ResultatPraicoModel> {
    this.initToken();
    return this.htttpClient.post<ResultatPraicoModel>(this.hostTest+ "/saveResultPraicoU/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public saveQcm4(data):Observable<Questionnaire4Model> {
    this.initToken();
    return this.htttpClient.post<Questionnaire4Model>(this.hostTest+ "/saveQcm4/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public saveHero(data):Observable<ResultatHeroModel> {
    this.initToken();
    return this.htttpClient.post<ResultatHeroModel>(this.hostTest+ "/saveHeroClient/",data.valueOf(),{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getResultPhotoLangage():Observable<PhotoLangageModel>{
    this.initToken();
    return this.htttpClient.get<PhotoLangageModel>(this.hostTest + "/getPhotoLangage/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }
  getResultRoueDeLaVie():Observable<RoueDeLaVieModel>{
    this.initToken();
    return this.htttpClient.get<RoueDeLaVieModel>(this.hostTest + "/getRoueVieClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }

  getResultAutoPortrait():Observable<ChoixAutoPortraitModel>{
    this.initToken();
    return this.htttpClient.get<ChoixAutoPortraitModel>(this.hostTest + "/getResulAutoportrait/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }

  getTraitList(data){
    this.initToken();
    return this.htttpClient.get(this.hostTest + "/autoportraitAll/"+data,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }

  getQustionnaire1(id:number):Observable<Questionnaire1Model>{
    this.initToken();
    return this.htttpClient.get<Questionnaire1Model>(this.hostTest + "/questionnaire1/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  getQustionnaire2(id:number):Observable<Questionnaire2Model>{
    this.initToken();
    return this.htttpClient.get<Questionnaire2Model>(this.hostTest + "/questionnaire2/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getQustionnaire3(id:number):Observable<Questionnaire2Model>{
    this.initToken();
    return this.htttpClient.get<Questionnaire2Model>(this.hostTest + "/questionnaire3/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getQustionnaire4():Observable<Questionnaire4Model[]> {
    this.initToken();
    return this.htttpClient.get<Questionnaire4Model[]>(this.hostTest + "/questionnaire4/",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getResultPraico():Observable<ResultatPraicoModel> {
    this.initToken();
    return this.htttpClient.get<ResultatPraicoModel>(this.hostTest + "/praicoIdClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
  getResultHero():Observable<ResultatHeroModel> {
    this.initToken();
    return this.htttpClient.get<ResultatHeroModel>(this.hostTest + "/getResultHeroClient/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  getListHero():Observable<ListHeroModel[]> {
    this.initToken();
    return this.htttpClient.get<ListHeroModel[]>(this.hostTest + "/listvaleurHero",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }
}
