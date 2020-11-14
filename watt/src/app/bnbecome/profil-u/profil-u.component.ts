import { Component, OnInit } from '@angular/core';
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {FicheMetierService} from "../../services/fiche-metier.service";
import {Bnbecome} from "../../services/bnbecome.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {ProfilUModel} from "../../model/profilU.model";
import {MatRadioButton, MatRadioChange} from "@angular/material/radio";
import {ResulttatProfilUModel} from "../../model/resulttatProfilU.model";
import {ResultatRaModel} from "../../model/resultatRa.model";
import {RestitutionProfilUModel} from "../../model/restitutionProfilU.model";
import {MatDialog} from "@angular/material/dialog";
import {DialogModalComponent} from "../../dialog-modal/dialog-modal.component";

@Component({
  selector: 'app-profil-u',
  templateUrl: './profil-u.component.html',
  styleUrls: ['./profil-u.component.css']
})
export class ProfilUComponent implements OnInit {
  public userId: number | any;
  public questionnaires2:QuestionnairesModel;
  public dicoMetiersValide: boolean;
  public listQuestionProfilU:ProfilUModel[];
  public question:string;
  public numeroQcm:number=0;
  public validebutton: boolean;
  public resultatProfilU:ResulttatProfilUModel[]=[];
  public resultatProfilUNew=[];
  public profilUnew:ResulttatProfilUModel=new ResulttatProfilUModel('','','',0);
  public nombre:number=0;
  public resultRa:ResultatRaModel=new ResultatRaModel(this.userId,0,0,0,0,
    0,0,0,0,0,0,0,0,
    0,0);
  public getResulta:ResultatRaModel;
  public getrestitusionProfilU:RestitutionProfilUModel;
  public restitusionProfilU:RestitutionProfilUModel[]=[];
  public resulta: boolean;
  public profilUvalide: boolean;
  public resutatQcmnumber=0;
  public porteFolio: boolean;
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public contexteImg:string="assets/img/contexte.jpg";
  public objectifImg:string="assets/img/objectuf.jpg";
  public processImg:string="assets/img/consigne.jpg";
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;

  constructor(private bndreamService:BndreamService, private router:Router,private httpClient: HttpClient,
              private serviceClient:ClientService, private userConnect:AuthenticationService,private route: ActivatedRoute
    ,private fichemettierService:FicheMetierService,private bnbecome:Bnbecome,public dialog: MatDialog) {
    if (userConnect.userAuthenticated){
      this.clientConnect=this.userConnect.isAuthenticated;
    this.userId=this.userConnect.userAuthenticated.id;}
  }

  ngOnInit(): void {
    if (this.clientConnect) {
      this.serviceClient.getQuestionnairesAll().subscribe(list => {
        this.ListQuestionnaire = list;
        this.ListQuestionnaire.forEach(questionnaireUser => {
          if (questionnaireUser.user.id == this.userConnect.userAuthenticated.id) {
            this.serviceClient.getQuestionnaires()
              .subscribe(data => {
                this.questionnaires2 = data;
                this.dicoMetiersValide = this.questionnaires2.dicoMetiers;
                this.profilUvalide = this.questionnaires2.profilU;
                this.porteFolio = this.questionnaires2.porteFolio;
                if (this.profilUvalide) {
                  this.getResultatProfilU();

                }
              }, error => {
                console.log(error);
              });
          }else {
            return null;
          }
        })
      });
      this.getQuestionnaireProfilU();
    }
  }

  openDialog(item:string): void {
    this.getDimention(item);
    this.bnbecome.getRestitusionProfilUByPosAndDim(item,this.resutatQcmnumber).subscribe(data=>{
      this.getrestitusionProfilU=data;
      const dialogRef = this.dialog.open(DialogModalComponent, {
        width: '50%', height: 'auto',
        data: {titre: this.getrestitusionProfilU.titre, restitution: this.getrestitusionProfilU.restitution}
      });
    });
    }

  getQuestionnaireProfilU(){
    this.bnbecome.getQuestionnaireProfileU().subscribe(data=>{
      this.listQuestionProfilU=data;
      this.question=this.listQuestionProfilU[this.numeroQcm].question;
      this.getProfilU(this.listQuestionProfilU)
    });


  }

