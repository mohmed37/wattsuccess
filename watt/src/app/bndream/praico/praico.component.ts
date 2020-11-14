import { Component, OnInit } from '@angular/core';
import {Questionnaire1Model} from "../../model/questionnaire1.model";
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {ResultatPraicoModel} from "../../model/resultatPraico.model";
import {Questionnaire2Model} from "../../model/questionnaire2.model";
import {Questionnaire4Model} from "../../model/questionnaire4.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ChartDataSets, ChartType, RadialChartOptions, RadialLinearScale} from "chart.js";
import {Label} from "ng2-charts";


@Component({
  selector: 'app-praico',
  templateUrl: './praico.component.html',
  styleUrls: ['./praico.component.css']
})
export class PraicoComponent implements OnInit {
  public questionnaire1=new Questionnaire1Model();
  public questionnaire2=new Questionnaire2Model();
  public questionnaire4=new Questionnaire4Model(0,[]);
  public autoPortraitValide: boolean=false;
  public qcm1Valide: boolean=false;
  public qcm2Valide: boolean=false;
  public qcm3Valide: boolean=false;
  public qcm1ValideLocal: boolean=false;
  public qcm2ValideLocal: boolean=false;
  public qcm3ValideLocal: boolean=false;
  public qcm4Valide: boolean=false;
  public questionnaires:QuestionnairesModel;
  public resultatPraico=new ResultatPraicoModel(0,0,0,0,0,0);
  public qcm1Id: number=1;
  public qcmRun: boolean=false;
  public message: string;
  public userId: number | any;
  public formQcm4: FormGroup;
  public qucm4 :Questionnaire4Model[];
  public form=new FormControl( false, Validators.required);
  public selection:number=0;
  public initform=new FormControl();
  public choix1:string;
  public choix2:string;
  public choix3:string;
  public choix4:string;
  public choix5:string;
  public choix:string[];
  public id=[];
  public id1:string;
  public id2:string;
  public id3:string;
  public id4:string;
  public id5:string;
  public resultat:ResultatPraicoModel;
  public a:number;
  public list=[{name:null,value:0},{name:null,value:0},{name:null,value:0},{name:null,value:0},{name:null,value:0}
  ,{name:null,value:0}];
  public data: (any | number)[];
  public fragment: string;
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;



  constructor(private bndreamService:BndreamService, private router:Router,private httpClient: HttpClient,
              private serviceClient:ClientService, private userConnect:AuthenticationService,private route: ActivatedRoute) {

    if (userConnect.userAuthenticated){
    this.clientConnect=this.userConnect.isAuthenticated;
    this.userId=this.userConnect.userAuthenticated.id;}
  }

