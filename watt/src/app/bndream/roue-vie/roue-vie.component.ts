import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../services/client.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {ChartType, ChartOptions, ChartDataSets} from 'chart.js';
import { Label } from 'ng2-charts';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChangeEvent} from "@ckeditor/ckeditor5-angular";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {RoueDeLaVieModel} from "../../model/roueDeLaVie.model";
import {AuthenticationService} from "../../services/authentication.service";
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";


@Component({
  selector: 'app-roue-vie',
  templateUrl: './roue-vie.component.html',
  styleUrls: ['./roue-vie.component.css']
})
export class RoueVieComponent implements OnInit {
  private subscription: Subscription;
  public clientConnect:boolean;

  constructor(private formBuilder: FormBuilder, private router:Router,private clientService:ClientService,
              private userConnect:AuthenticationService,private bndreamService:BndreamService,private route: ActivatedRoute) {

    if (userConnect.userAuthenticated){
    this.clientConnect=this.userConnect.isAuthenticated;
    this.userId=this.userConnect.userAuthenticated.id;}
  }

  public data: (any | number)[];
  public data1: (any | number)[];
  public data2: (any | number)[];
  public roue1Valide: boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public roueVie: boolean=false;
  public questionnaires:QuestionnairesModel;
  public photolangage:boolean=false;
  public personnelle:number=0;
  public sante:number=0;
  public famille:number=0;
  public professionne:number=0;
  public social:number=0;
  public formRoueDeLAvie:FormGroup;
  public newNumber:number;
  public roueVie1: boolean=false;
  public roueVie2: boolean=false;
  public guandhi: string="assets/img/gandhi.jpg";
  public roue: string="assets/img/roue.jpg";
  public Editor = ClassicEditor;
  roueVieStart:boolean=false;
  public  roueDeLaVie=new RoueDeLaVieModel();
  public userId:number;
  message: string="";
  public modifier: boolean=false;
  public arret:  boolean=false;
  public   prioriser: boolean=false;
  public fragment: string;
  public texte1Valide:boolean=false;
  public texte2Valide:boolean=false;
  public texte3Valide:boolean=false;
  public ListQuestionnaire:any[];

  onSaveRoueDeLAvie() {

  }
  get f() { return this.formRoueDeLAvie.controls;
  }

