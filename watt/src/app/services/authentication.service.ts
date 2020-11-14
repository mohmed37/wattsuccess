import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Client} from "../model/client.model";
import {FicheMetierService} from "./fiche-metier.service";
import {ApiService} from "./api.service";
import {ClientService} from "./client.service";
import {Router} from "@angular/router";
import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private htttpClient: HttpClient,private hostTestService:ApiService, private router: Router) {
    this.hostUser=hostTestService.USERS_MICRO_APP;
    this.hostAuth=hostTestService.AUTH_MICRO_APP;

  }

  public isAuthenticated:boolean;
  public userAuthenticated:{ phone: string; roles: string[]; id: number; prenom: string; nom: string; email: string; username: string };
  public token:string;
  public hostUser: string;
  public hostAuth: string;
  public isUserAdmin:boolean=false;
  public isUserUser: boolean=false;
  public currentClient: Client=new Client();




   public login(user){
     return this.htttpClient.post(this.hostAuth+"/signin",user, {observe:'response'});
   }
  public clientConnect(userAuthenticated){
    this.userAuthenticated=userAuthenticated;
      if (userAuthenticated){
        this.isAuthenticated=true;

        if (userAuthenticated.roles[0].name == 'ROLE_ADMIN'){
           this.isUserAdmin=true;
        }
        if (userAuthenticated.roles[0].name=='ROLE_ELEVE'){
           this.isUserUser=true;
        }
      }else {
        this.isAuthenticated=false;
        this.userAuthenticated=undefined;
      }


  }

  public saveResource(data):Observable<Client>{
    return this.htttpClient.post<Client>(this.hostAuth+"/signup",data);
  }

  public loadAuthenticatedUserFromLocalSorage(token:string){

    if(token){
      let userToken = jwt_decode(token);

      return this.htttpClient.get<Client>(this.hostAuth +"/userName/"+userToken.sub).subscribe(user=>{
        this.currentClient=user;
        this.userAuthenticated={
          username:this.currentClient.username,
          roles:this.currentClient.roles,
          prenom:this.currentClient.prenom,
          nom:this.currentClient.nom,
          email:this.currentClient.email,
          phone:this.currentClient.phone,
          id:this.currentClient.id
        };
        this.clientConnect(this.userAuthenticated);
      });


    }
  }



  public removeTokenFromLocalStorage(){
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('id');
    localStorage.removeItem('token');
    this.isAuthenticated=false;
    this.token=undefined;
    this.userAuthenticated=undefined;
    this.isUserAdmin=false;
    this.isUserUser=false;
  }

  saveToken(jwtToken: string) {

  }
  public putPassword(data):Observable<Boolean>  {
    return this.htttpClient.put<Boolean>(this.hostAuth + "/ModifPassword/",data);
  }
}
