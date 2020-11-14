import {Component, HostListener, Input, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import {ClientService} from "../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../services/authentication.service";
import {formatDate} from "@angular/common";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
   public nomClient2;
  public Editor = ClassicEditor;
  public logo:string="assets/img/newLogo.png";
  public portraits:string="assets/img/portraits3.jpg";
  public fragment: string;

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );
  }

  constructor(private clientService:ClientService, private router:Router,public authService:AuthenticationService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")) {
      this.authService.loadAuthenticatedUserFromLocalSorage(sessionStorage.getItem("token"));
      this.clientService.change.subscribe(
        isClient => {
          this.nomClient2 = isClient;
        }
      )
    }
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




  onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log( data );
  }

  @HostListener('click')
  click(){
    if(this.authService.userAuthenticated){
    this.clientService.client();}
  }

  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigate(['/home'], { fragment: 'haut' });

  }
  datejour(){
    const format = 'dd/MM/yyyy  h:mm a';
    const myDate = new Date();
    const locale = 'en-FR';
    return formatDate(myDate, format, locale);
  }

  onLogin() {
    this.authService.removeTokenFromLocalStorage();
    this.router.navigate(['/login'], { fragment: 'haut' });
  }
}



