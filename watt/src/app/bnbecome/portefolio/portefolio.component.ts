import { Component, OnInit } from '@angular/core';
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {FicheMetierService} from "../../services/fiche-metier.service";
import {Bnbecome} from "../../services/bnbecome.service";
import {ResultatRaModel} from "../../model/resultatRa.model";
import {ListCompetencesModel} from "../../model/listCompetences.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatRadioChange} from "@angular/material/radio";
import {ListCompetencesClientModel} from "../../model/listCompetencesClient.model";
import {BndreamService} from "../../services/bndream.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-portefolio',
  templateUrl: './portefolio.component.html',
  styleUrls: ['./portefolio.component.css']
})
export class PortefolioComponent implements OnInit {
  public startQcm: boolean;
  public profilUvalide: boolean;
  public questionnaires2:QuestionnairesModel;
  public competence:ListCompetencesModel=new ListCompetencesModel();
  public listCompetences:ListCompetencesModel[];
  public competenceSelected:ListCompetencesModel;
  public competenceValide:ListCompetencesModel;
  public formCompetence: FormGroup;
  public message: string;
  selectedValue:string;
  selectedValueClient:string;
  selectCompetence:boolean;
  listSavoir:MatRadioChange[]=[];
  public selecvalide: boolean;
  public competences:string[];
  public listCompetence=[];
  public savoirCLient=[];
  public dtailCompetence=[];

  public userId: number | any;
  public competencesClient:ListCompetencesClientModel=new ListCompetencesClientModel();
  public ListCompetenceClient:ListCompetencesClientModel=new ListCompetencesClientModel();
  public listFaireClient=[];
  public listSavoirClient=[];
  public porteFolioValide: boolean;
  public nbFaire:number;
  public nbSavoir:number;
  public dicoMetier: boolean;
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public afficherSelection: boolean=false;
  public metier:string="";
  public index:number=-1;
  public porteFolioImg1:string="assets/img/portfolio1.jpg";
  public contexteImg:string="assets/img/contexte.jpg";
  public objectifImg:string="assets/img/objectuf.jpg";
  public processImg:string="assets/img/consigne.jpg";

  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;

  constructor(private serviceClient:ClientService, private userConnect:AuthenticationService,private bnbecome:Bnbecome
              ,private router:Router) {
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
                this.porteFolioValide = this.questionnaires2.porteFolio;
                this.dicoMetier = this.questionnaires2.dicoMetiers;

                if (this.porteFolioValide) {
                  this.getCompetencesClient();

                }
              }, error => {
                console.log(error);
              });
          } else {
            return null;
          }
        })

      });

      this.formCompetence = new FormGroup({
        competence: new FormControl('', Validators.required),
        faire1: new FormControl('', Validators.required),
        faire2: new FormControl('', Validators.required),
        faire3: new FormControl('', Validators.required),
        faire4: new FormControl('', Validators.required),
        faire5: new FormControl('', Validators.required),
        faire6: new FormControl('', Validators.required),
        savoir1: new FormControl('', Validators.required),
        savoir2: new FormControl('', Validators.required),
        savoir3: new FormControl('', Validators.required),
        savoir4: new FormControl('', Validators.required),
        savoir5: new FormControl('', Validators.required),

      });
      if (this.porteFolioValide) {
        this.getCompetencesClient();
      }
      this.getListCompetences();
    }
  }


  saveCompetence(){
    this.competence.competence=this.formCompetence.value.competence;
    this.competence.faire=[this.formCompetence.value.faire1,this.formCompetence.value.faire2,
      this.formCompetence.value.faire3,this.formCompetence.value.faire4,this.formCompetence.value.faire5,this.formCompetence.value.faire6];
    this.competence.savoir=[this.formCompetence.value.savoir1,this.formCompetence.value.savoir2,
      this.formCompetence.value.savoir3,this.formCompetence.value.savoir4,this.formCompetence.value.savoir5];
    this.bnbecome.saveCompetence(this.competence).subscribe(data=>{
      this.message="Enregistrement effectué";

      this.formCompetence.reset();

    },error => {
      this.message="Enregistrement à échoué";
      console.log(error);
    });
    this.getCompetencesClient();
  }

