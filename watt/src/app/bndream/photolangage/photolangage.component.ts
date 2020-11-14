import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BndreamService} from "../../services/bndream.service";
import {HttpClient} from "@angular/common/http";
import { FormControl, FormGroup,Validators } from '@angular/forms';
import {PhotoLangageModel} from "../../model/photoLangage.model";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {AuthenticationService} from "../../services/authentication.service";
import {TexteModel} from "../../model/texte.model";

@Component({
  selector: 'app-photolangage',
  templateUrl: './photolangage.component.html',
  styleUrls: ['./photolangage.component.css']
})
export class PhotolangageComponent implements OnInit {


  public retrieveResonseAll: any;
  public dedutTestPhotolangage: boolean=false;
  public currentClient:any;
  private fragment: string;
  public newTexte=new TexteModel();
  public ListQuestionnaire:any[];

  constructor(private bndreamService:BndreamService, private router:Router,private httpClient: HttpClient
              ,private serviceClient:ClientService, private userConnect:AuthenticationService,private route: ActivatedRoute) {
    if (userConnect.userAuthenticated){
    this.userId=this.userConnect.userAuthenticated.id;}

  }

  public userId:number;

  base64Data: any;
  message: string;
  public photos:any;
  public size:number=4;
  public currentPage:number=0;
  public  totalPage:number;
  public  pages:Array<number>;
  imageId1:number=1;
  imageId2:number=2;
  imageId3:number=3;
  imageId4:number=4;
  imageId5:number=5;
  public idPhoto:Array<number>;
  retrieveResonse1: any;
  retrieveResonse2: any;
  retrieveResonse3: any;
  retrieveResonse4: any;
  retrieveResonse5: any;
  retrievedImage1: any;
  retrievedImage2: any;
  retrievedImage3: any;
  retrievedImage4: any;
  retrievedImage5: any;
  retrievedImageClient1:any=null;
  retrievedImageClient2:any=null;
  retrievedImageClient3:any=null;
  retrieveResonseChoix:any=null;
  mot1:boolean=false;
  mot2:boolean=false;
  mot3:boolean=false;
  partie1:boolean=false;
  partie2:boolean=false;
  partie3:boolean=false ;
  public formPhotoLangage: FormGroup;
  retrievedImageClient4:any=null;
  retrievedImageClient5:any=null;
  retrievedImageClient6:any=null;
  mot4:boolean=false;
  mot5: boolean=false;
  mot6: boolean=false;
  idImageSelect:any;
  public photoLangage=new PhotoLangageModel();
  public questionnaires=new QuestionnairesModel() ;
  public Editor = ClassicEditor;
  public resultPhotoLangage:PhotoLangageModel;
  public listPhoto=[];
  public photolangageValide:boolean=false;
  public choixMot1:string;
  public choixMot2:string;
  public choixMot3:string;
  public choixMot4:string;
  public choixMot5:string;
  public choixMot6:string;
  public texte:string;
  public questionnaires2:QuestionnairesModel;
  photoInterog:string="assets/img/intero.jpg";
  photoObjectif:string="assets/img/objectif.jpg";
  photoLangage1:string="assets/img/photoLangage1.jpg";
  photoLangage2:string="assets/img/photoLangage2.jpg";
  photoLangage3:string="assets/img/photoLangage3.jpg";
  photoLangage4:string="assets/img/photoLangage4.jpg";
  photoLangage5:string="assets/img/photoLangage5.jpg";
  photoLangage6:string="assets/img/photoLangage6.jpg";
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;
  public userAuthent:boolean;
  public clientConnect:boolean;

