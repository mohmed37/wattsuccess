export class CvModel{
  public administration:string;
  public competence:string;
  public adresse:string;
  public mail:string;
  public mobile:string;
  public nom:string;
  public metier:string;
  public experience:string;
  public diplome:string;
  public photo:string;

  constructor(nom:string,metier:string,competence:string,experience:string,diplome:string,adresse:string,mail:string,
  mobile:string,photo:string){
    this.nom=nom;
    this.metier=metier;
    this.competence=competence;
    this.experience=experience;
    this.diplome=diplome;
    this.adresse=adresse;
    this.mail=mail;
    this.mobile=mobile;
    this.photo=photo;

  }

}
