export class ResultatPraicoModel {
  public client:number;
  public nombreP:number;
  public nombreR:number;
  public nombreA:number;
  public nombreI:number;
  public nombreC:number;
  public nombreO:number;

  constructor(nombreP:number,nombreR:number,nombreA:number,nombreI:number,nombreC:number,nombreO:number){
    this.nombreA=nombreA;this.nombreC=nombreC;this.nombreI=nombreI;this.nombreO=nombreO;
    this.nombreP=nombreP;this.nombreR=nombreR
  }
}