  ngOnInit(): void {
    if (this.clientConnect) {
      this.formQcm4 = new FormGroup({
        id: new FormControl('', Validators.required),
        metier: new FormControl('', Validators.required),
        lettre1: new FormControl('', Validators.required),
        lettre2: new FormControl('', Validators.required),
        lettre3: new FormControl('', Validators.required),

      });
      this.serviceClient.getQuestionnairesAll().subscribe(list => {
        this.ListQuestionnaire = list;
        this.ListQuestionnaire.forEach(questionnaireUser => {
          if (questionnaireUser.user.id == this.userConnect.userAuthenticated.id) {
            this.serviceClient.getQuestionnaires()
              .subscribe(data => {
                this.questionnaires = data;
                this.autoPortraitValide = this.questionnaires.autoPortrait;
                this.qcm1Valide = this.questionnaires.qcm1;
                this.qcm2Valide = this.questionnaires.qcm2;
                this.qcm3Valide = this.questionnaires.qcm3;
                this.qcm4Valide = this.questionnaires.qcm4;

                if (this.qcm4Valide) {
                  this.bndreamService.getResultPraico().subscribe(
                    data => {
                      this.resultat = data;
                      this.a = this.resultat.nombreA;
                      this.data = [this.resultat.nombreP, this.resultat.nombreR, this.resultat.nombreA, this.resultat.nombreI
                        , this.resultat.nombreC, this.resultat.nombreO];
                      this.radarChartData[0].data = this.data;
                      this.list = [
                        {name: "a", value: this.resultat.nombreA},
                        {name: "c", value: this.resultat.nombreC},
                        {name: "o", value: this.resultat.nombreO},
                        {name: "i", value: this.resultat.nombreI},
                        {name: "p", value: this.resultat.nombreP},
                        {name: "r", value: this.resultat.nombreR}
                      ];
                      this.list.sort(function (a, b) {
                        return b.value - a.value;
                      });

                    }
                  );
                }

              }, error => {
                console.log(error);
              });
          }else {
            return null;
          }
        })

      });

      this.bndreamService.getQustionnaire1(this.qcm1Id).subscribe(
        data => {
          this.questionnaire1 = data;
        }
      );
      this.bndreamService.getQustionnaire2(this.qcm1Id).subscribe(
        data => {
          this.questionnaire2 = data;
        }
      );
      this.bndreamService.getQustionnaire3(this.qcm1Id).subscribe(
        data => {
          this.questionnaire2 = data;
        }
      );
      this.bndreamService.getQustionnaire4().subscribe(
        data => {
          this.qucm4 = data;
        }
      );
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


  qcmClientChoix(code1: string) {
    switch (code1) {
      case "a":{
        this.resultatPraico.nombreA=this.resultatPraico.nombreA+1;
        this.choixQcm();
        break;}
      case "c":{
        this.resultatPraico.nombreC=this.resultatPraico.nombreC+1;
        this.choixQcm();
        break;}
      case "i":{
        this.resultatPraico.nombreI=this.resultatPraico.nombreI+1;
        this.choixQcm();
        break;}
      case "o":{
        this.resultatPraico.nombreO=this.resultatPraico.nombreO+1;
        this.choixQcm();
        break;}
      case "p":{
        this.resultatPraico.nombreP=this.resultatPraico.nombreP+1;
        this.choixQcm();
        break;}
      case "r":{
        this.resultatPraico.nombreR=this.resultatPraico.nombreR+1;
        this.choixQcm();
        break;}
    }
  }
  choixQcm(){
    if (!this.qcm1Valide){
      this.qcm1ClientChoix()
    }
    if (this.qcm1Valide&&!this.qcm2Valide){
      this.qcm2ClientChoix()
    }

    if (this.qcm2Valide&&!this.qcm3Valide){
      this.qcm3ClientChoix()
    }

}


  qcm() {
    this.qcmRun=true;
  }

  qcm1ClientChoix(){
    if (this.qcm1Id < 30) {
      this.qcm1Id = this.qcm1Id + 1;
      this.bndreamService.getQustionnaire1(this.qcm1Id).subscribe(
        data => {
          this.questionnaire1 = data;
        });} else {
      this.savePreco();
    }

  }

    qcm2ClientChoix(){
  if (this.qcm1Id < 60) {
  this.qcm1Id = this.qcm1Id + 1;
  this.bndreamService.getQustionnaire2(this.qcm1Id).subscribe(
    data => {
  this.questionnaire2 = data;
});}else {
    this.savePreco();
  }
}
  qcm3ClientChoix(){
    if (this.qcm1Id < 60) {
      this.qcm1Id = this.qcm1Id + 1;
      this.bndreamService.getQustionnaire3(this.qcm1Id).subscribe(
        data => {
          this.questionnaire2 = data;
        });}else {
      this.savePreco();
    }
  }

  qcm4ClientChoix() {
    this.choix=this.split(this.choix1+","+this.choix2+","+this.choix3+","+this.choix4+","+this.choix5);

    for (let i = 0; i < this.choix.length; i++) {
      this.qcmClientChoix(this.choix[i]);
    }
    this.savePreco();
  }

  split(phrase:string){
    return phrase.split(",");
  }

  onChange(event: MatCheckboxChange) {

    if(event.checked){
      if (!this.choix5&&this.choix4&&this.choix3&&this.choix2&&this.choix1){
      this.choix5=event.source.value;
      this.id5=event.source.id;
      }
      if (!this.choix4&&this.choix3&&this.choix2&&this.choix1){
        this.choix4=event.source.value;
        this.id4=event.source.id;
       }
      if (!this.choix3&&this.choix2&&this.choix1){
        this.choix3=event.source.value;
        this.id3=event.source.id;
       }
      if (!this.choix2&&this.choix1){
        this.choix2=event.source.value;
        this.id2=event.source.id;
       }
      if (!this.choix1){
        this.choix1=event.source.value;
        this.id1=event.source.id;
        }
      this.selection=this.selection+1;
      this.initform.reset();
      if(this.selection==5){
        this.form.disable();
      }
    }
    if(!event.checked){
      if(event.source.id==this.id1){
        this.choix1=null;
        this.id1=null;
      }
      if(event.source.id==this.id2){
        this.choix2=null;
        this.id2=null;
      }
      if(event.source.id==this.id3){
        this.choix3=null;
        this.id3=null;
      }
      if(event.source.id==this.id4){
        this.choix4=null;
        this.id4=null;
      }
      if(event.source.id==this.id5){
        this.choix5=null;
        this.id5=null;
      }
      this.selection=this.selection-1;
    }
  }

  init() {
    this.selection=0;
    this.form.reset();
    this.form.enable();
    this.choix1=null;
    this.id1=null;
    this.choix2=null;
    this.id2=null;
    this.choix3=null;
    this.id3=null;
    this.choix4=null;
    this.id4=null;
    this.choix5=null;
    this.id5=null;
  }


savePreco(){
  this.resultatPraico.client=this.userId;
  this.bndreamService.savepraico(this.resultatPraico)
    .subscribe(res=>{
      if(!this.qcm1Valide){
        this.serviceClient.putQuestionnaires("qcm1");
        this.qcm1ValideLocal=true;
      }

      if(this.qcm1Valide&&!this.qcm2Valide){
        this.serviceClient.putQuestionnaires("qcm2");
        this.qcm2ValideLocal=true;

      }
      if(this.qcm2Valide&&!this.qcm3Valide){
        this.serviceClient.putQuestionnaires("qcm3");
        this.qcm3ValideLocal=true;

      }
      if(this.qcm3Valide&&!this.qcm4Valide){
        this.serviceClient.putQuestionnaires("qcm4");

      }

      this.router.navigate(['/bndream'], { fragment: 'haut' });
      this.qcm1Id=1;
      this.resultatPraico=new ResultatPraicoModel(0,0,0,0,0,0);

    }, error => {
      this.message = "l'enregistrement à échoué!";
      console.log(error)
    });
}

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
    scale:new class implements RadialLinearScale {
      ticks: Chart.LinearTickOptions= {
        suggestedMin:0,
        suggestedMax:30,
      };
    },
  };

  public radarChartLabels: Label[] = ["Pratique", "Réfléchi", "Actif","Inventif","Coopératif","Organisé "];

  public radarChartData: ChartDataSets[] = [
    { data: [0,0,0,0,0,0], label:'résultat' }

  ];
  public radarChartType: ChartType = 'radar';
  praico: string="assets/img/praico.jpg";
  globe: string="assets/img/globe.jpg";
  refexion: string="assets/img/reflexion.jpg";
  invention: string="assets/img/invention.jpg";
  cooperation: string="assets/img/cooperation.jpg";
  action: string="assets/img/action.jpg";
  organisation: string="assets/img/organisation.jpg";


  onSaveQcm4() {
    this.questionnaire4.metier=this.formQcm4.value.metier;
    this.questionnaire4.lettres.push(this.formQcm4.value.lettre1);
    this.questionnaire4.lettres.push(this.formQcm4.value.lettre2);
    this.questionnaire4.lettres.push(this.formQcm4.value.lettre3);
      this.bndreamService.saveQcm4(this.questionnaire4)
        .subscribe(res=>{
          this.questionnaire4=new Questionnaire4Model(0,[]);
          this.formQcm4.patchValue({
            lettre1:'',lettre2:'',lettre3:'',id:'',metier:''

          });

        }, error => {
          this.message = "l'enregistrement à échoué!";
          console.log(error)
        });
    }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream/praico'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/bndream/praico'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream/praico'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/bndream/praico'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false
      this.router.navigate(['/bndream/praico'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/bndream/praico'], { fragment: 'haut' });
    }
  }







}
