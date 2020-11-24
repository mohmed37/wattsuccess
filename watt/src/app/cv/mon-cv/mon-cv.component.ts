import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {CvModel} from "../../model/cv.model";
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {HttpClient,HttpEventType} from "@angular/common/http";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {ListMetierClientModel} from "../../model/listMetierClient.model";
import {Bnbecome} from "../../services/bnbecome.service";
import {FicheMetier} from "../../model/ficheMetier.model";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {Client} from "../../model/client.model";





@Component({
  selector: 'app-mon-cv',
  templateUrl: './mon-cv.component.html',
  styleUrls: ['./mon-cv.component.css']
})
export class MonCvComponent implements OnInit {
  public currentCv: CvModel = new CvModel("LAURA WATT", "ASSISTANTE DE DIRECTION", "<h4>Accueil et communication :</h4>" +
    "<ul><li>Accueil téléphonique et physique de la clientèle</li>" +
    "<li>Traiter l'information et orienter les clients vers le bon interlocuteur</li>" +
    "<li>Relance client et gestion de la relation SAV</li>" +
    "<li>Assurer la transmission des informations en interne et en externe (décisions, notes...) </li>" +
    "<li>Contribuer à la mise en œuvre d'actioons de communications</li>" +
    "<li>Communiquer à l'écrit et à l'oral en français et en anglais</li></ul>" +
    "<h4>Administratif et gestion :</h4>" +
    "<ul><li>Saisir des documents numériques</li>" +
    "<li>Réaliser les commandes de matériel, de fournitures, de consommables et vérifier la conformité des livraisons</li>" +
    "<li>Rédiger les devis, conventions et factures </li>" +
    "<li>Actualiser la documentation professionnelle et réglementaire</li>" +
    "<li>Veille informatique et réglementaire</li>\n" +
    "<li>Contribuer à la gestion administrative des RH</li>" +
    "<li>Connaissances sur Photoshop, Première pro et Sony Vegas Pro (retouches photos, montage vidéo)</li></ul>" +
    "<h4>Compétences linguistiques :</h4>" +
    "<ul ><li> Arabe : Niveau C2</li>" +
    "<li>Français : Niveau C1</li>" +
    "<li>Anglais : Niveau B2</li></ul>" +
    "<h4>Mobilité :</h4>" +
    "<ul ><li>Permis B et véhiculée</li>" +
    "<li>Mobilité départementale / régionale / nationale / internationale</li>" +
    "<li>En cours de mobilité à Alger</li></ul>" +
    "<h4>Accomplissements / Centres d'interêt :</h4>" +
    "<ul ><li>Sport pratiqué -  Loisirs (lecture, cinéma, jeux vidéo…) – Passions – Engagement associatif </li></ul>", " <h4>Vendeuse polyvalente événementiel</h4>" +
    "<p>SOLARY PRODUCTION À TOURS</p>" +
    "<p>Diverses missions accomplies en 2019 lors d'évènements gaming et E-sportif tels que la Paris Games Week</p>" +
    "<h4>Entraineur de gymnastique artistique</h4>" +
    "<p>AS Tourcoing GYMNASTIQUE À TOURCOING</p>" +
    "<p>En formation BPJEPS de Septembre 2018 à février 2019</p>" +
    "<h4>Assistante de direction</h4>" +
    "<p>ALME FRANCE À TOURCOING</p>" +
    "<p>En contrat d'apprentissage d'octobre 2017 à avril 2018</p>" +
    "<h4>Employée polyvalente</h4>" +
    "<p>MCDONALD'S À TOURCOING</p>" +
    "<p>Janvier à Juin 2017</p>" +
    "<p>QUICK À TOURCOING </p>" +
    "<p>Octobre 2014 à Mars 2016 en contrat étudiant</p>" +
    "<h4>Femme de chambre</h4>" +
    "<p>MISTER BED À RANG-DU-FLIERS (62)</p>" +
    "<p>En août 2013, contrat saisonnier</p>", " <h4>ASSISTANTE DE DIRECTION</h4>" +
    "<p>LANGUES ETRANGERES APPLIQUEES</p>\n" +
    "<p>PREMIÈRE ANNÉE UPJV TOURCOING EN 2016</p>" +
    "<p>Anglais et Italien</p>" +
    "<h4>BACCALAUREAT LITTERAIRE</h4>" +
    "<p>LYCÉE DESCARTES  EN 2014</p>" +
    "<p>Option droit et grands enjeux du monde contemporain</p>", "<ul><li>23 rue du CHAMPS, 59200 TOURS</li></ul>",
    "<ul><li>laura.xatt@wattsucces.fr</li></ul>", "<ul><li>06.54.76.16.36</li></ul>", "assets/img/portrai.jpg");

