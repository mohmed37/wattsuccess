import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {MatChipListChange} from "@angular/material/chips";
import {PeriodicElement} from "../../services/PeriodicElement";
import {HandiWattModel} from "../../model/handiWatt.model";
import {Bnbecome} from "../../services/bnbecome.service";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {ClientService} from "../../services/client.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";



@Component({
  selector: 'app-handi-watt',
  templateUrl: './handi-watt.component.html',
  styleUrls: ['./handi-watt.component.css']
})
export class HandiWattComponent implements OnInit {
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public handiWatt= new HandiWattModel();
  public fond:string="linear-gradient(180deg,#b65010,#f8c620)";
  public couleur:any[]=[{partie:"colorchapeau",color:"forestgreen"},
    {partie:"oeilDroit",color:"forestgreen"},
    {partie:"oeilGauche",color:"forestgreen"},
    {partie:"bouche",color:"forestgreen"},
    {partie:"oreilleGauche",color:"forestgreen"},
    {partie:"oreilleDroite",color:"forestgreen"},
    {partie:"cou",color:"forestgreen"},
    {partie:"thorax",color:"forestgreen"},
    {partie:"epauleDroit",color:"forestgreen"},
    {partie:"brasDroit",color:"forestgreen"},
    {partie:"CoudeDroit",color:"forestgreen"},
    {partie:"avantBrasDroit",color:"forestgreen"},
    {partie:"mainDroit",color:"forestgreen"},
    {partie:"epauleGauche",color:"forestgreen"},
    {partie:"brasGauche",color:"forestgreen"},
    {partie:"CoudeGauche",color:"forestgreen"},
    {partie:"avantBrasGauche",color:"forestgreen"},
    {partie:"mainGauche",color:"forestgreen"},
    {partie:"ventre",color:"forestgreen"},
    {partie:"hanche",color:"forestgreen"},
    {partie:"cuisseDroit",color:"forestgreen"},
    {partie:"genouDroit",color:"forestgreen"},
    {partie:"jambeDroit",color:"forestgreen"},
    {partie:"cuisseGauche",color:"forestgreen"},
    {partie:"genouGauche",color:"forestgreen"},
    {partie:"jambeGauche",color:"forestgreen"},
    {partie:"nuque",color:"forestgreen"},
    {partie:"dos",color:"forestgreen"},
    {partie:"basDos",color:"forestgreen"},
    {partie:"chevilleDroite",color:"forestgreen"},
    {partie:"chevilleGauche",color:"forestgreen"},
  ];
  public face:boolean;


