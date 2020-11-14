import { Component, OnInit } from '@angular/core';
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {FicheMetierService} from "../../services/fiche-metier.service";
import {FicheMetier} from "../../model/ficheMetier.model";
import {Bnbecome} from "../../services/bnbecome.service";
import {ListMetierClientModel} from "../../model/listMetierClient.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-dico-metiers',
  templateUrl: './dico-metiers.component.html',
  styleUrls: ['./dico-metiers.component.css']
})
export class DicoMetiersComponent implements OnInit {
  public dicoMetiersValide: boolean=false;
  public testDicoMetiers:boolean=false ;
  public questionnaires=new QuestionnairesModel() ;
  public questionnaires2:QuestionnairesModel;
  public userId: number | any;
  imageId: number;
  retrieveResonse: any;
  base64Data: any;
  retrievedImageFicheMetier: any;
  ImageFicheMetier: any;
  listImageFicheMetier=[];
  public ficheClient:FicheMetier[];
  public ficheClientNew:ListMetierClientModel;
  public idimage=[];
  public nbrsFicheMetier:number;
  private  valide:boolean;
  public photoCarrousel: any;
  public idCarrousel:number=0;
  public listMetierDico=[];
  public listMetierDicoValide=[];
  public metierDico:string;
  public listDesMetierSelect=[];
  public listcoeurValide:boolean[]=[];
  public ficheCaroussel:FicheMetier[];
  public selecMetier: boolean;
  public FicheMetieSelect=new FicheMetier();
  public listFicheMetier=new ListMetierClientModel();
  public idficheSelect:number;
  public FicheMetier: any;
  public idFicheMetier: number;
  public metier: string;
  public competence:string;
  public competences:string[];
  public  qualite:string;
  public qualites:string[];
  public texte:string;
  public code:string;
  public selectFicheMetierValide: boolean;
  colorNewText: string="#a59b95";
  colorNewText2:string="#c12b78";
  message: string;
  public profilUvalide: boolean;
  public heroValide: boolean;
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public select: boolean;
  public contexteImg:string="assets/img/contexte.jpg";
  public objectifImg:string="assets/img/objectuf.jpg";
  public processImg:string="assets/img/consigne.jpg";
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public metierModif: string;

