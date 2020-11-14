import { Component, OnInit } from '@angular/core';
import {MatRadioChange} from "@angular/material/radio";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-estime',
  templateUrl: './estime.component.html',
  styleUrls: ['./estime.component.css']
})
export class EstimeComponent implements OnInit {
  public questions:any[]=[
    {numero:1,question:"Je m’accepte en tant que personne."},
    {numero:2,question:"J’ai confiance en moi."},
    {numero:3,question:"Je sais m’affirmer."},
    {numero:4,question:"Je suis aimé(e) par la plupart des gens."},
    {numero:5,question:"Je m’exprime facilement dans un groupe."},
    {numero:6,question:" Je mérite d’être heureux(se)."},
    {numero:7,question:" J’estime que mon opinion est aussi importante que celle des autres."},
    {numero:8,question:" « C’est humain de commettre une erreur », vous dites-vous cela lorsqu’il vous arrive de vous tromper ?"},
    {numero:9,question:"Vous est-il facile d’écouter une critique justifiée qui vous est faite ?"},
    {numero:10,question:"Êtes-vous capable de dire à un autre adulte que vous n’acceptez pas son comportement à votre égard ?"},
    {numero:11,question:" Lorsqu’une relation devient insupportable, êtes-vous capable de la cesser ?"},
    {numero:12,question:"Avez-vous la capacité de dire non lorsque c’est nécessaire ?"}
    ];
  public resultat1:string="Il y a des obstacles à dépasser. Vous allez gagner de nouveaux points en travaillant sur" +
    " le présent cahier. Votre vie en sera facilitée !";
  public resultat2:string="Vous êtes en route. Il vous reste à développer certains points importants.";
  public resultat3:string="Vous avez déjà une estime de vous-même « respectable » !" +
    " En trouvant sur quels aspects progresser, vous trouverez un plaisir toujours plus grand à vivre au milieu des autres.";
  public resultat:string="";
  labelPosition: any;
  public numero:number=0;
  public point: number=0;
  public finTest: boolean;
  public  on:boolean;
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public userId: number | any;
  public clientConnect:boolean;
  public estime:string="assets/video/EstimeDeSoi.mp4";

  constructor(private router:Router,private userConnect:AuthenticationService) {
    if (userConnect.userAuthenticated){
      this.clientConnect=this.userConnect.isAuthenticated;
      this.userId=this.userConnect.userAuthenticated.id;}
  }

  ngOnInit(): void {
  }

  onChange(event: MatRadioChange) {
   this.on=!this.on;
    this.numero=this.numero+1;
    this.point=Number(event.value)+this.point;
    if (this.numero==12){
      this.finTest=true;
      if (this.point<=15){
        this.resultat=this.resultat1;
      }
      if (this.point>15&&this.point<=25){
        this.resultat=this.resultat2;
      }
      if (this.point>=26){
        this.resultat=this.resultat3;
      }
    }
    event.source.checked=false;
  }
  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome/estime'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonbecome/estime'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome/estime'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonbecome/estime'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonbecome/estime'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonbecome/estime'], { fragment: 'haut' });
    }
  }

}