   dataSource: PeriodicElement[] = [
     {etat:true,question: "Déplacement et postures", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "Les déplacements sur le lieu de travail", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
    {etat:null,question: "Marcher en terrain plat", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Se déplacer en élévation", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Emprunter un escalier", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:false,question: "Les positions au travail", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Travailler debout", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler assis", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler assis/debout", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler accroupi", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler à genoux", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler en position d’équilibre instable", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:false,question: "Les mouvements du dos", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Fléchir le tronc", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Fléchir le cou", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Manutentions", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "Les manipulations d’objets dans l’emploi", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Soulever une charge de 15 à 30 kg", reponse1:"white" , reponse2:"white", reponse3: "white"},
     {etat:null,question: "Soulever une charge de 1 à 5 kg", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Se déplacer avec une charge", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Déplacer une charge", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Projeter une charge de 1 à 5kg", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Fonctions gestuelles", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "Les mouvements de bras", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Travailler les bras au dessus du niveau des épaules", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler les bras tendus en avant", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Tourner un volant", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Assurer une succession de gestes rapides", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Faire des gestes précis", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:false,question: "Les mouvements de jambes", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Appuyer sur des pédales", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Coordonner les mouvements des jambes avec ceux des bras", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Fonctions gestuelles à dominantes manuelles", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "L’utilisation des mains", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Saisir un objet entre le pouce et l’index", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Saisir un objet à pleine main", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Etre précis dans les gestes des mains", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Coordonner les mouvements des deux mains", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Fonctions d’environnement physique", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "L’environnement de travail", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Travailler aux intempérie", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Être exposé aux irritants cutanés", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Être exposé aux irritants respiratoires", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:false,question: "La résistance physique", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Supporter des cadences imposées", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Fonctions sensorielle", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "Les cinq sens", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Voir avec les deux yeux", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Avoir l’oreille fine", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Parler et communiquer", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Percevoir le froid et le chaud", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Reconnaître les odeurs", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Fonctions de vigilancee", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "Les capacités de concentration", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Attention concentré pendant toute la durée", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Méticulosité et soins", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:true,question: "Fonctions psychologiques et mentales", reponse1: "dimgray", reponse2:"dimgray", reponse3: "dimgray"},
     {etat:false,question: "Les conditions de travail", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Travailler en équipe", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Travailler seul", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Prendre des responsabilités", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Etablir une relation client/fournisseurs", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:false,question: " Les aptitudes mises en oeuvre", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Mémoriser à court terme", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Comprendre les documents écrits", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Ecrire un document", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Réaliser des opérations mathématiques", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:false,question: " Les aptitudes complémentaires", reponse1: "gray", reponse2:"gray", reponse3: "gray"},
     {etat:null,question: "Etablir des relations", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Être attentif", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Analyser", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Etre créatif", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Organiser", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Utiliser du matériel informatiques", reponse1: "white", reponse2:"white", reponse3: "white"},
     {etat:null,question: "Conduire", reponse1: "white", reponse2:"white", reponse3: "white"},
  ];
  colorReponse1:string="red";
  public message: string;
  public questionnaires=new QuestionnairesModel() ;
  public questionnaires2:QuestionnairesModel;
  public ListQuestionnaire:any[];
  public profolioUvalide: boolean;
  public heroValide: boolean;
  public handiWattValide: boolean;
  public clientConnect:boolean;

  constructor(private router:Router,private bnbecome:Bnbecome,private userConnect:AuthenticationService
              ,private serviceClient:ClientService) {
    this.clientConnect=this.userConnect.isAuthenticated;
  }

  ngOnInit(): void {
    if(this.clientConnect) {
      this.serviceClient.getQuestionnairesAll().subscribe(list => {
        this.ListQuestionnaire = list;
        this.ListQuestionnaire.forEach(questionnaireUser => {
          if (questionnaireUser.user.id == this.userConnect.userAuthenticated.id) {
            this.serviceClient.getQuestionnaires()
              .subscribe(data => {
                this.questionnaires2 = data;
                this.profolioUvalide = this.questionnaires2.porteFolio;
                this.handiWattValide = this.questionnaires2.handiWatt;
                if (this.handiWattValide) {
                  this.gethandiWattClient();
                }
              }, error => {
                console.log(error);
              });
          } else {
            return null;
          }
        })
      })
    }
  }

  contexte()
    {
      if (!this.contexteValide) {
        this.contexteValide = true;
        this.objectifValide = false;
        this.processValide = false;
        this.router.navigate(['/gonBelieve/handiWatt'], {fragment: 'contexte'});
      } else {
        this.contexteValide = false;
        this.router.navigate(['/gonBelieve/handiWatt'], {fragment: 'haut'});
      }

  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/handiWatt'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonBelieve/handiWatt'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/handiWatt'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonBelieve/handiWatt'], { fragment: 'haut' });
    }
  }

  changeColor(partie:string) {
     for (let i=0; i<this.couleur.length;i++){
       this.newColor(this.couleur[i],i,partie);
     }


  }

  private newColor(item: any, index: number,partie:string) {

    if(item.partie==partie){
      if (item.color=="forestgreen"){
        this.couleur[index]={partie:partie,color:"orange"};
      }
      if (item.color=="orange"){
        this.couleur[index]={partie:partie,color:"red"};
      }
      if (item.color=="red"){
        this.couleur[index]={partie:partie,color:"forestgreen"};

      }else {
        return null;
      }

    }
  }


  clic(etat: string) {

    if(etat=="bon"){
      this.fond="linear-gradient(180deg,#2ecc71,forestgreen)";
    }
    if(etat=="moyen"){
      this.fond="linear-gradient(180deg,#b65010,#f8c620)";
    }
   if(etat=="mauvais"){
     this.fond="linear-gradient(180deg,red,crimson)";
   }
   if (etat=="face"){
     this.face=!this.face;
   }

  }

  save(question: any, number: number,couleur:string) {
    for (let i=0; i<this.dataSource.length;i++){
      if(this.dataSource[i].question==question){
        if (number==1){
         if (couleur=="white"){
           this.dataSource[i]={etat:null,question: question, reponse1: "forestgreen", reponse2:"white", reponse3: "white"};
         }
          if (couleur=="forestgreen"){
            this.dataSource[i]={etat:null,question: question, reponse1: "white", reponse2:"white", reponse3: "white"};
          }
        }
        if (number==2){
          if (couleur=="white"){
            this.dataSource[i]={etat:null,question: question, reponse1: "white", reponse2:"orange", reponse3: "white"};
          }
          if (couleur=="orange"){
            this.dataSource[i]={etat:null,question: question, reponse1: "white", reponse2:"white", reponse3: "white"};
          }
        }
        if (number==3){
          if (couleur=="white"){
            this.dataSource[i]={etat:null,question: question, reponse1: "white", reponse2:"white", reponse3: "red"};
          }
          if (couleur=="red"){
            this.dataSource[i]={etat:null,question: question, reponse1: "white", reponse2:"white", reponse3: "white"};
          }
        }
      }
    }

  }
  saveHandiWatt(){
    this.handiWatt.idclient=this.userConnect.userAuthenticated.id;
    this.handiWatt.mister=this.couleur;
    this.handiWatt.potentiel=this.dataSource;
  this.bnbecome.saveHandiWatt( this.handiWatt).subscribe(data=>{
    if(!this.handiWattValide){
    this.serviceClient.putQuestionnaires("handiWatt");}
    this.message="Enregistrement validé";
},error => {
  this.message="Enregistrement à échoué";
  console.log(error);

});
}

  private gethandiWattClient() {
    this.bnbecome.getHandiWattClient().subscribe(data=>{
    this.dataSource=data.potentiel;
    this.couleur=data.mister;

    },error => {
      console.log(error);
    });
  }
}
