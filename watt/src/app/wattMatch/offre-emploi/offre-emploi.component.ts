import { Component, OnInit } from '@angular/core';
import {ListCompetencesModel} from "../../model/listCompetences.model";
import {Bnbecome} from "../../services/bnbecome.service";
import {MatRadioChange} from "@angular/material/radio";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-offre-emploi',
  templateUrl: './offre-emploi.component.html',
  styleUrls: ['./offre-emploi.component.css']
})
export class OffreEmploiComponent implements OnInit {
  selectedValue:string;
  selectedExpereince: string;
  selectedQualification: string;
  selectedContrat: string;
  selectedDurreSalaire: string;
  selectedMotifDiffusion:string;
  selectedModeContact:string;
  public listCompetences:ListCompetencesModel[];
  public competenceSelected:ListCompetencesModel;
  public selectCompetence: boolean;
  public afficherSelection: boolean;
  public selecvalide: boolean;
  public listCompetence=[];
  public competences:string[];
  listSavoir:string[]=[];
  savoirEtreClient:string[]=[];
  public number:number=0;
  registerForm: FormGroup;
  submitted = false;
  public valide: number=0;
  public savoirEtre:string[]=["Autonomie","Capacité à fédérer","Capacité d'adaptation","Capacité de décision",
    "Curiosité","Force de proposition","Gestion du stress","Persévérance","Prise de recul","Réactivité","Rigueur",
    "Sens de l'organisation","Sens de la communication","Travail en équipe"];
  public experience:string[]=["Débutant accepté","Expérience exigée"];
  public niveau:string[]=["Manoeuvre","Ouvrier spécialisé","Ouvrier qualifié (P1,P2)","Ouvrier qualifié (P3,P4,OHQ)","Employé non qualifié","Employé qualifié","Technicien","Agent de maitrise","cadre"];
  showMoreControls: string;
  public contratType:string[]=["CDI","CDD","CDD alternance (Contrat d'apprentissage)","CDD alternance (Contrat de professionnalisation)","CDD Senior","Contrat intermittent","Contrat travail saisonnier"]
  public prisePoste: boolean;
  private newDate: Date;
  public  dureeSalaire:string[]=["Horaire","Mensuel","Annuel"];
  public  motifDiffusion:string[]=["En préservant votre anonymat","En affichant uniquement votre enseigne","Avec vos coordonnées"];
  public  modeContact:string[]=["Par courrier électronique","Par téléphone","Par courrier postal","En se présentant dans" +
  " vos locaux","En postulant sur votre site internet"];






  constructor(private bnbecome:Bnbecome,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      intitule: ['', Validators.required],
      descriptif: ['', Validators.required],
      permis:[''],
      langue:[''],
      lieuTravail: ['', Validators.required],
      nbPoste: ['', Validators.required],
      prisePoste:[''],
      tempsTravail: ['', Validators.required],
      salaireMin: ['', Validators.required],
      salaireMax:[''],
      nbMoisSalaireAnnuell:[''],
      competence1:[''],
      competence2:[''],
      competence3:[''],
    });

    this.getListCompetences();
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
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
      this.number=0;
    },error => {
      console.log(error);
    });

  }
  getListCompetences(){
    this.bnbecome.getCompetence().subscribe(data=>{
      this.listCompetences=data;
    },error => {
      console.log(error);
    });

  }

  save(event:  MatCheckboxChange) {
    if (event.source.checked) {
      this.number=this.number+1;
      this.listSavoir.push(event.source.value);
    }
    if (!event.source.checked) {
      this.number=this.number-1;
      for (let i = 0; i < this.listSavoir.length; i++) {
        if (this.listSavoir[i] == event.source.value) {
          this.listSavoir = this.listSavoir.filter(item => item !== event.source.value);
        }
      }
    }
  }
  validation(s: string) {

    if (s=="+"){
      this.valide=this.valide+1;
      if(this.valide>=6){
        this.valide=6;
      }
      this.number=0;
    }
    if (s=="-"){
      this.valide=this.valide-1;
      if(this.valide<=0){
        this.valide=0;
      }
      this.number=0;
    }
  }
  onChange(event: MatCheckboxChange) {

    if (event.source.checked) {

      this.number=this.number+1;
      this.savoirEtreClient.push(event.source.value);
    }
    if (!event.source.checked) {
      this.number=this.number-1;
      for (let i = 0; i < this.savoirEtreClient.length; i++) {
        if (this.savoirEtreClient[i] == event.source.value) {
          this.savoirEtreClient = this.savoirEtreClient.filter(item => item !== event.source.value);
        }
      }
    }

  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.controls.descriptif.errors!=null||this.registerForm.controls.intitule.errors!=null) {
      return;
    }
    else {
    this.validation("+");}
  }

  onSubmit2() {
    if (this.registerForm.controls.lieuTravail.errors!=null||this.registerForm.controls.nbPoste.errors!=null) {
      return;
    }
    else {
      this.validation("+");}
  }

  onSubmit3() {
    if (this.registerForm.controls.salaireMin.errors!=null||this.registerForm.controls.tempsTravail.errors!=null||
      this.registerForm.controls.prisePoste.errors!=null) {

      return;

    }
    else {
      this.validation("+");
    }
  }

  info() {
  }


  priseDePoste(event: MatCheckboxChange) {
    this.newDate=new Date();
    this.registerForm.value.prisePoste=this.newDate;
    this.prisePoste=!this.prisePoste;
  }

  typeSalaire(event: MatCheckboxChange) {
   this.selectedDurreSalaire=event.source.value;
  }


  modalit($event: MatCheckboxChange) {


  }
}
