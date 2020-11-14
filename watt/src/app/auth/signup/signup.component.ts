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
  public contratValide: boolean;
  public newsValide: boolean;
  public host: string;

  constructor(private clientService:ClientService, private router:Router,private activatedRoute:ActivatedRoute,
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
   /* this.onGetClient();*/

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

  prenom=new FormControl('',Validators.required);
  password=new FormControl('',Validators.required);
  usernam=new FormControl('',Validators.required);
  matchingPassword=new FormControl('',Validators.required);
  phone=new FormControl('',Validators.required);
  date=new FormControl('',Validators.required);
  nom=new FormControl('',Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez saisir une valeur';
    }
    return this.email.hasError('email') ? "Adresse mail n'est valide" : '';
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
    if (this.password.value!=this.matchingPassword.value){
      this.passError="Les mots de passe saisis ne sont pas identiques.";
      return null;
    }

    this.newClient.prenom=this.prenom.value;
    this.newClient.nom=this.nom.value;
    this.newClient.email=this.email.value;
    this.newClient.phone=this.phone.value;
    this.newClient.password=this.password.value;
    this.newClient.username=this.usernam.value;
    this.newClient.date=this.date.value;
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


  termes( MatCheckboxChange) {
    if(MatCheckboxChange.source.id=="mat-checkbox-2"){
      this.contratValide = (MatCheckboxChange.source.checked == true);
    }
    if(MatCheckboxChange.source.id=="mat-checkbox-1"){
      this.newsValide = (MatCheckboxChange.source.checked == true);

    }
  }

}
