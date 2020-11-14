import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
public photoPortrait:string="assets/img/work.jpg";
public photoblock1:string="assets/img/photo12.jpg";
public photoblock2:string="assets/img/photo22.jpg";
public photoblock3:string="assets/img/photo32.jpg";
public portraits:string="assets/img/portraits3.jpg";
public presentation:string="assets/video/presentation.mp4";
  public clientConnect:boolean;
  constructor(private autheService:AuthenticationService) { }

  ngOnInit(): void {
    this.clientConnect=this.autheService.isAuthenticated;

  }

}
