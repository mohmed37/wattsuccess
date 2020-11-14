import { Component, OnInit } from '@angular/core';
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ChoixAutoPortraitModel} from "../../model/choixAutoPortrait.model";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {TexteModel} from "../../model/texte.model";
import {ApiService} from "../../services/api.service";

@Component({
  selector: 'app-autoportrait',
  templateUrl: './autoportrait.component.html',
  styleUrls: ['./autoportrait.component.css']
})
export class AutoportraitComponent implements OnInit {
  traitId1: number=1;
  traitId2: number=2;
  traitId3: number=3;
  traitId4: number=4;
  traitId5: number=5;
  public idTrait:Array<number>;
  public retrieveResonse1:any;
  public retrieveResonse2:any;
  public retrieveResonse3:any;
  public retrieveResonse4:any;
  public retrieveResonse5:any;
  public autoPortrait1:string;
  public autoPortrait2:string;
  public autoPortrait3:string;
  public autoPortrait4:string;
  public autoPortrait5:string;
  public iDautoPortrait1:number;
  public iDautoPortrait2:number;
  public iDautoPortrait3:number;
  public iDautoPortrait4:number;
  public iDautoPortrait5:number;
  public retrieveResonseChoix:any=null;
  public message: string;
  public questionnaires=new QuestionnairesModel() ;
  public questionnaires2:QuestionnairesModel;
  public choixList1:number=0;
  public choixList2:number=0;
  public resultAutoPortrait=new ChoixAutoPortraitModel(["?","?","?","?","?"],["?","?","?","?","?"],
    "<ol ><li>- - - - - - - - - - - - - - .</li>"+
    "<li>- - - - - - - - - - - - - - .</li>"+
    "<li>- - - - - - - - - - - - - - .</li></ol>");
  public list1: boolean=false;
  public list2: boolean=false;
  public Editor = ClassicEditor;
  public photo:string="assets/img/autoPortrait.jpg";
  public photo2:string="assets/img/autoPortrait2.jpg";
  public contexteImg:string="assets/img/contexte.jpg";
  public objectifImg:string="assets/img/objectuf.jpg";
  public processImg:string="assets/img/consigne.jpg";
  public userId: number | any;
  public saveAutoPortrait: boolean=false;
  public testAutoPortrait: boolean=false;
  public roueDeLaVieValide: boolean=false;
  public autoPortraitValide: boolean=false;
  private dicoMetierValide: boolean=false;
  public fragment: string;
  public newTexte=new TexteModel();
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;



