import {Component, HostListener, OnInit} from '@angular/core';
import {ClientService} from "./services/client.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "./services/authentication.service";
import {formatDate} from "@angular/common";
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'watt of Africa';
  env = environment;

  constructor(private clientService:ClientService, private router:Router,public authService:AuthenticationService) { }
@HostListener('click')
  click(){
  if(this.authService.userAuthenticated) {
    this.clientService.client();}
}

  ngOnInit(): void {
   /* this.authService.loadAuthenticatedUserFromLocalSorage();*/
    /*if(!this.authService.userAuthenticated){
      this.router.navigate(['/'], { fragment: 'haut' });
    }*/

  }
  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login')

  }
  datejour(){
  const format = 'dd/MM/yyyy  h:mm a';
  const myDate = new Date();
  const locale = 'en-FR';
    return formatDate(myDate, format, locale);
  }
}
