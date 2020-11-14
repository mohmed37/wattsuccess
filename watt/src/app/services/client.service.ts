import {EventEmitter, Injectable, OnInit, Output} from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Client} from "../model/client.model";
import {tap} from "rxjs/operators";
import {JwtTokenModel} from "../model/jwt-token.model";
import {AuthenticationService} from "./authentication.service";
import {QuestionnairesModel} from "../model/questionnaires.model";
import {ApiService} from "./api.service";
import {ModifPasswordModel} from "../model/modifPassword.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService{

public jwtToken: BehaviorSubject<JwtTokenModel> = new BehaviorSubject({
  isAuthenticated: null,
  token:null

});
  public currentClient:Client;
  @Output() change: EventEmitter<Client> = new EventEmitter();
  nom:Client;


  public hostUser: string;
  public  modeClient:number=0;
  public id:string;

  constructor(private htttpClient: HttpClient, private userConnect:AuthenticationService,private hostTestService:ApiService) {
    this.hostUser=hostTestService.USERS_MICRO_APP;
    this.initToken();
   this.id=sessionStorage.getItem('id');
  }

  private initToken():void {
    this.id=sessionStorage.getItem('id');
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

  public getClient(page: number, size: number) {
    this.initToken();
    return this.htttpClient.get(this.hostUser + "/usersAll?page=" + page + "&size=" + size,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }


  public getClientBy(id):Observable<Client> {
    this.initToken();
       return this.htttpClient.get<Client>(this.hostUser +"/user/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }


  public getClientByKey(prenon:string,page: number, size: number) {
    this.initToken();
    return this.htttpClient.get(this.hostUser + "/usersAll?prenom="+prenon+"&page="+page+"&size="+size,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }
  public deleteClient(id:number) {
    this.initToken();
    return this.htttpClient.delete(this.hostUser +"/deleteUser/"+id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});

  }




  client(){
    this.initToken();
    this.htttpClient.get<Client>(this.hostUser +"/user/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})}).subscribe(
      client1=>{
        this.nom=client1;
      }
    );
    this.change.emit(this.nom);
  }

  public updateClientBy(data:any) {
    this.initToken();
    return this.htttpClient.put(this.hostUser+"/modifUser/",data,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }



  public getQuestionnaires():Observable<QuestionnairesModel>  {
    this.initToken();
    return this.htttpClient.get<QuestionnairesModel>(this.hostUser + "/questionnairesUser/"+this.userConnect.userAuthenticated.id,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public getQuestionnairesAll():Observable<QuestionnairesModel[]>  {
    this.initToken();
    return this.htttpClient.get<QuestionnairesModel[]>(this.hostUser + "/questionnairesUserAll/",{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }

  public putQuestionnaires(typeQuetionnaire:string){
    this.initToken();
    return this.htttpClient.put(this.hostUser + "/modifQuestionnaire/"+this.userConnect.userAuthenticated.id,typeQuetionnaire,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})}).subscribe(data=>{

    },error => {
      console.log(error)
    });

  }

  public SaveQuestionnaires(data) :Observable<QuestionnairesModel> {
    this.initToken();
    return this.htttpClient.post<QuestionnairesModel>(this.hostUser + "/saveQuestionnaires/"+this.userConnect.userAuthenticated.id,data,{headers:new HttpHeaders({'Authorization':this.jwtToken.value.token})});
  }



}
