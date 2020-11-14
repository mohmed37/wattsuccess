import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cv-expert',
  templateUrl: './cv-expert.component.html',
  styleUrls: ['./cv-expert.component.css']
})
export class CvExpertComponent implements OnInit {
public photoExpert:string="assets/img/cvexpert2.png";
  cheminImage : string = "/assets/img/portrai.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