  getProfilU(listQuestionProfilU: ProfilUModel[]){

  for (let i = 0; i <listQuestionProfilU.length; i++) {
    this.profilUnew.dimention=listQuestionProfilU[i].dimention;
    this.profilUnew.item=listQuestionProfilU[i].item;
    this.profilUnew.code=listQuestionProfilU[i].code;
    this.profilUnew.point=0;
    for (let i = 0; i <this.resultatProfilU.length; i++) {
      if(this.resultatProfilU[i].dimention==this.profilUnew.dimention){
        return null;
      }
    }
    this.resultatProfilU[i]={dimention:this.profilUnew.dimention,item:this.profilUnew.item,
      code:this.profilUnew.code,point:this.profilUnew.point};
  }

}




  clic(event: MatRadioChange) {
    let value:number;
    if(event.value==1||event.value==10){value=1}
    if(event.value==2||event.value==20){value=2}
    if(event.value==3||event.value==30){value=3}
    if(event.value==4||event.value==40){value=4}
    if(event.value==5||event.value==50){value=5}

    for (let i = 0; i < this.resultatProfilU.length; i++) {
      if(this.resultatProfilU[i].dimention == this.listQuestionProfilU[this.numeroQcm].dimention){
        this.resultatProfilU[i].point=this.resultatProfilU[i].point+value;
        if (this.numeroQcm==this.listQuestionProfilU.length-1){
          return this.calculProfilU(this.resultatProfilU);
        }
      }
    }
    this.numeroQcm=this.numeroQcm+1;
    this.question=this.listQuestionProfilU[this.numeroQcm].question;
    this.validebutton=!this.validebutton;

  }

