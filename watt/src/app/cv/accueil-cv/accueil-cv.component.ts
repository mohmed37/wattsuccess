import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Bnbecome} from "../../services/bnbecome.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accueil-cv',
  templateUrl: './accueil-cv.component.html',
  styleUrls: ['./accueil-cv.component.css']
})
export class AccueilCvComponent implements OnInit {
  public userId: number | any;
  public clientConnect:boolean;
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public entretien:string="assets/video/entretien.mp4";
  public cv:string="assets/video/cv.mp4";
  public motivation:string="assets/video/motivation.mp4";


  constructor(private http: HttpClient,private clientService:ClientService, private userConnect:AuthenticationService
    ,private bnbecome:Bnbecome,private router:Router) {
    if (userConnect.userAuthenticated){
      this.clientConnect=this.userConnect.isAuthenticated;
      this.userId=this.userConnect.userAuthenticated.id;}
  }

  ngOnInit(): void {

  }
  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome/newCv'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonbecome/newCv'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome/newCv'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonbecome/newCv'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonbecome/newCv'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonbecome/newCv'], { fragment: 'haut' });
    }
  }

}
