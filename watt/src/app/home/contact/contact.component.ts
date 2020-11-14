import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BndreamService} from "../../services/bndream.service";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {Client} from "../../model/client.model";
import {ContactModel} from "../../model/contact.model";
import {FicheMetier} from "../../model/ficheMetier.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  photoPsycho:string="assets/img/portrait.jpg";
  public salarieImg:string="assets/img/salarie.png";
  public valide: boolean;
  public fragment: string;
  public hostAuth:string;
  public newContact:ContactModel=new ContactModel();

  constructor(private formBuilder: FormBuilder,private route: ActivatedRoute, private hostTestService: ApiService, private router:Router, private htttpClient: HttpClient) {
    this.hostAuth=hostTestService.AUTH_MICRO_APP;
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      entreprise: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      messageObjet: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(){
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.newContact=this.registerForm.value;
    return this.htttpClient.post<ContactModel>(this.hostAuth + "/contact",this.newContact).subscribe(validation => {
      this.valide=true;
    },error => {
      console.log(error);
    })
    // display form values on success
   /* alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));*/

  }

  onReset() {
    this.submitted = false;
    this.valide=false;
    this.registerForm.reset();
    this.router.navigate(['/home'], { fragment: 'haut' });
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

}
