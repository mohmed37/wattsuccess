import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TexteModel} from "../model/texte.model";
import {BndreamService} from "../services/bndream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {ClientService} from "../services/client.service";
import {AuthenticationService} from "../services/authentication.service";

@Component({
  selector: 'app-ardoise',
  templateUrl: './ardoise.component.html',
  styleUrls: ['./ardoise.component.css']
})
export class ArdoiseComponent implements OnInit {
  public fronArdoise: FormGroup;
  @Input() public texte2=new TexteModel();
  public hostTest: string = "http://localhost:9004/microservice-tests";
  public userId:number;
  constructor(private bndreamService:BndreamService, private router:Router,private httpClient: HttpClient
    ,private serviceClient:ClientService, private userConnect:AuthenticationService,private route: ActivatedRoute) {
    this.userId=this.userConnect.userAuthenticated.id;
  }

  ngOnInit(): void {
    this.fronArdoise=new FormGroup({
      texte:new FormControl('',Validators.required)
    });
  }
  @Output() public pick:EventEmitter<string>=new EventEmitter<string>();

  onSaveTexte() {
    this.texte2.texte = this.fronArdoise.value.texte;
    this.pick.emit( this.texte2.texte);
  }
}
