import {Component, HostListener, OnInit} from '@angular/core';
import {ClientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Client} from "../model/client.model";
import {AuthenticationService} from "../services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.css']
})
export class NewClientComponent implements OnInit {
  public currentClient:Client;
  public mode: number=1;
  public clients:any;
  public size:number=4;
  public currentPage:number=1;
  public  totalPage:number;
  public  pages:Array<number>;
  private currentKeyword: string="";
  private  idClient:number;
  public modeClient:number=0;
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

  constructor(private clientService:ClientService, private router:Router,private activatedRoute:ActivatedRoute,
              private userConnect:AuthenticationService,private route: ActivatedRoute) {
    this.userConnectClient=userConnect.isAuthenticated;
  }
@HostListener('click')
click(){
    if(this.userConnectClient){
    this.clientService.client();}
}
  ngOnInit(): void {
    this.onGetClient();
   /* this.userForm = new FormGroup({
    prenom:new FormControl('',Validators.required),
    passwor:new FormControl('',Validators.required),
    matchingPassword:new FormControl('',Validators.required),
    phone:new FormControl('',Validators.required),
    date:new FormControl('',Validators.required),
    nom:new FormControl('',Validators.required),
    email:new FormControl('', [Validators.required, Validators.email])
  })*/
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

  onPageClient(i: number) {
    this.currentPage=i;
    this.chercherClient();
  }
  onChercher(form: any){
    this.currentPage=0;
    this.currentKeyword=form.keyword;
    this.chercherClient();
  }

  chercherClient() {
    this.clientService.getClientByKey(this.currentKeyword,this.currentPage,this.size)
      .subscribe(data=>{
        this.totalPage=data["totalPages"];

        this.pages=new Array<number>(this.totalPage);
        this.clients=data["content"];

      },error => {
        console.log(error);
      })
  }

  onDeleteClient(p) {
    let conf=confirm("Etes vous sûre?")
    if(conf){
      this.idClient=p.id;
      this.clientService.deleteClient(this.idClient)
        .subscribe(data=>{
          this.chercherClient();

        },error => {
          console.log(error)
        })
    }
  }

  onEditClient(p) {
    this.idClient =p.id;
    this.modeClient=2;
    this.clientService.getClientBy(this.idClient)
      .subscribe(data=>{
        this.currentClient=data;

      },error => {
        console.log(error);
      } )

  }

  // Modif client


  modifOk(value: any) {
    this.clientService.updateClientBy(value)
      .subscribe(data=>{
        alert("Mise à jour avec succés");
        this.ngOnInit();

      },error => {
        console.log(error)
      });
    this.modeClient=0;
  }

}