getListCompetences(){
  this.bnbecome.getCompetence().subscribe(data=>{
   this.listCompetences=data;
   if (this.porteFolioValide) {
     this.bnbecome.getCompetenceClient().subscribe(data => {
       this.ListCompetenceClient = data;
       for (let i = 0; i < this.listCompetences.length; i++) {

         this.ListCompetenceClient.listCompetence.forEach(listMetier => {
           if (listMetier[0][2] == this.listCompetences[i].competence) {
             this.listCompetences.splice(i, 1);
           }
         })
       }
     })
   }

    },error => {
      console.log(error);
    });

}

  startQuestionnaire() {
    this.startQcm=!this.startQcm;
  }


  clic(id: number) {
    this.bnbecome.getCompetenceById(id).subscribe(data=>{
      this.competenceSelected=data;
      this.selectCompetence=true;
      this.afficherSelection=false;
      this.selecvalide=false;
      this.listCompetence=[];
      this.competences=[];
      this.listSavoir=[];

    },error => {
      console.log(error);
    });

  }

  save(event: MatRadioChange) {
    for (let i=0;i<this.listSavoir.length;i++){
      if (this.listSavoir[i].source.checked==false){
       this.listSavoir=this.listSavoir.filter(item=>item!==this.listSavoir[i]);
      }
    }
    this.listSavoir.push(event);
  }

  selecSavoir() {
    for (let i=0;i<this.listSavoir.length;i++){
      this.competences=this.split(this.listSavoir[i].value);
      for (let j=0;j<this.listCompetence.length;j++){
        if(this.listCompetence[j][3]==this.competences[3]){
          let newCompetence:string=this.listCompetence[j][0]+"+"+this.listCompetence[j][1]+"+"+this.listCompetence[j][2]
            +"+"+this.listCompetence[j][3]+"+"+this.listCompetence[j][4]+"+"+this.competences[1];
          this.competences=this.split( newCompetence);
          this.listCompetence=this.listCompetence.filter(item=>item!==this.listCompetence[j]);
        }
      }


      this.listCompetence.push(this.competences);

    }
    this.selecvalide=true;
    this.savecompetencesClient(this.listCompetence);

  }
  split(phrase:string){
    return phrase.split("+");
  }
savecompetencesClient(competencesClient){

  for (let i=0;i< competencesClient.length;i++){

    if ( competencesClient[i][5]=='maitrise'){
      competencesClient[i][5]='0';
    }
    if ( competencesClient[i][5]=='interet'){
      competencesClient[i][5]=competencesClient[i][1];
      competencesClient[i][1]='0';
    }
  }

 this.competencesClient.competence=this.selectedValue;
 this.competencesClient.idclient=this.userId;
for (let i=0;i<this.savoirCLient.length;i++){
 if (this.savoirCLient[i][0][2]==competencesClient[0][2]){
   this.savoirCLient.splice(i,1)
 }

}
 this.savoirCLient.push(competencesClient);



this.competencesClient.listCompetence=this.savoirCLient;

this.bnbecome.saveCompetenceClient(this.competencesClient).subscribe(data=>{
 this.message="Enregistrement effectué";
 this.serviceClient.putQuestionnaires("porteFolio");
  this.selectCompetence=false;
  this.getCompetencesClient();
  this.clicCompetencesClient(competencesClient,this.index);
  this.getListCompetences();
  this.ngOnInit();
},error => {
 this.message="Enregistrement à échoué";
 console.log(error);
});
}
getCompetencesClient(){
this.savoirCLient=[];
this.bnbecome.getCompetenceClient().subscribe(data=>{
 this.ListCompetenceClient=data;
 this.dtailCompetence=this.ListCompetenceClient.listCompetence;

 for (let i=0;i<this.ListCompetenceClient.listCompetence.length;i++){
   this.savoirCLient.push(this.ListCompetenceClient.listCompetence[i]);

 }

},error => {
 console.log(error);
});

}


clicCompetencesClient(competence:any,index:number) {

this.index=index;
this.metier=competence[0][2];
this.listFaireClient=[];
 this.listSavoirClient=[];
  this.selectCompetence=false;

 for (let i=0;i<competence.length;i++){
     if(competence[i][4]=='faire'){
       this.listFaireClient.push(competence[i]);
     }
     if(competence[i][4]=='savoir'){
       this.listSavoirClient.push(competence[i]);
     }
 }
  this.afficherSelection=true;
}

  closeList() {
    this.afficherSelection=false;
  }

  closeList2() {
    this.selectCompetence=null;
  }

  deleteFicheMetierClient(metier:String) {

    this.ListCompetenceClient.listCompetence.forEach(list=>{
      console.log(this.index);
      if(list[0][2]==metier){
        console.log(this.index);
        this.ListCompetenceClient.listCompetence.splice(this.index,1);
        this.bnbecome.saveCompetenceClient( this.ListCompetenceClient).subscribe(data=>{

          this.getListCompetences();
          this.getCompetencesClient();
          this.afficherSelection=false;
        },error => {
          this.message="Enregistrement à échoué";
          console.log(error);

        });
      }
    });
  }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/porteFolio'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/porteFolio'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/porteFolio'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonBelieve/porteFolio'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/porteFolio'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonBelieve/porteFolio'], { fragment: 'haut' });
    }
  }

}
