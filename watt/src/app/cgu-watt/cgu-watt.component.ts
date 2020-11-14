import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CguModel} from "../model/cgu.model";
import {MenuService} from "../services/menu.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {BndreamService} from "../services/bndream.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogModalComponent} from "src/app/dialog-modal/dialog-modal.component";

@Component({
  selector: 'app-cgu-watt',
  templateUrl: './cgu-watt.component.html',
  styleUrls: ['./cgu-watt.component.css']
})
export class CguWattComponent implements OnInit {
  public titre:string;
  public date:string;
  public htmlContent: string;
  public registerForm: FormGroup;
  public cgu:CguModel=new CguModel("",'');
  public cguGet:CguModel=new CguModel("",'');
  public fragment: string;
  public message: string;
  constructor(private formBuilder: FormBuilder,private menuService:MenuService
              ,public authService:AuthenticationService, private router:Router,private route: ActivatedRoute,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.menuService.getCgu()
      .subscribe(
        res => {
          this.cguGet=res;
        }
      );
    this.registerForm = this.formBuilder.group({
      date: [''],

    });
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

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: 'auto',
    minHeight: '100px',
    maxHeight: 'auto',
    width: '50%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      {class: 'arial', name: 'Arial'},
      {class: 'times-new-roman', name: 'Times New Roman'},
      {class: 'calibri', name: 'Calibri'},
      {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',
    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
  };


  valide() {
   this.cgu.date=this.registerForm.value.date;
   this.cgu.texte=this.htmlContent;
    this.menuService.saveCgu(this.cgu)
      .subscribe(res=>{
       this.message="Enregistrement Ok";
        this.cguGet=new CguModel("",'');
      }, error => {
        this.ngOnInit();
        console.log(error)
      })

  }
}