  ngOnInit(): void {
    if (this.clientConnect) {

      this.clientService.getQuestionnairesAll().subscribe(list => {
        this.ListQuestionnaire = list;
        this.ListQuestionnaire.forEach(questionnaireUser => {
          if (questionnaireUser.user.id == this.userConnect.userAuthenticated.id) {
      this.clientService.getQuestionnaires()
        .subscribe(data => {
          this.questionnaires = data;
          this.roueVie = this.questionnaires.roueVie;
          this.photolangage = this.questionnaires.photoLangage;


          if (this.roueVie) {
            this.bndreamService.getResultRoueDeLaVie().subscribe(
              data => {
                this.roueDeLaVie = data;
                this.data1 = [this.roueDeLaVie.personnelle1, this.roueDeLaVie.sante1, this.roueDeLaVie.famille1
                  , this.roueDeLaVie.professionnel1, this.roueDeLaVie.social1];
                this.pieChartData1[0].data = this.data1;
                this.data2 = [this.roueDeLaVie.personnelle2, this.roueDeLaVie.sante2, this.roueDeLaVie.famille2
                  , this.roueDeLaVie.professionnel2, this.roueDeLaVie.social2];
                this.pieChartData2[0].data = this.data2;
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

      this.formRoueDeLAvie = this.formBuilder.group({
        personnelle: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        sante: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        famille: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        social1: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        professionne: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        personnelle2: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        sante2: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        famille2: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        social2: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
        professionne2: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
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

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {

    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = ['La vie personnelle','La santé ', 'La famille ', 'Le professionnel ', 'Le social '];
  public pieChartData: ChartDataSets[] = [{data:[1,1,1,1,1]}];
  public pieChartData1: ChartDataSets[]=[{data:[]}];
  public pieChartData2: ChartDataSets[]=[{data:[]}];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins ;
  public pieChartColors = [
    {
      backgroundColor: [ 'rgba(193, 28, 199, 1)',
        'rgba(29, 4, 255,1)',
        'rgba(25,193 ,13, 1)',
        'rgba(255, 213, 4, 1)',
        'rgba(255, 4, 4, 1)',],
    },
  ];
  public contexteValide:boolean=false;


  onChange(categorie:string,value):void  {

    switch (categorie) {
      case "personnelle":
        this.personnelle=value;
        break;
      case "sante":
        this.sante=value;
        break;
      case "famille":
        this.famille=value;
        break;
      case "professionne":
        this.professionne=value;
        break;
      case "social":
        this.social=value;
        break;
    }
    this.data = [
      this.personnelle,this.sante,this.famille,this.professionne,this.social];
    this.pieChartData[0].data=this.data;

  }

  init() {

    if (this.formRoueDeLAvie.controls.sante.status=="VALID"&&this.formRoueDeLAvie.controls.personnelle.status=="VALID"
      &&this.formRoueDeLAvie.controls.famille.status=="VALID"&&this.formRoueDeLAvie.controls.social1.status=="VALID"&&
      this.formRoueDeLAvie.controls.professionne.status=="VALID"){
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'rouedelavie2' });
      this.roue1Valide=true;
      this.data  = [1,1,1,1,1];
      this.pieChartData[0].data=this.data;
      this.roueVie1=true;
      return this.message="";

    }else {
      return this.message="Formulaire invalide";}

  }

  onChange3({ editor }: ChangeEvent,theme:string) {
    switch (theme) {
      case "modifier":
        this.roueDeLaVie.qcm1=editor.getData();
        break;
      case "arret":
        this.roueDeLaVie.qcm2=editor.getData();
        break;
      case "prioriser":
        this.roueDeLaVie.qcm3=editor.getData();
        break;
      default:
        return null;
    }
  }

  roueDeLaVie2() {

    if (this.formRoueDeLAvie.controls.sante2.status=="VALID"&&this.formRoueDeLAvie.controls.personnelle2.status=="VALID"
      &&this.formRoueDeLAvie.controls.famille2.status=="VALID"&&this.formRoueDeLAvie.controls.social2.status=="VALID"&&
      this.formRoueDeLAvie.controls.professionne2.status=="VALID"){
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'Autodiagnostic' });
      this.roueVie2=true;
      return this.message="";
    }else {
      return this.message="Formulaire invalide";}

  }

  editor(theme:string) {
    switch (theme) {
      case "modifier":
        this.modifier=true;
        break;
      case "arret":
        this.arret=true;
        break;
      default:
        return null;
    }

  }


  rouedelavieStart() {
    this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'haut' });
    this.roueVieStart=true;
    this.contexteValide=false;
    this.objectifValide=false;
    this.processValide=false;

  }

  contexte() {
    this.objectifValide=false;
    this.processValide=false;
    if(!this.contexteValide){
      this.contexteValide=true;
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'haut' });
    }
  }

  objectif() {
    this.contexteValide=false;
    this.processValide=false;
    if(!this.objectifValide){
      this.objectifValide=true;
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'haut' });

    }
  }
  process() {
    this.contexteValide=false;
    this.objectifValide=false;
    if(!this.processValide){
      this.processValide=true;
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'haut' });
    }
  }

  pegeHaut() {
    this.router.navigate(['/bndream/roue-de-la-vie'], { fragment: 'haut' });
  }

  getTexte1(event: string) {
    this.roueDeLaVie.qcm1=event;
    this.texte1Valide=true;
  }

  getTexte2(event: string) {
    this.roueDeLaVie.qcm2=event;
    this.texte2Valide=true;
  }
  getTexte3(event: string) {
    this.roueDeLaVie.qcm3 = event;
    this.roueDeLaVie.famille1 = this.formRoueDeLAvie.value.famille;
    this.roueDeLaVie.famille2 = this.formRoueDeLAvie.value.famille2;
    this.roueDeLaVie.personnelle1 = this.formRoueDeLAvie.value.personnelle;
    this.roueDeLaVie.personnelle2 = this.formRoueDeLAvie.value.personnelle2;
    this.roueDeLaVie.professionnel1 = this.formRoueDeLAvie.value.professionne;
    this.roueDeLaVie.professionnel2 = this.formRoueDeLAvie.value.professionne2;
    this.roueDeLaVie.sante1 = this.formRoueDeLAvie.value.sante;
    this.roueDeLaVie.sante2 = this.formRoueDeLAvie.value.sante2;
    this.roueDeLaVie.social1 = this.formRoueDeLAvie.value.social1;
    this.roueDeLaVie.social2 = this.formRoueDeLAvie.value.social2;
    this.roueDeLaVie.client = this.userId;
    this.questionnaires.roueVie = true;

    this.bndreamService.saveRoueDeLaVie( this.roueDeLaVie)
      .subscribe(res => {
        this.clientService.putQuestionnaires("roueDeLaVie");
        this.prioriser = true;
        this.texte3Valide = true;
        this.router.navigateByUrl("/bndream");

      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })
  }

}
