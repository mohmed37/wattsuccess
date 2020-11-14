import { Component, OnInit } from '@angular/core';
import {Client} from "../../model/client.model";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {
  public hostUser: string;
  public hostAuth:string;
  public token:string;
  public salarieImg:string="assets/img/salarie.png";
  public mode: boolean=false;
  public fragment: string;
  constructor(private route: ActivatedRoute, private htttpClient: HttpClient, private hostTestService: ApiService, private router: Router,private autheService: AuthenticationService) {
    this.hostUser = hostTestService.USERS_MICRO_APP;
    this.hostAuth=hostTestService.AUTH_MICRO_APP;
  }

  ngOnInit(): void {
this.userConnect();

}
  public userConnect() {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
    return this.htttpClient.get(this.hostAuth + "/confirm-account?token="+this.token ).subscribe(validation => {

    },error => {
      this.mode = error.error.text == "Email verifié";
     this.fragment='valide';
    })
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
    } catch (e) { }
  }

}