  constructor(private bndreamService:BndreamService, private router:Router,private httpClient: HttpClient,
              private serviceClient:ClientService, private userConnect:AuthenticationService,private route: ActivatedRoute,private hostTestService:ApiService) {

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
          this.roueDeLaVieValide = this.questionnaires2.roueVie;
          this.autoPortraitValide = this.questionnaires2.autoPortrait;

          if (this.autoPortraitValide) {
            this.bndreamService.getResultAutoPortrait().subscribe(
              data => {
                this.resultAutoPortrait = data;
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
      this.getTraitList(2);
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




  clicTestAutoPortrait(){
    this.testAutoPortrait=true;
  }


  getTraitList(number: number) {
    switch (number) {
      case 1:
        this.traitId1 =this.traitId1+5 ;
        this.traitId2=this.traitId2+5 ;
        this.traitId3=this.traitId3+5 ;
        this.traitId4=this.traitId4+5 ;
        this.traitId5=this.traitId5+5 ;
        break;
      case 0:
        this.traitId1=this.traitId1-5 ;
        this.traitId2=this.traitId2-5 ;
        this.traitId3=this.traitId3-5 ;
        this.traitId4=this.traitId4-5 ;
        this.traitId5=this.traitId5-5 ;
        break;
      default:
        this.traitId1=1;
        this.traitId2=2;
        this.traitId3=3;
        this.traitId4=4;
        this.traitId5=5;
    }
    this.idTrait=new Array<number>( this.traitId1,this.traitId2,this.traitId3,this.traitId4,this.traitId5);
    this.bndreamService.getTraitList(this.idTrait)
      .subscribe(
        res => {
          this.retrieveResonse1 = res[0];
          this.autoPortrait1=this.retrieveResonse1.personnalite;
          this.iDautoPortrait1=this.retrieveResonse1.id;
          this.retrieveResonse2 = res[1];
          this.autoPortrait2=this.retrieveResonse2.personnalite;
          this.iDautoPortrait2=this.retrieveResonse2.id;
          this.retrieveResonse3 = res[2];
          this.autoPortrait3=this.retrieveResonse3.personnalite;
          this.iDautoPortrait3=this.retrieveResonse3.id;
          this.retrieveResonse4  = res[3];
          this.autoPortrait4=this.retrieveResonse4.personnalite;
          this.iDautoPortrait4=this.retrieveResonse4.id;
          this.retrieveResonse5 = res[4];
          this.autoPortrait5=this.retrieveResonse5.personnalite;
          this.iDautoPortrait5=this.retrieveResonse5.id;
        }
      );
  }


  autoPortraitClientChoix(autoPortrait: string) {
    if(this.resultAutoPortrait.list1[0]=="?"){
      this.resultAutoPortrait.list1[0]=autoPortrait;
      this.choixList1=this.choixList1+1;
      return null;
    }
    if(this.resultAutoPortrait.list1[1]=="?"){
      this.resultAutoPortrait.list1[1]=autoPortrait;
      this.choixList1=this.choixList1+1;
      return null;
    }
    if(this.resultAutoPortrait.list1[2]=="?"){
      this.resultAutoPortrait.list1[2]=autoPortrait;
      this.choixList1=this.choixList1+1;
      return null;
    }
    if(this.resultAutoPortrait.list1[3]=="?"){
      this.resultAutoPortrait.list1[3]=autoPortrait;
      this.choixList1=this.choixList1+1;
      return null;
    }
    if(this.resultAutoPortrait.list1[4]=="?"){
      this.resultAutoPortrait.list1[4]=autoPortrait;
      this.choixList1=this.choixList1+1;
      return null;
    }
    if(this.resultAutoPortrait.list2[0]=="?"&&this.list1){
      this.resultAutoPortrait.list2[0]=autoPortrait;
      this.choixList2=this.choixList2+1;
      return null;
    }
    if(this.resultAutoPortrait.list2[1]=="?"&&this.list1){
      this.resultAutoPortrait.list2[1]=autoPortrait;
      this.choixList2=this.choixList2+1;
      return null;
    }
    if(this.resultAutoPortrait.list2[2]=="?"&&this.list1){
      this.resultAutoPortrait.list2[2]=autoPortrait;
      this.choixList2=this.choixList2+1;
      return null;
    }
    if(this.resultAutoPortrait.list2[3]=="?"&&this.list1){
      this.resultAutoPortrait.list2[3]=autoPortrait;
      this.choixList2=this.choixList2+1;
      return null;
    }
    if(this.resultAutoPortrait.list2[4]=="?"&&this.list1){
      this.resultAutoPortrait.list2[4]=autoPortrait;
      this.choixList2=this.choixList2+1;
      return null;
    }


  }

  resultList(list:string) {
    if(list=="list1"){
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'etape2' });
    this.list1=true;}
    if(list=="list2"){
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'constat' });
      this.list2 =true;}
  }


  delete(position: number, list: number) {

    if (list==1){
      if( this.resultAutoPortrait.list1[position]!="?"){
      this.resultAutoPortrait.list1[position]="?";
      this.choixList1=this.choixList1-1;}
    }
    if (list==2){
      if( this.resultAutoPortrait.list2[position]!="?"){
      this.resultAutoPortrait.list2[position]="?";
      this.choixList2=this.choixList2-1;}
    }

  }

  save(event: string) {
    this.resultAutoPortrait.reflexion=event;
    this.resultAutoPortrait.client=this.userId;
    this.questionnaires.photoLangage=true;

    this.bndreamService.saveAutoPortrait(this.resultAutoPortrait)
      .subscribe(res=>{
        this.serviceClient.putQuestionnaires("autoPortrait");
        this.router.navigateByUrl("/bndream");
        this.saveAutoPortrait=true;

      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })
  }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/bndream/autoPortrait'], { fragment: 'haut' });
    }
  }


}
