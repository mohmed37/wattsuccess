import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {BndreamService} from "../services/bndream.service";
import {FicheMetier} from "../model/ficheMetier.model";
import { FormControl, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-administrateur',
  templateUrl: './administrateur.component.html',
  styleUrls: ['./administrateur.component.css']

})
export class AdministrateurComponent implements OnInit {
  selectedFile: File;
  public hostTest: string = "http://localhost:9004/microservice-tests";
  message: string;
  imageName: any;
  retrieveResonse: any;
  base64Data: any;
  retrievedImage: any;
  retrievedImageFicheMetier: any;
  public allPhotoFicheMetier:any;
  selectedValue: null;
  public currentFicheMetier: FicheMetier;
  public formFicheMetier: FormGroup;

  constructor(private httpClient: HttpClient, private router: Router,private serviceBnDream:BndreamService) {
  }

  ngOnInit(): void {
    this.formFicheMetier= new FormGroup({
      metier:new FormControl('',Validators.required),
      texte:new FormControl('',Validators.required),
      competence:new FormControl('',Validators.required),
      qualite:new FormControl('',Validators.required),
      code:new FormControl('',[Validators.required,Validators.maxLength(3)
        ,Validators.minLength(3)]),
      photo:new FormControl('',Validators.required),
    });
    console.log(this.formFicheMetier);
    this.getAllFicheMetier();
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    const uploadImageData = new FormData();
    console.log(this.selectedFile);
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.httpClient.post(this.hostTest + "/upload", uploadImageData, {observe: 'response'})
      .subscribe((response) => {

          if (response.status === 200) {
            this.message = 'Enregistré avec succès';
          } else {
            this.message = 'Nom enregistré avec succès';
          }
        }
      );
    console.log(this.message);
  }

  getImage() {
    this.httpClient.get(this.hostTest + "/get/" + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  onUploadFicheMetier() {
    const uploadImageData = new FormData();
    console.log(this.selectedFile);
    uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);

    this.httpClient.post(this.hostTest + "/photoFicheMetier", uploadImageData, {observe: 'response'})
      .subscribe((response) => {

          if (response.status === 200) {
            this.message = 'Enregistré avec succès';
          } else {
            this.message = 'Nom enregistré avec succès';
          }
        }
      );
    console.log(this.message);
  }

  getImageFicheMeier() {
    this.httpClient.get(this.hostTest + "/getPhotoFicheMetier/" + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.picByte;
          this.retrievedImageFicheMetier = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }

  onSaveFicheMetier() {

    this.serviceBnDream.saveFicheMetier(this.formFicheMetier.value)
      .subscribe(res=>{
        this.formFicheMetier.reset();
        this.message = 'Enregistré avec succès';
      }, error => {
        this.message = "l'enregistrement à échoué!";
        console.log(error)
      })
  }

  getAllFicheMetier() {
    this.httpClient.get(this.hostTest + "/getPhotoFicheMetierAll/")
      .subscribe(
        res => {
          this.allPhotoFicheMetier=res;
        }
      );
  }
}
