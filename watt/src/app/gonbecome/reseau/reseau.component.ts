import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-reseau',
  templateUrl: './reseau.component.html',
  styleUrls: ['./reseau.component.css']
})
export class ReseauComponent implements OnInit {

  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public reseau:string="assets/video/reseau.mp4";
  public userId: number | any;
  public clientConnect:boolean;

  constructor(private router:Router,private userConnect:AuthenticationService) {
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
      this.router.navigate(['/gonbecome/reseau'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonbecome/reseau'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome/reseau'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonbecome/reseau'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonbecome/reseau'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonbecome/reseau'], { fragment: 'haut' });
    }
  }
}
