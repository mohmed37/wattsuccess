import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionnairesModel} from "../../model/questionnaires.model";

@Component({
  selector: 'app-accueil-gonbecome',
  templateUrl: './accueil-gonbecome.component.html',
  styleUrls: ['./accueil-gonbecome.component.css']
})
export class AccueilGonbecomeComponent implements OnInit {
  public serviceClient;
  public questionnaires:QuestionnairesModel;
  public testsActif: boolean=false;
  public coupe:string="assets/img/coupe.jpg";
  public depart:string="assets/img/depart.jpg";
  public progression:number=0;
  public fragment: string;
  public entretien: boolean=false;
  public cv: boolean=false;
  public organisation:boolean=false;
  public formation: boolean=false;
  public estime: boolean=false;
  public ListQuestionnaire:any[];
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public entretienImg:string="assets/img/entretien.jpg";
  public cvImg:string="assets/img/newcv.jpg";
  public reseauImg:string="assets/img/reseau.jpg";
  public organisationImg:string="assets/img/organiser.jpg";
  public formationImg:string="assets/img/formation.jpg";
  public estimeImg:string="assets/img/estime.jpg";
  public userId: number | any;
  public clientConnect:boolean;

  constructor(public authService:AuthenticationService,private clientService:ClientService
    ,private router:Router,private route: ActivatedRoute, private userConnect:AuthenticationService) {
    this.serviceClient=clientService;
    if (userConnect.userAuthenticated){
      this.clientConnect=this.userConnect.isAuthenticated;
      this.userId=this.userConnect.userAuthenticated.id;}
  }

  ngOnInit(): void {

    if(this.clientConnect){
      this.clientService.getQuestionnairesAll().subscribe(list=>{
        this.ListQuestionnaire=list;
        this.ListQuestionnaire.forEach(questionnaireUser=>{
          if (questionnaireUser.user.id==this.userConnect.userAuthenticated.id){
      this.serviceClient. getQuestionnaires()
        .subscribe(data=>{
          this.questionnaires=data;

          if (this.entretien){
            this.progression=20;
          }
          if (this.cv){
            this.progression=40;
          }
          if (this.organisation){
            this.progression=80;
          }
          if (this.estime){
            this.progression=100;
          }
          if (this.formation){
            this.progression=100;
          }

        },error => {
          console.log(error);
        });
          }else {
            return null;
          }

        })
      });
    }
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

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonbecome'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonbecome'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonbecome'], { fragment: 'haut' });

    }
  }
  process() {
    if (!this.processValide) {
      this.processValide = true;
      this.objectifValide = false;
      this.contexteValide = false;
      this.router.navigate(['/gonbecome'], {fragment: 'process'});
    } else {
      this.processValide = false;
      this.router.navigate(['/gonbecome'], {fragment: 'haut'});
    }
  }

}
