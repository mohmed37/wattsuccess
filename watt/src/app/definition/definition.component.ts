import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-definition',
  templateUrl: './definition.component.html',
  styleUrls: ['./definition.component.css']
})
export class DefinitionComponent implements OnInit {
  public fragment: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.fragment.subscribe(fragment => { this.fragment = fragment; });
    this.fragment="haut";
  }

  ngAfterViewChecked(): void {
    try {
      if(this.fragment) {
        document.querySelector('#' + this.fragment).scrollIntoView();
      }
    } catch (e) { }
  }

}
