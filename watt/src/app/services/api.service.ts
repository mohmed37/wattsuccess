import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {config} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL =environment.backendServer;
  private LOCALHOST=environment.backendServer2;
  public TEST_MICRO_APP =`${this.BASE_URL}/microservice-tests/api/watt`;
  public USERS_MICRO_APP =`${this.BASE_URL}/microservice-utilisateur/api/users`;
  public CGI_MICRO_APP=`${this.BASE_URL}/microservice-tests/api/cgu`;
  public AUTH_MICRO_APP =`${this.BASE_URL}/microservice-utilisateur/api/auth`;
  public LOCALHOST_URL=`${this.LOCALHOST}`;



  constructor(private http:HttpClient) { }
}