  constructor(private bndreamService:BndreamService, private router:Router,private httpClient: HttpClient,
              private serviceClient:ClientService, private userConnect:AuthenticationService,private route: ActivatedRoute
    ,private fichemettierService:FicheMetierService,private bnbecome:Bnbecome,private hostTestService:ApiService ) {

    if (userConnect.userAuthenticated){

    this.userId=this.userConnect.userAuthenticated.id;
      this.clientConnect=this.userConnect.isAuthenticated;
    }

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
                  this.heroValide = this.questionnaires2.hero;
                  this.profilUvalide = this.questionnaires2.profilU;
                  if (this.dicoMetiersValide) {
                    this.getFicheClient();
                  }
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


  getFicheClient(){
    this.bnbecome.getFicheMetierClient().subscribe(
      data=>{
        this.ficheClientNew=data;
        this.nbrsFicheMetier= this.ficheClientNew.ficheMetiers.length;
        for (let i = 0; i <this.nbrsFicheMetier; i++) {
          this.idimage.push(this.ficheClientNew.ficheMetiers[i].photo.id);

          this.testDicoMetiers=true;
        }
        let unique=new Set(this.idimage);
        let list=[...unique];
        for (let i = 0; i <list.length; i++){
          this.getImageFicheMeier(list[i]);
        }
      }
    )
  }


  listFicheMetierClient(){
    this.fichemettierService.getFicheMetierClient().subscribe(
      data=>{
        this.select=true;
        this.ficheClient=data;
        this.onSaveListMetierClient(this.ficheClient);

      },error => {
        console.log(error);
      });
  }



  getImageFicheMeier(idImage:number) {

    this.fichemettierService.ficheMetierByImage(idImage)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImageFicheMetier = 'data:image/jpeg;base64,' + this.base64Data;

          this.listImageFicheMetier.push({photo:this.retrievedImageFicheMetier,metier:this.retrieveResonse.name});
          this.listMetierDico.push(this.retrieveResonse.name);
          this.photoCarrousel=this.listImageFicheMetier[0];
          this.metierDico=this.listMetierDico[0];
        });
  }

  getImageFicheMeierDetail(idImage:number) {

    this.fichemettierService.ficheMetierByImage(idImage)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.ImageFicheMetier = 'data:image/jpeg;base64,' + this.base64Data;

        });
  }


  onChange(event: Event) {
    console.log(event)
  }

  page(s: string) {
    this.selecMetier=false;
    this.selectFicheMetierValide=false;
    if (s=='+'&&this.idCarrousel<this.listImageFicheMetier.length-1){
      this.idCarrousel=this.idCarrousel+1;
    }
    if (s=='-'&&this.idCarrousel>0){
      this.idCarrousel=this.idCarrousel-1;
    }
    this.photoCarrousel=this.listImageFicheMetier[this.idCarrousel];
    this.metierDico=this.listMetierDico[this.idCarrousel];
  }

  clic(metier:any){
    this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'select' });
    this.metierModif=metier;
    this.selectFicheMetierValide=false;
    this.listDesMetierSelect=[];
    this.selecMetier=true;
    for (let i = 0; i <this.ficheClientNew.ficheMetiers.length; i++) {
      if(this.ficheClientNew.ficheMetiers[i].photo.name==metier){
        for (let j = 0; j <this.ficheClientNew.valide.length; j++) {
          if (this.ficheClientNew.valide[j].id==this.ficheClientNew.ficheMetiers[i].id){
            this.listDesMetierSelect.push({ficheMetier:this.ficheClientNew.ficheMetiers[i],etat:this.ficheClientNew.valide[j].etat});

          }
        }
      }
    }
  }

  selectFicheMetier(id: number) {
    this.selectFicheMetierValide =true;
    this.fichemettierService.ficheMetier(id)
      .subscribe(
        res => {
          this.FicheMetier=res;
          this.imageId=this.FicheMetier.photo.id;
          this.getImageFicheMeierDetail(this.imageId);
          this.metier=this.FicheMetier.metier;
          this.competence=this.FicheMetier.competence;
          this.competences=this.split(this.competence);
          this.code=this.FicheMetier.code;
          this.qualite=this.FicheMetier.qualite;
          this.qualites=this.split(this.qualite);
          this.texte=this.FicheMetier.texte;
        }
      );
  }
  split(phrase:string){

    return phrase.split("-");

  }

  getTexte(event) {

    this.getImageFicheMeier(event)
  }

  changeColor(id:any) {

    for (let j = 0; j <this.ficheClientNew.ficheMetiers.length; j++) {
      if(this.ficheClientNew.valide[j].id==id){
        this.ficheClientNew.valide[j].etat=!this.ficheClientNew.valide[j].etat;
        if(!this.dicoMetiersValide){
        this.serviceClient.putQuestionnaires("dicoMetier");}

      }
    }
    this.bnbecome.modifListMetierClient(this.ficheClientNew)
      .subscribe(res=>{
        this.ficheClientNew=res;
        this.clic(this.metierModif);
        this.selecMetier=true;
        this.message = 'Enregistré avec succès';
      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })
  }

  onSaveListMetierClient(ficheClient: FicheMetier[]) {
    for(let j = 0; j <this.ficheClient.length; j++){
      this.listMetierDicoValide.push({id:this.ficheClient[j].id,etat:false,selection:false});
    }
    this.listFicheMetier.valide=this.listMetierDicoValide;
    this.listFicheMetier.ficheMetiers=ficheClient;
    this.listFicheMetier.client=this.userId;
    this.bnbecome.saveListMetierClient(this.listFicheMetier)
      .subscribe(res=>{
        this.message = 'Enregistré avec succès';
        this.getFicheClient();
      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })
  }

  change(event: string) {
    console.log(event);

  }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonBelieve/dicoMetiers'], { fragment: 'haut' });
    }
  }

  close() {
    this.selecMetier=false;
  }
}