  calculProfilU(resultatProfilU: ResulttatProfilUModel[]){

    for (let i = 0; i < resultatProfilU.length; i++){
      switch (resultatProfilU[i].dimention) {
        case "authenticite":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.authenticite=this.resultRa.authenticite+(5-Ra1);
          break;
        }
        case "strategie":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.authenticite=10-(this.resultRa.authenticite+(Rb/5));

          break;
        }
        case "tenacite":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.tenacite=this.resultRa.tenacite+(5-Ra1);
          break;
        }
        case "flexibilite":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.tenacite=10-(this.resultRa.tenacite+(Rb/5));
          break;
        }
        case "reactivite":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.reactivite=this.resultRa.reactivite+(5-Ra1);
          break;
        }
        case "stabilite":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.reactivite=10-(this.resultRa.reactivite+(Rb/5));
          break;
        }
        case "introversion":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.introversion=this.resultRa.introversion+(5-Ra1);
          break;
        }
        case "extraversion":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.introversion=10-(this.resultRa.introversion+(Rb/5));
          break;
        }
        case "methode":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.methode=this.resultRa.methode+(5-Ra1);
          break;
        }
        case "improvisation":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.methode=10-(this.resultRa.methode+(Rb/5));
          break;
        }
        case "intuition":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.intuition=this.resultRa.intuition+(5-Ra1);
          break;
        }
        case "rationalisme":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.intuition=10-(this.resultRa.intuition+(Rb/5));
          break;
        }
        case "nonConformisme":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.nonConformisme=this.resultRa.nonConformisme+(5-Ra1);
          break;
        }
        case "droiture":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.nonConformisme=10-(this.resultRa.nonConformisme+(Rb/5));
          break;
        }
        case "personnelle":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.personnelle=this.resultRa.personnelle+(5-Ra1);
          break;
        }
        case "professionnelle":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.personnelle=10-(this.resultRa.personnelle+(Rb/5));
          break;
        }
        case "directive":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.directive=this.resultRa.directive+(5-Ra1);
          break;
        }
        case "pouvoir":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.directive=10-(this.resultRa.directive+(Rb/5));
          break;
        }

        case "prudence":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.prudence=this.resultRa.prudence+(5-Ra1);
          break;
        }
        case "competition":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.prudence=10-(this.resultRa.prudence+(Rb/5));
          break;
        }

        case "gregarite":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.gregarite=this.resultRa.gregarite+(5-Ra1);
          break;
        }
        case "autonomie":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.gregarite=10-(this.resultRa.gregarite+(Rb/5));
          break;
        }
        case "individualisme":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.individualisme=this.resultRa.individualisme+(5-Ra1);
          break;
        }
        case "altruisme":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.individualisme=10-(this.resultRa.individualisme+(Rb/5));
          break;
        }
        case "traditionnel":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.traditionnel=this.resultRa.traditionnel+(5-Ra1);
          break;
        }
        case "exploration":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.traditionnel=10-(this.resultRa.traditionnel+(Rb/5));
          break;
        }
        case "reflexion":{
          const Ra:number=resultatProfilU[i].point;
          const Ra1:number=Ra/5;
          this.resultRa.reflexion=this.resultRa.reflexion+(5-Ra1);
          break;
        }
        case "action":{
          const Rb:number=resultatProfilU[i].point;
          this.resultRa.reflexion=10-(this.resultRa.reflexion+(Rb/5));
          break;
        }

      }

      }
    this.saveProfilU()

      }
      saveProfilU(){
    this.resultRa.idclient=this.userId;
    this.bnbecome.saveProfilU(this.resultRa).subscribe(data=>{
       this.router.navigateByUrl("/gonBelieve");
      this.serviceClient.putQuestionnaires("profilU");
      this.getResultatProfilU();
      this.ngOnInit();
      },error => {
  console.log(error);
});
      }

  getResultatProfilU(){
    this.bnbecome.getResultatProfileU().subscribe(data=>{
      this.getResulta=data;
     this.resulta=true;
    });
  }
  closeResultatProfiliU(){
    this.resulta=false;
  }
  getRestitusion(){
    this.bnbecome.getRestitusionProfilU().subscribe(data=>{
      this.restitusionProfilU=data;
    });
  }

  getDimention(dimention:string){
    switch (dimention) {
      case "authenticite":{
        if (this.getResulta.authenticite<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.authenticite>=5&&this.getResulta.authenticite<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.authenticite>=7){
          this.resutatQcmnumber=3;}
        break;
      }
      case "Ténacité":{
        if (this.getResulta.tenacite<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.tenacite>=5&&this.getResulta.tenacite<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.tenacite>=7){
          this.resutatQcmnumber=3;}
        break;}

      case "Réactivité":{
        if (this.getResulta.reactivite<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.reactivite>=5&&this.getResulta.reactivite<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.reactivite>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Introversion":{
        if (this.getResulta.introversion<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.introversion>=5&&this.getResulta.introversion<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.introversion>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Méthode":{
        if (this.getResulta.methode<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.methode>=5&&this.getResulta.methode<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.methode>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Intuition":{
        if (this.getResulta.intuition<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.intuition>=5&&this.getResulta.intuition<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.intuition>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Non conformisme":{
        if (this.getResulta.nonConformisme<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.nonConformisme>=5&&this.getResulta.nonConformisme<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.nonConformisme>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Equilibre vie personnelle":{
        if (this.getResulta.personnelle<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.personnelle>=5&&this.getResulta.personnelle<=4){
          this.resutatQcmnumber=2;}
        if (this.getResulta.personnelle>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Directive":{
        if (this.getResulta.directive<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.directive>=5&&this.getResulta.directive<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.directive>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Prudence":{
        if (this.getResulta.prudence<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.prudence>=5&&this.getResulta.prudence<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.prudence>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Grégarité":{
        if (this.getResulta.gregarite<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.gregarite>=5&&this.getResulta.gregarite<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.gregarite>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Individualisme":{
        if (this.getResulta.individualisme<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.individualisme>=5&&this.getResulta.individualisme<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.individualisme>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Traditionnel":{
        if (this.getResulta.traditionnel<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.traditionnel>=5&&this.getResulta.traditionnel<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.traditionnel>=7){
          this.resutatQcmnumber=3;}
        break;}
      case "Réflexion":{
        if (this.getResulta.reflexion<=4){
        this.resutatQcmnumber=1;}
        if (this.getResulta.reflexion>=5&&this.getResulta.reflexion<=6){
          this.resutatQcmnumber=2;}
        if (this.getResulta.reflexion>=7){
          this.resutatQcmnumber=3;}
        break;}
    }
  }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/profilU'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/profilU'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/profilU'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonBelieve/profilU'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/profilU'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonBelieve/profilU'], { fragment: 'haut' });
    }
  }


}

