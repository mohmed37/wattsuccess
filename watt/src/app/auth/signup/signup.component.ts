import {Component, HostListener, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientService} from "../../services/client.service";
import {Client} from "../../model/client.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogModalComponent} from "../../dialog-modal/dialog-modal.component";
import {HttpClient} from "@angular/common/http";
import {ApiService} from "../../services/api.service";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ContactModel} from "src/app/model/contact.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public currentClient:Client;
  public mode: boolean=false;
  public clients:any;
  public size:number=1;
  public currentPage:number=1;
  public  totalPage:number;
  public  pages:Array<number>;
  public message:string="";
  public messagePass:string="";
  public role:string;
  public userConnectClient:boolean;
  public userForm:FormGroup;
  hide = true;
  hide2 = true;
  public passError: string='';
  public newClient:Client=new Client();
  public fragment: string;
  color: string;
  public hostUser: string;
  public hostAuth: string;
  public etudiantImg:string="assets/img/etudiante.png";
  public JobseekerImg:string="assets/img/Jobseeker.png";
  public contratValide: boolean=false;
  public newsValide: boolean=false;
  public host: string;
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private clientService:ClientService, private router:Router,private activatedRoute:ActivatedRoute,
              private userConnect:AuthenticationService,private route: ActivatedRoute,public dialog: MatDialog, private hostTestService: ApiService) {
    this.userConnectClient=userConnect.isAuthenticated;
    this.hostUser = hostTestService.USERS_MICRO_APP;
    this.hostAuth=hostTestService.AUTH_MICRO_APP;
    this.host=hostTestService.LOCALHOST_URL;
  }
  @HostListener('click')
  click(){
    if(this.userConnectClient){
      this.clientService.client();}
  }
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email,Validators.pattern]],
      phone: ['', [Validators.required, Validators.minLength(10),Validators.pattern]],
      password: ['', [Validators.required,Validators.pattern]],
      matchingPassword: ['', [Validators.required,Validators.pattern]],
      date: ['', Validators.required],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit(){

    this.submitted = false;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      this.submitted = true;
      return;
    }
    console.log("valide")
    this.onFormSubmit();
    // display form values on success
    /* alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));*/
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


  getErrorMessage() {
    if (this.registerForm.value.email.hasError('required')) {
      return 'Vous devez saisir une valeur';
    }
    return this.registerForm.value.email.hasError('email') ? "Adresse mail n'est valide" : '';
  }

  openDialog(message:String): void {
    const dialogRef = this.dialog.open(DialogModalComponent, {
      width: '300px',

      data: { restitution: message}
    });

    dialogRef.afterClosed().subscribe(res => {
      this.color = res;
    });
  }



//CLIENT
  onGetClient() {
    this.clientService.getClient(this.currentPage,this.size)
      .subscribe(data=>{

        this.totalPage=data["totalPages"];
        this.pages=new Array<number>(this.totalPage);
        this.clients=data["content"];
      },error => {
        console.log(error);
      })
  }



  onFormSubmit() {
    this.passError="";
    this.message="";
    if (this.registerForm.value.password!=this.registerForm.value.matchingPassword){
      this.passError="Les mots de passe saisis ne sont pas identiques.";
      console.log("identiques")
      return null;
    }

    this.newClient.prenom=this.registerForm.value.prenom;
    this.newClient.nom=this.registerForm.value.nom;
    this.newClient.email=this.registerForm.value.email;
    this.newClient.phone=this.registerForm.value.phone;
    this.newClient.password=this.registerForm.value.password;
    this.newClient.username=this.registerForm.value.email;
    this.newClient.date=this.registerForm.value.date;
    this.newClient.roles=[""];
    this.newClient.newsletter=this.newsValide;
    this.userConnect.saveResource(this.newClient)
      .subscribe(res=>{
        this.currentClient=res;
        this.mode=true;

      },error => {
console.log(error);
        this.message=error.error.message;
      });
  }


  termes( clic:string) {
    console.log(clic);
    if(clic=="conditions"){
      this.contratValide=!this.contratValide;
     }
    if(clic=="news"){
      this.newsValide =!this.newsValide;
    }
  }

}
