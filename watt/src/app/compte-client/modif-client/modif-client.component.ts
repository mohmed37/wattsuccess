import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ClientService} from "../../services/client.service";
import {AuthenticationService} from "../../services/authentication.service";
import {FormControl, Validators} from "@angular/forms";
import {ModifPasswordModel} from "../../model/modifPassword.model";

@Component({
  selector: 'app-modif-client',
  templateUrl: './modif-client.component.html',
  styleUrls: ['./modif-client.component.css']
})
export class ModifClientComponent implements OnInit {
  public userConnectClient:boolean;
  hide = true;
  hide2 = true;
  hide3: any;
  public passError: string='';
  public newPssword:ModifPasswordModel=new ModifPasswordModel();
  public verif:boolean;
  public message:string="";

  constructor(private clientService:ClientService, private router:Router,private activatedRoute:ActivatedRoute,
              private userConnect:AuthenticationService,private route: ActivatedRoute,private authService:AuthenticationService) {
    this.userConnectClient=userConnect.isAuthenticated;
  }

  ngOnInit(): void {
      }
  password=new FormControl('',Validators.required);
  newPassword=new FormControl('',Validators.required);
  matchingPassword=new FormControl('',Validators.required);


     modifPassword(){
       this.newPssword.mail=this.userConnect.userAuthenticated.email;
       this.newPssword.newpassword=this.newPassword.value;
       this.newPssword.password=this.password.value;
    this.authService.putPassword(this.newPssword).subscribe(data=>{
     if (data==true){
       this.message="Mofication effectuée";
       this.router.navigate(['/personalinfo'], { fragment: 'haut' });
     }
      if (data==false){
        this.message="Mot de passe érroné";}
     },error => {
      console.log(error);
    })
}
}