  ngOnInit(): void {
    this.clientConnect=this.userConnect.isAuthenticated;

    this.formPhotoLangage=new FormGroup({
      mot1:new FormControl('',Validators.required),
      mot2:new FormControl('',Validators.required),
      mot3:new FormControl('',Validators.required),
      mot4:new FormControl('',Validators.required),
      mot5:new FormControl('',Validators.required),
      mot6:new FormControl('',Validators.required)

    });

    if (this.clientConnect){
      this.currentClient=this.serviceClient.getClientBy(this.userId);

      this.serviceClient.getQuestionnairesAll().subscribe(list => {
        this.ListQuestionnaire = list;
        this.ListQuestionnaire.forEach(questionnaireUser => {
          if (questionnaireUser.user.id == this.userConnect.userAuthenticated.id) {
            this.serviceClient. getQuestionnaires()
              .subscribe(data=>{
                this.questionnaires2=data;
                this.photolangageValide=this.questionnaires2.photoLangage;
                if (this.photolangageValide){
                this.bndreamService.getResultPhotoLangage()
                  .subscribe(data=>{
                    this.resultPhotoLangage=data;
                    this.listPhoto.push(this.resultPhotoLangage.photo1);
                    this.listPhoto.push(this.resultPhotoLangage.photo2);
                    this.listPhoto.push(this.resultPhotoLangage.photo3);
                    this.listPhoto.push(this.resultPhotoLangage.photo4);
                    this.listPhoto.push(this.resultPhotoLangage.photo5);
                    this.listPhoto.push(this.resultPhotoLangage.photo6);
                    this.choixMot1=this.resultPhotoLangage.mot1;
                    this.choixMot2=this.resultPhotoLangage.mot2;
                    this.choixMot3=this.resultPhotoLangage.mot3;
                    this.choixMot4=this.resultPhotoLangage.mot4;
                    this.choixMot5=this.resultPhotoLangage.mot5;
                    this.choixMot6=this.resultPhotoLangage.mot6;
                    this.texte=this.resultPhotoLangage.expression;

                    for (let i = 0; i < this.listPhoto.length; i++){
                      this.photoClientChoix(this.listPhoto[i],i+1)
                    }
                  },error => {
                    console.log(error);
                  } );}


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


  getImageList(number: number) {
    switch (number) {
      case 1:
        this.imageId1 =this.imageId1+5 ;
        this.imageId2=this.imageId2+5 ;
        this.imageId3=this.imageId3+5 ;
        this.imageId4=this.imageId4+5 ;
        this.imageId5=this.imageId5+5 ;
        break;
      case 0:
        this.imageId1=this.imageId1-5 ;
        this.imageId2=this.imageId2-5 ;
        this.imageId3=this.imageId3-5 ;
        this.imageId4=this.imageId4-5 ;
        this.imageId5=this.imageId5-5 ;
        break;
      default:
        this.imageId1=1;
        this.imageId2=2;
        this.imageId3=3;
        this.imageId4=4;
        this.imageId5=5;
    }
    this.idPhoto=new Array<number>( this.imageId1,this.imageId2,this.imageId3,this.imageId4,this.imageId5);
    this.bndreamService.getImageList(this.idPhoto)
      .subscribe(
        res => {
          this.retrieveResonse1 = res[0];
          this.base64Data = this.retrieveResonse1.picByte;
          this.retrievedImage1 = 'data:image/jpeg;base64,' + this.base64Data;
          this.retrieveResonse2 = res[1];
          this.base64Data = this.retrieveResonse2.picByte;
          this.retrievedImage2 = 'data:image/jpeg;base64,' + this.base64Data;
          this.retrieveResonse3 = res[2];
          this.base64Data = this.retrieveResonse3.picByte;
          this.retrievedImage3= 'data:image/jpeg;base64,' + this.base64Data;
          this.retrieveResonse4  = res[3];
          this.base64Data = this.retrieveResonse4.picByte;
          this.retrievedImage4 = 'data:image/jpeg;base64,' + this.base64Data;
          this.retrieveResonse5 = res[4];
          this.base64Data = this.retrieveResonse5.picByte;
          this.retrievedImage5 = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }



  testPhotolangage() {
    this.router.navigate(['/bndream/photolangage'], { fragment: 'haut' });
    this.contexteValide=false;
    this.objectifValide=false;
    this.processValide=false;

    this.serviceClient. SaveQuestionnaires(this.questionnaires)
      .subscribe(data=>{
        this.dedutTestPhotolangage=true;
      },error => {
        console.log(error);
      });

  }

  imageClientChoix(imageId: number) {

    this.bndreamService.imageClientChoix(imageId)
      .subscribe(
        res => {
          this.retrieveResonseChoix = res;
          this.base64Data = this.retrieveResonseChoix.picByte;
          this.idImageSelect=this.retrieveResonseChoix.name;

          if (this.partie1==false){
            if(this.retrievedImageClient3==null&&this.retrievedImageClient2!=null){
              this.retrievedImageClient3 = 'data:image/jpeg;base64,' + this.base64Data;
              this.photoLangage.photo3=this.idImageSelect;
              this.mot3=true;}
            if(this.retrievedImageClient2==null&&this.retrievedImageClient1 != null){
              this.retrievedImageClient2 = 'data:image/jpeg;base64,' + this.base64Data;
              this.photoLangage.photo2=this.idImageSelect;
              this.mot2=true; }
            if(this.retrievedImageClient1 == null){
              this.retrievedImageClient1 = 'data:image/jpeg;base64,' + this.base64Data;
              this.photoLangage.photo1=this.idImageSelect;
              this.mot1=true;}}
          if (this.partie1==true){
            if(this.retrievedImageClient6==null&&this.retrievedImageClient5!=null){
              this.retrievedImageClient6 = 'data:image/jpeg;base64,' + this.base64Data;
              this.photoLangage.photo6=this.idImageSelect;
              this.mot6=true;}
            if(this.retrievedImageClient5==null&&this.retrievedImageClient4 != null){
              this.retrievedImageClient5 = 'data:image/jpeg;base64,' + this.base64Data;
              this.photoLangage.photo5=this.idImageSelect;
              this.mot5=true; }
            if(this.retrievedImageClient4 == null){
              this.retrievedImageClient4 = 'data:image/jpeg;base64,' + this.base64Data;
              this.photoLangage.photo4=this.idImageSelect;
              this.mot4=true;}}
        }
      );}

  photoClientChoix(imageId: string, numberPhoto: number) {

    this.bndreamService.photoClientChoix(imageId)
      .subscribe(
        res => {
          this.retrieveResonseChoix = res;
          this.base64Data = this.retrieveResonseChoix.picByte;
          this.idImageSelect=this.retrieveResonseChoix.name;

          if (numberPhoto==3){
              this.retrievedImageClient3 = 'data:image/jpeg;base64,' + this.base64Data;
             }
            if(numberPhoto==2){
              this.retrievedImageClient2 = 'data:image/jpeg;base64,' + this.base64Data;
             }
            if(numberPhoto==1){
              this.retrievedImageClient1 = 'data:image/jpeg;base64,' + this.base64Data;
             }
            if(numberPhoto==6){
              this.retrievedImageClient6 = 'data:image/jpeg;base64,' + this.base64Data;
             }
            if(numberPhoto==5){
              this.retrievedImageClient5 = 'data:image/jpeg;base64,' + this.base64Data;
              }
            if(numberPhoto==4){
              this.retrievedImageClient4 = 'data:image/jpeg;base64,' + this.base64Data;
              }
        }
      );}


  imageDeleteChoix(imageId: number) {
    if (imageId==1){
      this.retrievedImageClient1 = null;
      this.mot1=false;
      this.formPhotoLangage.patchValue({
        mot1:'',
      });
    }
    if (imageId==2){
      this.retrievedImageClient2 = null;
      this.mot2=false;
      this.formPhotoLangage.patchValue({
        mot2:'',
      });
    }
    if (imageId==3){
      this.retrievedImageClient3 = null;
      this.mot3=false;
      this.formPhotoLangage.patchValue({
        mot3:'',
      });
    }
    if (imageId==4){
      this.retrievedImageClient4 = null;
      this.mot4=false;
      this.formPhotoLangage.patchValue({
        mot4:'',
      });
    }
    if (imageId==5){
      this.retrievedImageClient5 = null;
      this.mot5=false;
      this.formPhotoLangage.patchValue({
        mot5:'',
      });
    }
    if (imageId==6){
      this.retrievedImageClient6 = null;
      this.mot6=false;
      this.formPhotoLangage.patchValue({
        mot6:'',
      });
    }
  }

  validePartie1() {
    this.partie1=true;
    this.router.navigate(['/bndream/photolangage'], { fragment: 'partie2' });
  }
  validePartie2() {
    this.partie2=true;
  }

  contexte() {
    this.objectifValide=false;
    this.processValide=false;
    if(!this.contexteValide){
      this.contexteValide=true;
      this.router.navigate(['/bndream/photolangage'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/bndream/photolangage'], { fragment: 'haut' });
    }
  }

  objectif() {
    this.contexteValide=false;
    this.processValide=false;
    if(!this.objectifValide){
      this.objectifValide=true;
      this.router.navigate(['/bndream/photolangage'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/bndream/photolangage'], { fragment: 'haut' });

    }
  }
  process() {
    this.contexteValide=false;
    this.objectifValide=false;
    if(!this.processValide){
      this.processValide=true;
      this.router.navigate(['/bndream/photolangage'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/bndream/photolangage'], { fragment: 'haut' });
    }
  }


  getTexte(event: string) {
    this.photoLangage.expression=event;
    this.photoLangage.mot1=this.formPhotoLangage.value.mot1;
    this.photoLangage.mot2=this.formPhotoLangage.value.mot2;
    this.photoLangage.mot3=this.formPhotoLangage.value.mot3;
    this.photoLangage.mot4=this.formPhotoLangage.value.mot4;
    this.photoLangage.mot5=this.formPhotoLangage.value.mot5;
    this.photoLangage.mot6=this.formPhotoLangage.value.mot6;
    this.photoLangage.client=this.userId;
    this.questionnaires.photoLangage=true;
    this.bndreamService.savePhotLangage(this.photoLangage)
      .subscribe(res=>{
        this.serviceClient.putQuestionnaires("photolangage");
        this.router.navigateByUrl("/bndream");

      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })


  }
}

