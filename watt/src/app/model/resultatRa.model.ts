export class ResultatRaModel {

  public idclient:number;
  public authenticite:number;
  public tenacite:number;
  public reactivite:number;
  public introversion:number;
  public methode:number;
  public intuition:number;
  public nonConformisme:number;
  public personnelle:number;
  public directive:number;
  public prudence:number;
  public gregarite:number;
  public individualisme:number;
  public traditionnel:number;
  public reflexion:number;

  constructor(idclient:number,authenticite:number,tenacite:number,reactivite:number,introversion:number,methode:number
              ,intuition:number,nonConformisme:number,personnelle:number,directive:number,prudence:number,gregarite:number
              ,individualisme:number,traditionnel:number,reflexion:number){
    this.reflexion=reflexion;this.traditionnel=traditionnel;this.individualisme=individualisme;this.gregarite=reflexion;
    this.prudence=prudence;this.directive=directive;this.nonConformisme=nonConformisme;this.intuition=intuition;
    this.methode=methode;this.introversion=introversion;this.personnelle=personnelle;this.reactivite=reactivite
    ;this.tenacite=tenacite;this.authenticite=authenticite;
  }


}
