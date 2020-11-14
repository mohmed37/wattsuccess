import {Component,OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {ClientService} from "../../services/client.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-bndream',
  templateUrl: './bndream.component.html',
  styleUrls: ['./bndream.component.css']
})
export class BndreamComponent implements OnInit {
  public testsActif: boolean=false;
  public coupe:string="assets/img/coupe.jpg";
  public depart:string="assets/img/depart.jpg";
  public contexteImg:string="assets/img/contexte.jpg";
  public objectifImg:string="assets/img/objectuf.jpg";
  public processImg:string="assets/img/consigne.jpg";
  public photlangageImg:string="assets/img/photolangage.jpg";
  public rouedelavieImg:string="assets/img/rouedelavie.jpg";
  public autoportraitImg:string="assets/img/newautoportrait.jpg";
  public praicoImg:string="assets/img/newpraico.jpg";
  public herosImg:string="assets/img/heros.jpg";
  public serviceBream;
  public serviceClient;
  public questionnaires:QuestionnairesModel;
  public photolangage:boolean=false;
  public roueVie: boolean=false;
  public autoportrait: boolean=false;
  public qcm1:boolean=false;
  public qcm2:boolean=false;
  public qcm3:boolean=false;
  public qcm4:boolean=false;
  public hero: boolean=false;
  public progression:number=0;
  public fragment: string;
  public ListQuestionnaire:any[];
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public colorNewQcm1: string="orange";
  public colorNewQcm2: string="orange";
  public colorNewQcm3: string="orange";
  public colorNewQcm4: string="orange";
  public clientConnect:boolean;

  constructor(private clientService:ClientService,private bndreamService:BndreamService,private router:Router,
              private route: ActivatedRoute, private userConnect:AuthenticationService) {
    this.serviceClient=clientService;
    this.serviceBream=this.bndreamService;
  }

  ngOnInit(): void {
    let id=sessionStorage.getItem('id');
    this.clientConnect=this.userConnect.isAuthenticated;
      if(this.clientConnect){
        this.clientService.getQuestionnairesAll().subscribe(list=>{
          this.ListQuestionnaire=list;
          if (this.ListQuestionnaire.length>0) {
            this.ListQuestionnaire.forEach(questionnaireUser => {
              if (questionnaireUser.user.id == id) {
                this.serviceClient.getQuestionnaires()
                  .subscribe(data => {
                    this.questionnaires = data;
                    this.photolangage = this.questionnaires.photoLangage;
                    this.roueVie = this.questionnaires.roueVie;
                    this.autoportrait = this.questionnaires.autoPortrait;
                    this.qcm1 = this.questionnaires.qcm1;
                    if (this.qcm1) {
                      this.colorNewQcm1 = "green";
                    }
                    this.qcm2 = this.questionnaires.qcm2;
                    if (this.qcm2) {
                      this.colorNewQcm2 = "green";
                    }
                    this.qcm3 = this.questionnaires.qcm3;
                    if (this.qcm3) {
                      this.colorNewQcm3 = "green";
                    }
                    this.qcm4 = this.questionnaires.qcm4;
                    if (this.qcm4) {
                      this.colorNewQcm4 = "green";
                    }
                    this.hero = this.questionnaires.hero;

                    if (this.photolangage) {
                      this.progression = 20;
                    }
                    if (this.roueVie) {
                      this.progression = 40;
                    }
                    if (this.autoportrait) {
                      this.progression = 60;
                    }
                    if (this.qcm1) {
                      this.progression = 65;
                    }
                    if (this.qcm2) {
                      this.progression = 75;
                    }
                    if (this.qcm3) {
                      this.progression = 85;
                    }
                    if (this.qcm4) {
                      this.progression = 90;
                    }
                    if (this.hero) {
                      this.progression = 100;
                    }
                  }, error => {
                    console.log(error);
                  });
              } else {
                return null;
              }

            })
          }
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
      this.router.navigate(['/bndream'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/bndream'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/bndream'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/bndream'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/bndream'], { fragment: 'haut' });
    }
  }




}
