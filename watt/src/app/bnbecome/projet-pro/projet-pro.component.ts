import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {FicheMetierService} from "../../services/fiche-metier.service";
import {FicheMetier} from "../../model/ficheMetier.model";
import {ListMetierClientModel} from "../../model/listMetierClient.model";
import {Bnbecome} from "../../services/bnbecome.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BndreamService} from "../../services/bndream.service";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-projet-pro',
  templateUrl: './projet-pro.component.html',
  styleUrls: ['./projet-pro.component.css']
})
export class ProjetProComponent implements OnInit {
  public questionnaires2:QuestionnairesModel;
  public profilUvalide: boolean;
  public ficheClient:ListMetierClientModel;
  public metierValide:any[]=[];
  public metier:any[]=[];
  public ficheClientNew:ListMetierClientModel;
  public hostTest: string;
  public message: string;
  retrieveResonse: any;
  base64Data: any;
  retrievedImageFicheMetier: any;
  listImageFicheMetier=[];
  public idMetierSelect:number[]=[];
  listByMetierSelect:FicheMetier[]=[];
  public metierValideBySelction: boolean;
  public projetProValide: boolean;
  public photo1:string="assets/img/loupeJob.jpg";
  public photo2:string="assets/img/passionJob.jpg";
  public photo3:string="assets/img/rechercheJob.jpg";
  public poleEmploi:string="assets/img/poleEmploi.jpeg";
  public nbSelect:number=0;
  public userId: number | any;
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public contexteImg:string="assets/img/contexte.jpg";
  public objectifImg:string="assets/img/objectuf.jpg";
  public processImg:string="assets/img/consigne.jpg";
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;

  constructor(private serviceClient:ClientService,private fichemettierService:FicheMetierService,
              private bnbecome:Bnbecome, private router:Router, private userConnect:AuthenticationService,private hostTestService:ApiService) {
    this.hostTest=hostTestService.TEST_MICRO_APP;
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
          this.profilUvalide = this.questionnaires2.profilU;
          this.projetProValide = this.questionnaires2.projetPro;
          if (this.projetProValide) {
            this.metierValideBySelction = true;
          }
          if(this.profilUvalide){
            console.log(this.profilUvalide);
            this.listFicheMetierClient();}

        }, error => {
          console.log(error);
        });
          }else {
            return null;
          }
        })
      });
    }
  }

  listFicheMetierClient(){
    this.bnbecome.getFicheMetierClient().subscribe(
      data=>{
        this.ficheClient=data;
        this.ficheClient.valide.forEach(ficheMetierValide=>{
           this.metierValide.push(ficheMetierValide)

        });
        this.ficheClient.ficheMetiers.forEach(ficheMetier=>{
         let id=ficheMetier.id;
          this.metierValide.forEach(ficheMetierNewValide=>{
            if (ficheMetierNewValide.id==id){

              this.metier.push({ficheMetier:ficheMetier,etat:ficheMetierNewValide.etat});

            }
          });
        });
        this.getMetierSelection(this.metierValide,this.ficheClient);

      },error => {
        console.log(error);
      });

  }

  clic(event: MatCheckboxChange) {
    for (let j = 0; j <this.ficheClient.valide.length; j++) {

      if(this.ficheClient.valide[j].id==event.source.value){
        if (event.source.checked==true){
          this.ficheClient.valide[j].selection=true;
          this.nbSelect=this.nbSelect+1;
        }
        if (event.source.checked==false){
          this.ficheClient.valide[j].selection=false;
          this.nbSelect=this.nbSelect-1;
        }
      }

    }
    this.bnbecome.modifListMetierClient(this.ficheClient)
      .subscribe(res=>{
        this.ficheClient=res;
        this.message = 'Enregistré avec succès';

      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })
  }
  getImageFicheMeier(idImage:number) {
    this.fichemettierService.ficheMetierByImage(idImage)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImageFicheMetier = 'data:image/jpeg;base64,' + this.base64Data;
          this.listImageFicheMetier.push({photo:this.retrievedImageFicheMetier,name:this.retrieveResonse.name});
          return 'data:image/jpeg;base64,' + this.base64Data;
        });
  }

  valideSelec(){
    this.serviceClient.putQuestionnaires("projetPro");
    this.metierValideBySelction=true;
   /* this.router.navigateByUrl("/bnBelieve");*/
  }

  getMetierSelection(metierValide: any[], ficheClient: ListMetierClientModel){
    metierValide.forEach(ficheMetierValide=>{
      if(ficheMetierValide.selection==true){
        ficheClient.ficheMetiers.forEach(ficheMetier=>{
          if (ficheMetier.id==ficheMetierValide.id){
            this.listByMetierSelect.push(ficheMetier);
          }
        })
      }
    });
  }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/projetPro'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/projetPro'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/projetPro'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonBelieve/projetPro'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/projetPro'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonBelieve/projetPro'], { fragment: 'haut' });
    }
  }
}
