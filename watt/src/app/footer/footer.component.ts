import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../services/client.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "src/app/services/authentication.service";
import {ApiService} from "src/app/services/api.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public host: string;
  public logon:string="assets/img/newLogo2.png";
  constructor(private clientService:ClientService,private router:Router,private hostTestService:ApiService) {
    this.host=hostTestService.LOCALHOST_URL;
  }

  ngOnInit(): void {
  }

}
