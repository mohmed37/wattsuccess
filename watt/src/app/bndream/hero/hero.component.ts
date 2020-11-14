import { Component, OnInit } from '@angular/core';
import {BndreamService} from "../../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {QuestionnairesModel} from "../../model/questionnaires.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListHeroModel} from "../../model/listHero.model";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ResultatHeroModel} from "../../model/resultatHero.model";




@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {
  public userId: number | any;
  public questionnaires: QuestionnairesModel;
  public listValeurHero: ListHeroModel[];
  public qcm4Valide: boolean = false;
  public heroValide: boolean = false;
  public photoHero: string = "assets/img/hero.jpg";
  public form = new FormControl(false, Validators.required);
  formHero: FormGroup;
  listValeurClient: string[] = [];
  public resultatHero=new ResultatHeroModel();

  message: string;
  public hero: boolean=false;
  public fragment: string;
  public nbValeur:number=0;
  public ListQuestionnaire:any[];
  public clientConnect:boolean;
  public contexteValide:boolean=false;
  public objectifValide: boolean=false;
  public processValide: boolean=false;


  constructor(private bndreamService: BndreamService, private router: Router, private httpClient: HttpClient,
              private serviceClient: ClientService, private userConnect: AuthenticationService,private route: ActivatedRoute) {
    if (userConnect.userAuthenticated){
    this.clientConnect=this.userConnect.isAuthenticated;
    this.userId = this.userConnect.userAuthenticated.id;}
  }


  ngOnInit(): void {
    if (this.clientConnect) {

      this.fragment = "haut";
      this.formHero = new FormGroup({
        hero: new FormControl('', Validators.required),
      });

      this.serviceClient.getQuestionnairesAll().subscribe(list => {
        this.ListQuestionnaire = list;
        this.ListQuestionnaire.forEach(questionnaireUser => {
          if (questionnaireUser.user.id == this.userConnect.userAuthenticated.id) {
            this.serviceClient.getQuestionnaires()
              .subscribe(data => {
                this.questionnaires = data;
                this.qcm4Valide = this.questionnaires.qcm4;
                this.heroValide = this.questionnaires.hero;

                if (this.heroValide) {
                  this.bndreamService.getResultHero().subscribe(
                    data => {
                      this.resultatHero = data;
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
      this.bndreamService.getListHero()
        .subscribe(data => {
          this.listValeurHero = data;
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

  onChange(event: MatCheckboxChange) {
    if (event.source.checked) {
      this.nbValeur=this.nbValeur+1;
      this.listValeurClient.push(event.source.value);
    }
    if (!event.source.checked) {
      this.nbValeur=this.nbValeur-1;
      for (let i = 0; i < this.listValeurClient.length; i++) {
        if (this.listValeurClient[i] == event.source.value) {
          this.listValeurClient = this.listValeurClient.filter(item => item !== event.source.value);
        }
      }
    }
  }

  saveHero() {
    this.resultatHero.valeur=this.listValeurClient;
    this.resultatHero.choixHero=this.formHero.value.hero;
    this.resultatHero.client=this.userId;
    this.bndreamService.saveHero(this.resultatHero)
      .subscribe(res=>{
        this.serviceClient.putQuestionnaires("hero");
        this.router.navigateByUrl("/bndream");

      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      });
  }

  heroStart() {
    this.hero=true;
  }

  contexte() {
    if(!this.contexteValide){
      this.contexteValide=true;
      this.objectifValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream/heros'], { fragment: 'contexte' });
    }else {
      this.contexteValide=false;
      this.router.navigate(['/bndream/heros'], { fragment: 'haut' });
    }
  }

  objectif() {
    if(!this.objectifValide){
      this.objectifValide=true;
      this.contexteValide=false;
      this.processValide=false;
      this.router.navigate(['/bndream/heros'], { fragment: 'objectif' });
    }else {
      this.objectifValide=false;
      this.router.navigate(['/bndream/heros'], { fragment: 'haut' });

    }
  }
  process() {
    if(!this.processValide){
      this.processValide=true;
      this.objectifValide=false;
      this.contexteValide=false
      this.router.navigate(['/bndream/heros'], { fragment: 'process' });
    }else {
      this.processValide=false;
      this.router.navigate(['/bndream/heros'], { fragment: 'haut' });
    }
  }



}