  public modifNom: boolean = false;
  public modifMetier: boolean = false;
  public modifCom: boolean = false;
  public modifProf: boolean = false;
  public modifPhoto: boolean = false;
  public modifAdmin: boolean;
  public modifDiplom: boolean = false;
  public modifAdresse: boolean = false;
  public modifMail: boolean = false;
  public modifPhone: boolean = false;
  public bouttonActif: boolean = false;
  public bouttonActif2: boolean = false;
  public bouttonActif3: boolean = false;
  public bouttonActif4: boolean = false;
  public bouttonActif5: boolean = false;
  public bouttonActif6: boolean = false;
  public userId: number | any;
  cheminImage: string = "/assets/img/portrai.jpg";
  fileToUpload: File = null;
  public colorBotton2: string = "#bdc3c7";
  public colorBotton1: string = "#bdc3c7";
  public userConnectClient: boolean;
  public ficheClient: ListMetierClientModel;
  public metierValide: any[] = [];
  listByMetierSelect: FicheMetier[] = [];
  public metier: any[] = [];
  public user = Client;


  constructor(private http: HttpClient, private clientService: ClientService, private userConnect: AuthenticationService
    , private bnbecome: Bnbecome) {
    if (userConnect.userAuthenticated) {
      this.userConnectClient = userConnect.isAuthenticated;
    }
  }

  public Editor = ClassicEditor;
  public nomClient2;
  public nomClient: string;
  public premomClient: string;

  ngOnInit(): void {
    if (this.userConnect.userAuthenticated) {
      this.listFicheMetierClient();
      this.clientService.getClientBy(this.userConnect.userAuthenticated.id).subscribe(user => {
        this.nomClient = user.nom;
        this.premomClient = user.prenom;
      });

    }

  }

  public onReady(editor) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  maxlength(e) {
    if (e.editor.getTotalLength() > 500) {
      e.editor.deleteText(500, e.editor.getLength());
    }
  }

  onChange({editor}: ChangeEvent) {
    if (this.modifCom) {
      this.currentCv.competence = editor.getData();
    }
    if (this.modifMetier) {
      this.currentCv.metier = editor.getData();
    }
    if (this.modifNom) {
      this.currentCv.nom = editor.getData();
    }
    if (this.modifAdmin) {
      this.currentCv.administration = editor.getData();
    }
    if (this.modifProf) {
      this.currentCv.experience = editor.getData();
    }
    if (this.modifDiplom) {
      this.currentCv.diplome = editor.getData();
    }
    if (this.modifAdresse) {
      this.currentCv.adresse = editor.getData();
    }
    if (this.modifMail) {
      this.currentCv.mail = editor.getData();
    }
    if (this.modifPhone) {
      this.currentCv.mobile = editor.getData();
    }
    if (this.modifPhoto) {
      this.cheminImage = editor.getData();
    }
  }


  modif(current: string) {

    if (current === "metier") {
      this.bouttonActif = !this.bouttonActif;
      this.modifMetier = !this.modifMetier;
    }
    if (current === "nom") {
      this.bouttonActif = !this.bouttonActif;
      this.modifNom = !this.modifNom;
    }
    if (current === "competences") {
      this.bouttonActif2 = !this.bouttonActif2;
      this.modifCom = !this.modifCom;
    }
    if (current === "experience") {
      this.bouttonActif3 = !this.bouttonActif3;
      this.modifProf = !this.modifProf;
    }
    if (current === "diplomes") {
      this.bouttonActif4 = !this.bouttonActif4;
      this.modifDiplom = !this.modifDiplom;
    }
    if (current === "adresse") {
      if (!this.modifMail && !this.modifPhone) {
        this.bouttonActif5 = !this.bouttonActif5;
      }
      this.modifAdresse = !this.modifAdresse;
    }
    if (current === "mail") {
      if (!this.modifAdresse && !this.modifPhone) {
        this.bouttonActif5 = !this.bouttonActif5;
      }
      this.modifMail = !this.modifMail;
    }
    if (current === "phone") {
      if (!this.modifAdresse && !this.modifMail) {
        this.bouttonActif5 = !this.bouttonActif5;
      }
      this.modifPhone = !this.modifPhone;
    }
    if (current === "photo") {
      this.bouttonActif6 = !this.bouttonActif6;
      this.modifPhoto = !this.modifPhoto;
    }
  }

