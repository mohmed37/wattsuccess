import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {BndreamService} from "../../services/bndream.service";
import {TexteModel} from "../../model/texte.model";
import {FicheMetierService} from "../../services/fiche-metier.service";
import {FicheMetier} from "../../model/ficheMetier.model";
import {Bnbecome} from "../../services/bnbecome.service";
import {ApiService} from "../../services/api.service";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-fiche-metier',
  templateUrl: './fiche-metier.component.html',
  styleUrls: ['./fiche-metier.component.css']
})
export class FicheMetierComponent implements OnInit {

  imageId: number;
  retrieveResonse: any;
  base64Data: any;
  retrievedImageFicheMetier: any;
  retrievedImage: any;
  public allPhotoFicheMetier=[];
  public photoFicheMetier=[];
  public FicheMetier:FicheMetier;
  public idFicheMetier: number;
  public metier: string;
  public competence:string;
  public competences:string[];
  public  qualite:string;
  public qualites:string[];
  public texte:string;
  public code:string;
  public newTexte=new TexteModel();
  public ListQuestionnaire:any[];
  public listImage=[];

  constructor(private httpClient: HttpClient, private router: Router,private serviceBnDream:BndreamService,
              private ficheMetierService:FicheMetierService,private hostTestService:ApiService ,private route: ActivatedRoute) {
      }
  @Output() public pick:EventEmitter<number>=new EventEmitter<number>();
  public idCarrousel:number=1;
  public photoCarrousel: any;
  public listImageFicheMetier=[];
  public metierDico:string;
  public selectFicheMetierValide: boolean;
  public selecMetier: boolean;
  public listMetierDico=[];
  public ficheCaroussel:FicheMetier[];
  public fichedetail: boolean;
  public fragment: string;
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;

  ngOnInit(): void {

    this.getAllFicheMetier();

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



  getImageFicheMeier(idCarrousel) {
    this.ficheMetierService.ficheMetierByImage(idCarrousel)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.photoCarrousel = 'data:image/jpeg;base64,' + this.base64Data;

          this.listImage.push({photo:this.photoCarrousel,metier:this.retrieveResonse.name,id:idCarrousel});
          this.metierDico=this.retrieveResonse.name;        }

      );

  }
  getAllFicheMetier() {
    this.ficheMetierService.ficheMetierAll()
      .subscribe(
        res => {
          this.allPhotoFicheMetier=res;
          this.allPhotoFicheMetier.forEach(photoFicheMetier=>{
            this.getImageFicheMeier(photoFicheMetier.id);

          });


          this.page("=");
        }
      );
  }
  getFicheMetier() {

    this.ficheMetierService.ficheMetier(this.idFicheMetier)
      .subscribe(
        res => {
          this.FicheMetier=res;
          this.metier=this.FicheMetier.metier;
          this.competence=this.FicheMetier.competence;

          this.competences=this.split(this.competence);
          console.log(this.competences);
          this.code=this.FicheMetier.code;
          this.qualite=this.FicheMetier.qualite;
          this.qualites=this.split(this.qualite);
          this.texte=this.FicheMetier.texte;
          this.getImageFicheMeier(this.FicheMetier.photo.id)
        }
      );
  }
split(phrase:string){

  return phrase.split("-");

}


  page(s: string) {
    this.selecMetier=false;
    this.fichedetail=false;
    this.selectFicheMetierValide=false;
    if (s=='+'&&this.idCarrousel<this.allPhotoFicheMetier.length-1){
      this.idCarrousel=this.idCarrousel+1;
      this.getImageFicheMeier(this.idCarrousel);
    }
    if (s=='-'&&this.idCarrousel>0){
      this.idCarrousel=this.idCarrousel-1;
      this.getImageFicheMeier(this.idCarrousel);
    }else {
      this.getImageFicheMeier(this.idCarrousel);
    }
  }

  clic(idCarrousel: number) {
    this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'select' });
    this.ficheMetierService.ficheMetierByPhotoId(idCarrousel)
      .subscribe(
        res => {
          this.ficheCaroussel=res;
          this.selecMetier=true;

        });

  }

  selectFicheMetier(id: any) {
    this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: '' });
    this.ficheMetierService.ficheMetier(id)
      .subscribe(
        res => {
          this.FicheMetier=res;
          this.competences=this.split(this.FicheMetier.competence);
          this.qualites=this.split(this.FicheMetier.qualite);
          this.fichedetail=true;
          this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'ficheMetier' });
        })
  }

  close() {
    this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: '' });
    this.selecMetier=false;

  }
  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false;
      this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/gonBelieve/fichesMetiers'], { fragment: 'haut' });
    }
  }
}

