import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {JwtTokenModel} from "../model/jwt-token.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthenticationService} from "./authentication.service";
import {ApiService} from "./api.service";
import {CguModel} from "../model/cgu.model";

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  public hostCgi: string;
  public jwtToken: BehaviorSubject<JwtTokenModel> = new BehaviorSubject({
    isAuthenticated: null,
    token:null

  });

  constructor(private htttpClient: HttpClient,private userConnect:AuthenticationService,private hostTestService:ApiService) {
    this.hostCgi=hostTestService.CGI_MICRO_APP;
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



  public getCgu():Observable<CguModel>{
    this.initToken();
    return this.htttpClient.get<CguModel>(this.hostCgi + "/getCgu/");
  }

  public saveCgu(data):Observable<CguModel>{
    this.initToken();
    return this.htttpClient.post<CguModel>(this.hostCgi+ "/saveCgu/",data.valueOf());

  }






}
