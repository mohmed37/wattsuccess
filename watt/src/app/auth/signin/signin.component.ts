import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {Client} from "../../model/client.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import jwt_decode from "jwt-decode";
import {Observable} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  public form: FormGroup;
  public error: string;

  public fragment: string;
  public hostUser: string;
  public hostAuth: string;
  public message: string = "";
  public initPassWord: boolean;
  public formInit: FormGroup;
  public messageOK: string= "";
  public passworEnvoye: boolean;
  public salarieImg:string="assets/img/salarie.png";
  public hide = true;


  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router
    , private autheService: AuthenticationService, private route: ActivatedRoute
    , private htttpClient: HttpClient, private hostTestService: ApiService) {
    this.hostUser = hostTestService.USERS_MICRO_APP;
    this.hostAuth=hostTestService.AUTH_MICRO_APP;
  }

  ngOnInit(): void {

    this.form = this.fb.group(
      {
        username: [''],
        password: ['']
      }
    );
    this.formInit = this.fb.group(
      {
        mail: ['']
      }
    );
  }

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment;
      setTimeout(() => this.scrollToAnchor(), 10);
    });
  }

  scrollToAnchor(): void {
    try {
      if (this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) {
    }
  }




  public userConnect() {

    return this.htttpClient.post<any>(this.hostAuth + "/signin", this.form.value).subscribe(userConnect => {
      this.autheService.removeTokenFromLocalStorage();

        this.router.navigate(['/home']);
      let token:string=userConnect.accessToken;

        this.autheService.loadAuthenticatedUserFromLocalSorage(token);
      let tokenStr= 'Bearer '+userConnect.accessToken;
      sessionStorage.setItem('token', tokenStr);
      sessionStorage.setItem('id',userConnect.id);
      localStorage.setItem('token', tokenStr);
      sessionStorage.getItem('username');
      return userConnect;

    },error => {
      if(error.status=="200"){
        this.message="Email n'a pas été verifié";
      }else{
      this.message="Erreur de connection";}
    })
  }




  reInitPass() {
    this.initPassWord=!this.initPassWord;
    this.messageOK="";
    this.message="";
    this.passworEnvoye=false;
    this.formInit.reset();
  }
  initPass(){
    return this.htttpClient.get<any>(this.hostAuth + "/generatePassword/"+this.formInit.value.mail).subscribe(pass => {
      this.messageOK="Un nouveau mot de passe a été envoyé par mail";
      this.message="";
      this.passworEnvoye=true;
      this.formInit.reset();
    },error => {
      this.message="Erreur de connection";
    })
  }

}