  finModif() {
    this.bouttonActif = false;
    this.bouttonActif2 = false;
    this.bouttonActif3 = false;
    this.bouttonActif4 = false;
    this.bouttonActif5 = false;
    this.bouttonActif6 = false;
    this.modifPhoto = false;
    this.modifNom = false;
    this.modifMetier = false;
    this.modifCom = false;
    this.modifAdmin = false;
    this.modifProf = false;
    this.modifDiplom = false;
    this.modifAdresse = false;
    this.modifMail = false;
    this.modifPhone = false;
    this.modifPhone = false;
  }

  selectedFile = null;
  public newImage: string;
  public colorNew: string = "#b65010";
  public colorNew2: string = "#134a6b";
  public colorNewText: string = "#134a6b";
  public colorNewTextNom: string = "#b65010";
  public colorNewTextMetier: string = "#ffffff";
  private xepOnline: any;

  onFileSelected(event) {

    this.selectedFile = event.target.files[0];
    this.newImage = event.target.value;
  }


  handleFinInput(file: FileList) {

    this.fileToUpload = file.item(0);
    var reader = new FileReader();
    reader.onload = (ev: any) => {
      this.cheminImage = ev.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }


  changeColor() {

    switch (this.colorNew) {
      case '#b65010':
        this.colorBotton1 = "#134a6b";
        this.colorNew = "#bdc3c7";
        this.colorNewText = "#134a6b";
        break;
      case '#bdc3c7':
        this.colorBotton1 = "#b65010";
        this.colorNew = "#134a6b";
        this.colorNewText = "#ffffff";
        break;
      case '#134a6b':
        this.colorBotton1 = "#bdc3c7";
        this.colorNew = "#b65010";
        this.colorNewText = "#134a6b";
        break;

      default:
        this.colorBotton1 = "#bdc3c7";
        this.colorNew = "#b65010";
        this.colorNewText = "#134a6b";
    }

  }

  changeColor2() {

    switch (this.colorNew2) {
      case '#134a6b':
        this.colorBotton2 = "#b65010";
        this.colorNew2 = "#bdc3c7";
        this.colorNewTextNom = "#134a6b";
        this.colorNewTextMetier = "#134a6b";

        break;
      case '#bdc3c7':
        this.colorBotton2 = "#134a6b";
        this.colorNew2 = "#b65010";
        this.colorNewTextNom = "#134a6b";
        break;
      case '#b65010':
        this.colorBotton2 = "#bdc3c7";
        this.colorNew2 = "#134a6b";
        this.colorNewTextNom = "#ffffff";
        this.colorNewTextMetier = "#ffffff";

        break;
      default:
        this.colorBotton2 = "#bdc3c7";
        this.colorNew2 = "#134a6b";
        this.colorNewText = "#ffffff";
        this.colorNewTextMetier = "#ffffff";
    }
  }

  listFicheMetierClient() {
    this.bnbecome.getFicheMetierClient().subscribe(
      data => {
        this.ficheClient = data;
        this.ficheClient.valide.forEach(ficheMetierValide => {
          if (ficheMetierValide.etat == true) {
            this.metierValide.push(ficheMetierValide)
          }
        });
        this.ficheClient.ficheMetiers.forEach(ficheMetier => {
          let id = ficheMetier.id;
          this.metierValide.forEach(ficheMetierNewValide => {
            if (ficheMetierNewValide.id == id) {
              this.metier.push(ficheMetier);

            }
          });
        });
        this.getMetierSelection(this.metierValide, this.ficheClient);

      }, error => {
        console.log(error);
      });

  }

  getMetierSelection(metierValide: any[], ficheClient: ListMetierClientModel) {
    metierValide.forEach(ficheMetierValide => {
      if (ficheMetierValide.selection == true) {
        ficheClient.ficheMetiers.forEach(ficheMetier => {
          if (ficheMetier.id == ficheMetierValide.id) {
            this.listByMetierSelect.push(ficheMetier);
          }
        })
      }
    });
  }


  captureScreen() {

    let element =document.getElementById('htmlData');
    html2canvas(element).then((canvas)=>{

      let ingdata=canvas.toDataURL('image/png');
      let doc =new jsPDF();
      let imgHeigth=canvas.height * 208 / canvas.width;
      doc.addImage(ingdata,0,0,208,imgHeigth);
      doc.save("cv.pdf")


    })
  }
}
