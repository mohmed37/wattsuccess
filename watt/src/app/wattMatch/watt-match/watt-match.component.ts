import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watt-match',
  templateUrl: './watt-match.component.html',
  styleUrls: ['./watt-match.component.css']
})
export class WattMatchComponent implements OnInit {
  public Img1:string="assets/img/wattMatch1.jpg";
  public Img2:string="assets/img/wattMatch2.jpg";
  constructor() { }

  ngOnInit(): void {
  }

}
