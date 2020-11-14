import { Component, OnInit } from '@angular/core';

import {ClientService} from "../../../services/client.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  constructor(private loginService:ClientService) { }

  ngOnInit(): void {
  }

}
